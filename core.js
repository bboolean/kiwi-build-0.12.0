Object.prototype.emap = function () {
  return [this];
};

Object.prototype.eflatMap = function () {
  return [this];
};

Object.prototype.e = function () {
  return Object.entries(this);
};

Object.prototype.elength = function () {
  return Object.entries(this).length;
};

globalThis.socket = globalThis.socket ?? {
  emit: () => {},
  on: () => {},
};

globalThis.metaAuth = globalThis.metaAuth ?? '';

const lineTooLong = 40;
const mapTooLong = 10;

export const tap = (...a) => {
  console.log(...a);
  return a.slice(-1)?.[0];
};

export const numberType = (a) => {
  return {
    type: 'number',
    value: +a,
  };
};

export const comparableType = (a) => {
  return { type: 'comparable', value: a };
};

export const boolType = (a) => {
  return { type: 'bool', value: !!(a || a === 0) };
};

export const variableType = (a) => {
  return { type: 'variable', value: '' + a };
};

export const textType = (a) => {
  return {
    type: 'text',
    value: ('' + a)?.replace(/\\'/g, "'"),
  };
};

export const listType = (a) => {
  return { type: 'list', value: a };
};

export const dotListType = (a) => {
  return { type: 'list', value: a, dotList: true };
};

export const mapType = (a) => {
  return { type: 'map', value: a };
};

export const eventType = (a) => {
  return { type: 'map', value: a, event: true };
};

export const nocomparisonType = () => {
  return { type: 'nocomparison', value: false };
};

export const parensType = (a) => {
  return { type: 'parens', value: a };
};

export const dropType = (a) => {
  return { type: 'drop', value: a };
};

export const putType = (a) => {
  return { type: 'put', value: a };
};

const addIndention = (a) => {
  return a
    .join('\n')
    .split('\n')
    .map((x) => '  ' + x)
    ?.join('\n');
};

export const splitEveryTwo = (list) => {
  const list2 = [];
  for (let i = 0; i < list.length - 1; i += 2) {
    list2.push([list[i], list[i + 1]]);
  }
  if (list.length % 2 !== 0) {
    list2.push([last(list)]);
  }
  return list2;
};

const jsBool = (a) => {
  return (
    a?.type &&
    ('bool' !== a?.type || a?.value === true) &&
    'error' !== a?.type &&
    'variable' !== a?.type &&
    ('map' !== a?.type ||
      '$' !== Object.keys(a?.value)?.[0]?.[0])
  );
};

const makeList = (a) => {
  return listType(a);
};

const makeMap = (a) => {
  const m = {};

  for (let i = 0; i < a.length; i += 2) {
    m[a[i]?.value] = a[i + 1];
  }

  return mapType(m);
};

const combine = (a, ...b) =>
  parensType([
    'parens' === a?.type ? a?.value?.[0] : a,
    ...b,
    ...('parens' === a?.type ? a?.value?.slice?.(1) : []),
  ]);

export const last = (a) => a?.[a?.length - 1];

export const secondLast = (a) => a?.[a?.length - 2];

export const first = (a) => a?.[0];

export const lefts = (a) => a?.slice(0, -1);

export const rights = (a) => a?.slice(1);

const changeLast = (a, b) => {
  a[a?.length - 1] = {
    ...b,
    vars: { ...a[a?.length - 1]?.vars, ...b?.vars },
  };
};

const process = { argv: [] };

const cmdArgs = rights(rights(process.argv));

const initVars = {
  cmd_args: listType(cmdArgs.map(textType)),
};

const subType = (a, bType) => {
  const aType = a?.type;

  const number =
    'number' === bType &&
    ('number' === aType ||
      ('text' === aType && !!+a?.value));
  const comparable =
    'comparable' === bType &&
    ['comparable', 'number'].includes(aType);
  const bool = 'bool' === bType && 'bool' === aType;
  const text = 'text' === bType && 'text' === aType;
  const list =
    'list' === bType && ['text', 'list'].includes(aType);
  const map =
    'map' === bType &&
    ['text', 'list', 'map'].includes(aType);
  const universal =
    'universal' === bType &&
    [
      'number',
      'comparable',
      'bool',
      'text',
      'list',
      'map',
      'variable',
      'parens',
      'drop',
      'put',
    ].includes(aType);

  return (
    number ||
    comparable ||
    bool ||
    text ||
    list ||
    map ||
    universal
  );
};

const isValid = (text) => {
  const pairs = {
    '(': ')',
    '{': '}',
    '[': ']',
    "'": "'",
  };

  let stack = [];

  for (let t of text) {
    if (
      ['{', '[', '('].includes(t) ||
      ("'" === t && stack[stack.length - 1] !== "'")
    ) {
      stack.push(t);
    } else if (['}', ']', ')', "'"].includes(t)) {
      if (
        pairs[stack[stack.length - 1]] === t &&
        stack.length
      ) {
        stack.pop();
      } else {
        return false;
        break;
      }
    }
  }

  return !stack.length;
};

const core = {
  '+': {
    argTypes: ['number', 'number'],
    identityTypess: [numberType(0), numberType(0)],
    fn: (a) => {
      return numberType(
        a
          ?.slice?.(1)
          .reduce(
            (a, b) => +a + +(b?.value ?? 0),
            a?.[0]?.value
          )
      );
    },
  },
  '-': {
    argTypes: ['number', 'number'],
    identityTypess: [numberType(0), numberType(0)],
    fn: (a) => {
      return numberType(
        a
          ?.slice?.(1)
          .reduce(
            (a, b) => +a - +(b?.value ?? 0),
            a?.[0]?.value
          )
      );
    },
  },
  '*': {
    argTypes: ['number', 'number'],
    identityTypess: [numberType(0), numberType(0)],
    fn: (a) =>
      numberType(
        a
          ?.slice?.(1)
          .reduce(
            (a, b) => +a * +(b?.value ?? 0),
            a?.[0]?.value
          )
      ),
  },
  '/': {
    argTypes: ['number', 'number'],
    identityTypess: [numberType(0), numberType(0)],
    fn: (a) =>
      numberType(
        a
          ?.slice?.(1)
          .reduce(
            (a, b) =>
              +a / (0 === +b?.value ? 1 : +b?.value),
            a?.[0]?.value
          )
      ),
  },
  max: {
    argTypes: ['number', 'number'],
    identityTypess: [numberType(0), numberType(0)],
    fn: (a) =>
      numberType(Math.max(...a.map((x) => +x.value))),
  },
  min: {
    argTypes: ['number', 'number'],
    identityTypess: [numberType(0), numberType(0)],
    fn: (a) =>
      numberType(Math.min(...a.map((x) => +x.value))),
  },
  '%': {
    argTypes: ['number', 'number'],
    identityTypess: [numberType(0), numberType(0)],
    fn: (a) =>
      numberType(
        a
          ?.slice?.(1)
          .reduce(
            (a, b) =>
              ((a % b?.value) + b?.value) % b?.value,
            a?.[0]?.value
          )
      ),
  },
  '^': {
    argTypes: ['number', 'number'],
    identityTypess: [numberType(0), numberType(0)],
    fn: (a) =>
      numberType(
        a
          ?.slice?.(1)
          .reduce((a, b) => a ** b?.value, a?.[0]?.value)
      ),
  },
  size: {
    argTypes: ['universal'],
    identityTypes: [textType('')],
    reverse: true,
    fn: ([a]) => {
      if ('mapType' === a?.type) {
        return numberType(a?.value?.length);
      } else {
        return numberType(Object.values(a?.value)?.length);
      }
    },
  },
  average: {
    argTypes: ['number'],
    identityTypess: [numberType(0)],
    fn: (a) =>
      numberType(
        a
          ?.slice?.(1)
          .reduce(
            (a, b) => +a + +(b?.value ?? 0),
            a?.[0]?.value
          ) / a?.length
      ),
  },
  neg: {
    argTypes: ['number'],
    identityTypes: [numberType(0)],
    fn: ([a]) => numberType(-a?.value),
  },
  round: {
    argTypes: ['number'],
    identityTypes: [numberType(0)],
    fn: ([a, b]) =>
      numberType(
        Math.round(a?.value / (b?.value ?? 1)) *
          (b?.value ?? 1)
      ),
  },
  ...Object.fromEntries(
    [
      'floor',
      'ceil',
      'sqrt',
      'exp',
      'exmp1',
      'sign',
      'trunc',
      'ln10',
      'ln2',
      'log10e',
      'log2e',
      'sqrt1_2',
      'sqrt2',
      'acos',
      'acosh',
      'asin',
      'asinh',
      'atan',
      'atan2',
      'atanh',
      'cbrt',
      'clz32',
      'cos',
      'cosh',
      'hypot',
      'imul',
      'log',
      'log10',
      'log1p',
      'log2',
      'fround',
      'sin',
      'sinh',
      'tan',
      'tanh',
    ].map((x) => [
      x,
      {
        argTypes: ['number'],
        identityTypes: [numberType(1)],
        fn: ([a]) => numberType(Math?.[x]?.(a?.value)),
      },
    ])
  ),
  '=': {
    argTypes: ['universal', 'universal'],
    identityTypes: [nocomparisonType(), nocomparisonType()],
    fn: ([f, ...r]) =>
      boolType(
        r.reduce(
          (a, b) => a && format(f) === format(b),
          true
        )
      ),
  },
  '!=': {
    argTypes: ['universal', 'universal'],
    identityTypes: [nocomparisonType(), nocomparisonType()],
    fn: ([f, ...r]) =>
      boolType(
        r.reduce(
          (a, b) => a && format(f) !== format(b),
          true
        )
      ),
  },
  '&': {
    argTypes: ['universal', 'universal'],
    identityTypes: [boolType(false), boolType(false)],
    fn: ([f, ...r]) =>
      boolType(
        r.reduce(
          (a, b) => a && jsBool(f) && jsBool(b),
          true
        )
      ),
  },
  '|': {
    argTypes: ['universal', 'universal'],
    identityTypes: [boolType(false), boolType(false)],
    fn: ([f, ...r]) =>
      boolType(
        r.reduce(
          (a, b) => (a && jsBool(f)) || jsBool(b),
          true
        )
      ),
  },
  '^^': {
    argTypes: ['bool', 'bool'],
    identityTypes: [boolType(false), boolType(false)],
    fn: ([f, ...r]) =>
      boolType(
        r.reduce(
          (a, b) =>
            (a && jsBool(f) && !jsBool(b)) ||
            (!(a && jsBool(f)) && jsBool(b)),
          true
        )
      ),
  },
  '!': {
    argTypes: ['universal'],
    identityTypes: [boolType(false)],
    fn: ([a]) => boolType(!jsBool(a)),
  },
  '>': {
    argTypes: ['comparable', 'comparable'],
    identityTypes: [nocomparisonType(), nocomparisonType()],
    fn: ([f, ...r]) =>
      boolType(
        r.reduce((a, b) => a && f?.value > b?.value, true)
      ),
  },
  '>=': {
    argTypes: ['comparable', 'comparable'],
    identityTypes: [nocomparisonType(), nocomparisonType()],
    fn: ([f, ...r]) =>
      boolType(
        r.reduce((a, b) => a && f?.value >= b?.value, true)
      ),
  },
  '<': {
    argTypes: ['comparable', 'comparable'],
    identityTypes: [nocomparisonType(), nocomparisonType()],
    fn: ([f, ...r]) =>
      boolType(
        r.reduce((a, b) => a && f?.value < b?.value, true)
      ),
  },
  '<=': {
    argTypes: ['comparable', 'comparable'],
    identityTypes: [nocomparisonType(), nocomparisonType()],
    fn: ([f, ...r]) =>
      boolType(
        r.reduce((a, b) => a && f?.value <= b?.value, true)
      ),
  },
  multiple: {
    argTypes: ['number', 'number'],
    identityTypes: [numberType(0), numberType(0)],
    fn: ([a, b]) => boolType(a?.value % b?.value === 0),
  },
  any: {
    argTypes: ['list', 'universal'],
    identityTypes: [listType([]), variableType('empty')],
    fn: ([r, f], vars) => {
      if ('parens' === f?.type) {
        return boolType(
          r?.value?.reduce?.((a, b) => {
            return (
              a || compute(parensType([f, b]), vars)?.value
            );
          }, false)
        );
      } else {
        return boolType(
          r?.value?.reduce?.(
            (a, b) => a || format(f) === format(b),
            false
          )
        );
      }
    },
  },
  all: {
    argTypes: ['list', 'universal'],
    identityTypes: [listType([]), variableType('empty')],
    fn: ([r, f], vars) => {
      if ('parens' === f?.type) {
        return boolType(
          r?.value?.reduce?.((a, b) => {
            return (
              a && compute(parensType([f, b]), vars)?.value
            );
          }, true)
        );
      } else {
        return boolType(
          r?.value?.reduce?.(
            (a, b) => a && format(f) === format(b),
            true
          )
        );
      }
    },
  },
  is_type: {
    argTypes: ['universal', 'universal'],
    identityTypes: [variableType('empty'), textType('')],
    fn: ([a, b]) => boolType(a?.type === b?.value),
  },
  no_size: {
    argTypes: ['universal'],
    identityTypes: [textType('')],
    fn: ([a]) => {
      if ('text' === a?.type || 'list' === a?.type) {
        return boolType(a?.value?.length === 0);
      } else if ('map' === a?.type) {
        return boolType(
          Object.values(a?.value)?.length === 0
        );
      } else {
        return boolType(false);
      }
    },
  },
  // Text
  hash: {
    argTypes: ['text'],
    identityTypes: [textType('')],
    fn: ([b]) => {
      const a = b?.value;
      let hash = 0,
        i,
        chr;
      if (a.length === 0) return hash;
      for (i = 0; i < a.length; i++) {
        chr = a.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0;
      }
      return textType('' + hash);
    },
  },
  regex_replace: {
    argTypes: ['text', 'text', 'text'],
    identityTypes: [
      textType(''),
      textType(''),
      textType(''),
    ],
    fn: ([a, b, c]) =>
      textType(
        a?.value?.replace(
          new RegExp(b?.value, 'g'),
          c?.value
        )
      ),
  },
  regex_remove: {
    argTypes: ['text', 'text'],
    identityTypes: [textType(''), textType('')],
    fn: ([a, b]) =>
      textType(
        a?.value?.replace(new RegExp(b?.value, 'g'), '')
      ),
  },
  regex_has: {
    argTypes: ['text', 'text'],
    identityTypes: [textType(''), textType('')],
    fn: ([a, b]) =>
      boolType(
        a?.value?.match(new RegExp(b?.value, 'g'))?.length >
          0
      ),
  },
  type: {
    argTypes: ['universal'],
    identityTypes: [variableType('empty')],
    fn: ([a]) => {
      return textType(a?.type);
    },
  },
  // to_text
  join: {
    argTypes: ['list', 'text'],
    identityTypes: [listType([]), textType('')],
    fn: ([a, b]) =>
      textType(
        a?.value?.map((x) => format(x))?.join(b?.value)
      ),
  },
  upper: {
    argTypes: ['text'],
    identityTypes: [textType('')],
    fn: ([a]) => textType(a?.value.toUpperCase()),
  },
  lower: {
    argTypes: ['text'],
    identityTypes: [textType('')],
    fn: ([a]) => textType(a?.value.toLowerCase()),
  },
  trim: {
    argTypes: ['text'],
    identityTypes: [textType('')],
    fn: ([a]) => textType(a?.value.trim()),
  },
  unit: {
    argTypes: ['text'],
    identityTypes: [textType('')],
    fn: ([a]) => textType('' + (a?.unit ?? '')),
  },
  // List
  flat: {
    argTypes: ['list'],
    identityTypes: [listType([])],
    fn: ([a, b]) => listType(a?.value?.flat(b?.value ?? 1)),
  },
  range: {
    argTypes: ['number', 'number'],
    identityTypes: [
      numberType(0),
      numberType(1),
      numberType(1),
    ],
    reverse: true,
    fn: ([finish, start, increment]) => {
      const result = [];

      for (
        let i = start?.value || 1;
        i <= finish?.value;
        i += increment?.value || 1
      ) {
        result.push(numberType(i));
      }

      return listType(result);
    },
  },
  repeat: {
    argTypes: ['universal', 'number'],
    identityTypes: [textType(''), numberType(1)],
    fn: ([a, b]) => {
      if ('text' === a?.type) {
        let result = '';
        for (let i = 0; i < b?.value; i++) {
          result += a?.value;
        }
        return textType(result);
      } else if ('list' === a?.type) {
        let result = [];
        for (let i = 0; i < b?.value; i++) {
          result = result.concat(a?.value);
        }
        return listType(result);
      } else {
        return a;
      }
    },
  },
  split: {
    argTypes: ['text', 'text'],
    identityTypes: [textType(''), textType('')],
    fn: ([a, b]) => {
      return listType(
        a?.value.split(b?.value)?.map((x) => textType(x))
      );
    },
  },
  split_every: {
    argTypes: ['list', 'number'],
    identityTypes: [textType(''), numberType(1)],
    fn: ([a, b]) => {
      if ('text' === a?.type) {
        const result = [];
        let i = 0;
        while (i < a?.value.length) {
          result.push(
            textType(a?.value.slice(i, (i += b?.value)))
          );
        }
        return listType(result);
      } else if ('list' === a?.type) {
        const result = [];
        let i = 0;
        while (i < a?.value.length) {
          result.push(
            listType(a?.value.slice(i, (i += b?.value)))
          );
        }
        return listType(result);
      } else {
        return a;
      }
    },
  },
  splice: {
    argTypes: [
      'universal',
      'universal',
      'universal',
      'universal',
    ],
    identityTypes: [
      textType(''),
      textType(''),
      textType(''),
      textType(''),
    ],
    fn: ([a, b, c, d]) => {
      if ('list' === a?.type) {
        const list2 = [...a?.value];
        if (d) {
          list2.splice(b?.value - 1, c?.value, d);
        } else {
          list2.splice(b?.value - 1, c?.value);
        }
        return listType(list2);
      } else {
        const text2 =
          'variable' === a?.type ? [] : a?.value?.split('');
        if (d) {
          text2.splice(b?.value - 1, c?.value, d?.value);
        } else {
          text2.splice(b?.value - 1, c?.value);
        }
        return textType(text2.join(''));
      }
    },
  },
  // to_list
  keys: {
    argTypes: ['map'],
    identityTypes: [textType('')],
    fn: ([a]) =>
      listType(Object.keys(a?.value).map(textType)),
  },
  values: {
    argTypes: ['map'],
    identityTypes: [textType('')],
    fn: ([a], vars) => listType(Object.values(a?.value)),
  },
  regex_match: {
    argTypes: ['text', 'text'],
    identityTypes: [textType(''), textType('')],
    fn: ([a, b]) => {
      return listType(
        a?.value
          ?.match(new RegExp(b?.value, 'g'))
          ?.map((x) => textType(x)) ?? []
      );
    },
  },

  // Map

  '++': {
    argTypes: ['universal', 'universal'],
    identityTypes: [listType([]), listType([])],
    fn: (a, vars) => {
      if ('text' === a?.[0]?.type) {
        return textType(
          a?.map((x) => format(compute(x, vars))).join('')
        );
      } else if ('list' === a?.[0]?.type) {
        return listType(
          [].concat(
            ...a?.map((x) => {
              return 'list' === x?.type ? x?.value : [x];
            })
          )
        );
      } else if ('map' === a?.[0]?.type) {
        return mapType(
          Object.assign(
            {},
            ...a?.map((x) =>
              'variable' === x?.type ? {} : x?.value
            )
          )
        );
      }
    },
  },
  reverse: {
    argTypes: ['universal'],
    identityTypes: [mapType({})],
    fn: ([a]) => {
      if ('text' === a?.type) {
        return textType(
          a?.value?.split('')?.slice().reverse()?.join('')
        );
      } else if ('list' === a?.type) {
        return listType(a?.value?.slice().reverse());
      } else if ('map' === a?.type) {
        return mapType(
          Object.fromEntries(
            Object.entries(a?.value)?.slice().reverse()
          )
        );
      } else {
        return a;
      }
    },
  },
  get: {
    argTypes: ['universal', 'universal'],
    identityTypes: [mapType({}), listType([])],
    fn: ([r, path]) => {
      let result = r;
      for (let p of path?.value) {
        if ('text' === result?.type) {
          result = textType(result?.value?.[p?.value - 1]);
        } else if ('list' === result?.type) {
          result = result?.value?.[p?.value - 1];
        } else if ('map' === result?.type) {
          result = result?.value?.[p?.value];
        } else {
          return variableType('empty');
        }
      }
      return result ?? variableType('empty');
    },
  },
  dotget: {
    complete: true,
    argTypes: ['universal', 'universal'],
    identityTypes: [mapType({}), listType([])],
    meta: true,
    fn: ([_result, _path], v) => {
      let result = compute(_result, v);
      const path = compute(_path, v);

      let vars = { ...v };

      // if (result?.vars) {
      //   vars = { ...vars, ...result?.vars };
      // }

      for (let p of path?.value) {
        if ('list' === result?.type) {
          result = result?.value?.[p?.value - 1];
        } else if (
          'map' === result?.type &&
          result?.event
        ) {
          result = compute(
            parensType([
              variableType('event'),
              textType(p?.value),
              result,
            ]),
            vars
          );
        } else if ('map' === result?.type) {
          result = result?.value?.[p?.value];
        } else {
          return variableType('empty');
        }

        // if (result?.vars) {
        //   vars = { ...vars, ...result?.vars };
        // }
      }

      return compute(result, vars) ?? variableType('empty');
    },
  },
  set: {
    argTypes: ['universal', 'universal', 'universal'],
    identityTypes: [listType([])],
    reverse: true,
    fn: ([a, b, c], vars) => {
      return compute(
        parensType([
          variableType('set_out'),
          a,
          b,
          combine(
            c,
            parensType([variableType('get'), a, b])
          ),
        ]),
        vars
      );
    },
  },
  set_out: {
    argTypes: ['universal', 'universal', 'universal'],
    identityTypes: [listType([])],
    fn: ([a, b, c]) => {
      const path = [textType('root'), ...b?.value];
      const top = mapType({ root: undefined });
      let scopeOld = mapType({ root: a });
      let scopeNew = top;
      for (let i = 0; i < path.length; i++) {
        const p =
          'list' === scopeOld?.type
            ? path[i]?.value - 1
            : path[i]?.value;

        scopeOld = scopeOld?.value[p];

        if (i === path?.length - 1) {
          const result = c;
          scopeNew.value[p] = result;
        } else {
          if ('list' === scopeOld?.type) {
            scopeNew.value[p] = listType([
              ...scopeOld?.value,
            ]);
          } else {
            scopeNew.value[p] = mapType({
              ...scopeOld?.value,
            });
          }
          scopeNew = scopeNew?.value[p];
        }
      }
      return top?.value?.root;
    },
  },
  remove: {
    fn: ([a]) => boolType(true),
  },
  each: {
    argTypes: ['map', 'universal'],
    identityTypes: [mapType({}), variableType('empty')],
    identityTypes: mapType({}),
    fn: ([a, b], vars) => {
      if ('list' === a?.type) {
        const result = parensType([
          variableType('[]'),
          ...a?.value?.map((x) => combine(b, x)),
        ]);

        return compute(result, vars);
      } else if ('map' === a?.type) {
        return compute(
          parensType([
            variableType('{}'),
            ...Object.entries(a?.value)
              .map(([k, x]) => {
                return [variableType(k), combine(b, x)];
              })
              .flat(),
          ]),
          vars
        );
      } else {
        return variableType('empty');
        // return 12;
      }
    },
  },
  ieach: {
    argTypes: ['map', 'universal'],
    identityTypes: [mapType({}), variableType('empty')],
    identityTypes: mapType({}),
    fn: ([a, b], vars) => {
      if ('list' === a.type) {
        const result = parensType([
          variableType('[]'),
          ...a?.value?.map((x, i) =>
            combine(b, numberType(i + 1), x)
          ),
        ]);

        return compute(result, vars);
      } else if ('map' === a.type) {
        return compute(
          parensType([
            variableType('{}'),
            ...Object.entries(a?.value)
              .map(([k, x], i) => {
                return [
                  variableType(k),
                  combine(b, numberType(i + 1), x),
                ];
              })
              .flat(),
          ]),
          vars
        );
      } else {
        // return 12;
      }
    },
  },
  // kieach: {
  //
  //   fn: (a) => ,
  // },
  filter: {
    argTypes: ['map', 'universal'],
    identityTypes: [mapType({}), variableType('empty')],
    identityTypes: mapType({}),
    fn: ([a, b], vars) => {
      if ('list' === a.type) {
        const result = parensType([
          variableType('[]'),
          ...a?.value
            ?.map((x) => {
              const v = compute(combine(b, x));

              if (v?.value) {
                return x;
              } else {
                return false;
              }
            })
            ?.filter((x) => x),
        ]);

        return compute(result, vars);
      } else if ('map' === a.type) {
        return compute(
          parensType([
            variableType('{}'),
            ...Object.entries(a?.value)
              .map(([k, x]) => {
                return [variableType(k), combine(b, x)];
              })
              .flat(),
          ]),
          vars
        );
      } else {
        // return 12;
      }
    },
  },
  entries: {
    argTypes: ['universal'],
    identityTypes: [mapType({})],
    fn: ([a], vars) => {
      return listType(
        Object.entries(a?.value).map(([a, b]) =>
          listType([textType(a), b])
        )
      );
    },
  },
  // - (kifilter map universal) map
  // - (ifilter map universal) map
  // - (sort map universal) map
  // - (isort map universal) map
  // - (kisort map universal) map
  // - (to_map list) map
  append: {
    argTypes: ['text', 'text'],
    identityTypes: [textType(''), textType('')],
    reverse: true,
    fn: ([a, b]) => {
      if ('text' === a?.type) {
        return textType(a?.value + b?.value);
      }
    },
  },
  prepend: {
    argTypes: ['text', 'text'],
    identityTypes: [textType(''), textType('')],
    reverse: true,
    fn: ([a, b]) => {
      if ('text' === a?.type) {
        return textType(b?.value + a?.value);
      }
    },
  },
  lefts: {
    argTypes: ['list'],
    identityTypes: [listType([])],
    fn: ([a]) => {
      if ('list' === a?.type) {
        return listType(a?.value.slice(0, -1));
      } else if ('map' === a?.type) {
        return mapType(
          Object.fromEntries(
            Object.entries(a?.value)?.slice?.(0, -1)
          )
        );
      }
    },
  },
  rights: {
    argTypes: ['list'],
    identityTypes: [listType([])],
    fn: ([a]) => {
      if ('list' === a?.type) {
        return listType(a?.value?.slice?.(1));
      } else if ('map' === a?.type) {
        return mapType(
          Object.fromEntries(
            Object.entries(a?.value)?.slice?.(1)
          )
        );
      }
    },
  },
  // - (group list) map

  // universal
  ':': {
    argTypes: ['universal'],
    identityTypes: [variableType('empty')],
    fn: ([a, ...b], vars) => {
      let result = a;

      for (let i = 0; i < b?.length; i++) {
        result = combine(b[i], result);
      }

      return compute(result, vars);
    },
  },
  first: {
    argTypes: ['universal'],
    identityTypes: [listType([])],
    fn: ([a]) => {
      if ('text' === a?.type) {
        return textType(a?.value?.[0]);
      } else if ('list' === a?.type) {
        return a?.value?.[0];
      } else if ('map' === a?.type) {
        return Object.entries(a?.value)?.[0]?.[1];
        // return mapType(
        //   Object.fromEntries([
        //     Object.entries(a?.value)?.[0],
        //   ])
        // );
      }
    },
  },
  last: {
    argTypes: ['universal'],
    identityTypes: [listType([])],
    reverse: true,
    fn: ([a, howMany]) => {
      if (howMany) {
        const hm = -howMany?.value;

        if ('text' === a?.type) {
          return textType(a?.value?.slice(hm));
        } else if ('list' === a?.type) {
          return listType(a?.value?.slice(hm));
        } else if ('map' === a?.type) {
          return mapType(
            Object.entries(a?.value)?.slice(hm)?.[1]
          );
        }
      } else {
        if ('text' === a?.type) {
          return textType(a?.value?.slice(-1)?.[0]);
        } else if ('list' === a?.type) {
          return a?.value?.slice(-1)?.[0];
        } else if ('map' === a?.type) {
          return Object.entries(a?.value)?.slice(
            -1
          )?.[0]?.[1];
          // return mapType(
          //   Object.fromEntries([
          //     Object.entries(a?.value)?.[0],
          //   ])
          // );
        }
      }
    },
  },
  '??': {
    meta: true,
    complete: true,
    argTypes: ['universal'],
    identityTypes: [variableType('empty')],
    fn: ([a, b], vars) => {
      const computedA = compute(a, vars);

      if (jsBool(computedA)) {
        return computedA;
      } else {
        return compute(b, vars);
      }
    },
  },
  '?': {
    meta: true,

    complete: true,
    argTypes: ['universal'],
    identityTypes: [variableType('empty')],
    fn: ([a, b, ...r], vars) => {
      // let i = 0;

      // while (i < a.length + 10) {
      //   if (i >= a.length - 1) {
      //     return a[i];
      //   } else if (rawBool(a[i])) {
      //     return a[i + 1];
      //   }
      //   i += 2;
      // }

      if (!b) {
        return compute(a, vars);
      } else if (jsBool(compute(a, vars)) || !r.length) {
        return compute(b, vars);
      } else {
        return compute(
          parensType([variableType('?'), ...r]),
          vars
        );
      }
    },
  },
  identity: {
    argTypes: ['universal'],
    identityTypes: [variableType('empty')],
    fn: ([a]) => a,
  },
  reduce: {
    argTypes: ['list', 'universal'],
    identityTypes: [listType([]), variableType('empty')],
    fn: ([a, fn, init], vars) => {
      let result = init
        ? compute(combine(fn, init, a?.value?.[0]), vars)
        : compute(a?.value?.[0], vars);

      for (let i = 1; i < a?.value?.length; i++) {
        result = compute(
          combine(fn, result, a?.value[i]),
          vars
        );
      }

      return result;

      // const x = _a;
      // const a = x?.value;
      // const init = _init;
      // let result = init ? combine(fn, init, a?.[0]) : a?.[0];
      // for (let i = 1; i < a.length; i++) {
      //   result = combine(fn, result, a[i]);
      // }
      // return await run(vars, result);
    },
  },
  let: {
    meta: true,
    argTypes: ['universal'],
    identityTypes: [variableType('empty')],
    fn: (code, v) => {
      const vars = { ...v };

      for (let n = 1; n < code?.length; n += 2) {
        vars[code[n - 1]?.value] = code[n];
      }

      return compute(last(code), vars);
    },
  },
  vars: {
    meta: true,
    argTypes: ['universal'],
    identityTypes: [variableType('empty')],
    fn: ([_vars, code], v) => {
      const vars = compute(_vars, v);
      return compute(code, { ...vars?.value, ...v });
    },
  },
  make_module: {
    meta: true,
    argTypes: ['universal'],
    identityTypes: [variableType('empty')],
    fn: (code, v) => {
      const vars = { ex: parensType([]) };

      for (let n = 1; n < code?.length; n += 2) {
        if ('ex' === code[n - 1]?.value) {
          vars.ex = parensType([
            variableType('[]'),
            ...(vars?.ex?.value?.slice(1) ?? []),
            parensType([
              variableType('{}'),
              variableType('actual'),
              code[n],
              variableType('expect'),
              code[n + 1],
              variableType('passed'),
              parensType([
                variableType('='),
                code[n],
                code[n + 1],
              ]),
            ]),
          ]);
          n++;
        } else if (
          '{}' === code[n - 1]?.value?.[0]?.value
        ) {
          const variables = code[n - 1]?.value?.slice(1);
          for (let variable of variables) {
            const s = variable?.value?.split(':');
            vars[last(s)] = parensType([
              variableType('get'),
              code[n],
              listType([textType(first(s))]),
            ]);
          }
        } else if (
          '[]' === code[n - 1]?.value?.[0]?.value
        ) {
          const variables = code[n - 1]?.value?.slice(1);
          for (let i = 0; i < variables?.length; i++) {
            vars[variables[i]?.value] = parensType([
              variableType('get'),
              code[n],
              listType([textType(i + 1)]),
            ]);
          }
        } else if ('variable' !== code[n - 1]?.type) {
          n--;
        } else {
          vars[code[n - 1]?.value] = code[n];
        }
      }

      vars.default = last(code);

      for (let k in vars) {
        // const v = { ...vars };
        // delete v[k];
        // vars[k] = parensType([
        //   variableType('vars'),
        //   mapType(v),
        //   vars[k],
        // ]);

        vars[k].moduleVars = vars;
      }

      return mapType(vars);
    },
  },
  module: {
    argTypes: ['universal'],
    identityTypes: [variableType('empty')],
    // meta: true,
    fn: ([a], v) => {
      const m = modules[a?.value];

      return m;
    },
  },
  '#': {
    meta: true,
    argTypes: ['universal'],
    identityTypes: [variableType('empty')],
    fn: (code, v) => {
      const values = lefts(lefts(code));
      const variables = secondLast(code)?.value;

      if (
        values?.length >=
        variables?.filter((x) => '?' !== last(x?.value))
          ?.length
      ) {
        const vars = { ...v };

        const removeQuestionMark = (a) =>
          ('' + a).replace(/\?$/, '');

        for (let i = 0; i < values?.length; i++) {
          if ('{}' === variables[i]?.value?.[0]?.value) {
            const vv = variables[i]?.value?.slice(1);
            for (let vvv of vv) {
              const s = vvv?.value?.split(':');
              vars[removeQuestionMark(last(s))] =
                parensType([
                  variableType('get'),
                  compute(values[i], v),
                  listType([textType(first(s))]),
                ]);
            }
          } else if (
            '[]' === variables[i]?.value?.[0]?.value
          ) {
            const vv = variables[i]?.value?.slice(1);
            for (let j = 0; j < vv?.length; j++) {
              vars[removeQuestionMark(vv[j]?.value)] =
                parensType([
                  variableType('get'),
                  compute(values[i], v),
                  listType([textType(j + 1)]),
                ]);
            }
          } else {
            vars[removeQuestionMark(variables[i]?.value)] =
              compute(values[i], v);
          }
        }

        last(code).vars = vars;

        return compute(last(code), vars);
      } else {
        return {
          ...parensType([variableType('#'), ...code]),
          vars: v,
        };
      }
    },
  },
  '[]': {
    meta: true,
    argTypes: ['universal'],
    identityTypes: [variableType('empty')],
    fn: (a, vars) => {
      const result = [];

      for (let i = 0; i < a?.length; i++) {
        const item = compute(a[i], vars);

        if ('put' === item?.type) {
          const item = compute(a[i]?.value, vars);

          if ('list' === item?.type) {
            result.push(...item?.value);
          } else {
            result.push(item);
          }
        } else {
          result.push(item);
        }
      }

      return listType(result);
    },
  },
  '{}': {
    meta: true,
    argTypes: ['universal'],
    identityTypes: [variableType('empty')],
    fn: (a, vars) => {
      let m = {};

      for (let i = 0; i < a.length; i += 2) {
        if ('put' === a[i]?.type) {
          const item = compute(a[i]?.value, vars);

          if ('map' === item?.type) {
            m = { ...m, ...item?.value };
          } else if ('variable' === a[i]?.value?.type) {
            m[a[i]?.value?.value] = item;
          } else {
            m[a[i]?.value] = item;
          }

          i--;
        } else if ('drop' === a[i]?.type) {
          const item = compute(a[i]?.value, vars);

          if ('map' === item?.type) {
            m[a[i]?.value?.value] = item;
          } else if ('variable' === a[i]?.value?.type) {
            m[a[i]?.value?.value] = item;
          } else {
            m[a[i]?.value] = item;
          }

          i--;
        } else {
          m[
            'parens' === a[i]?.type
              ? format(compute(a[i], vars))
              : a[i]?.value
          ] = compute(a[i + 1], vars);
        }
      }

      return mapType(m);
    },
  },
  event: {
    argTypes: ['universal', 'universal', 'universal'],
    identityTypes: [variableType('empty')],
    reverse: true,
    fn: (a) => {
      const user = a?.slice(-1)?.[0];
      const event = a?.slice(-2)?.[0];
      const args = a?.slice(0, -2);

      return mapType({
        $event: event,
        args: listType(args),
        type: user?.value?.type,
        auth: user?.value?.auth,
      });
    },
  },
  local_user: {
    argTypes: ['universal'],
    identityTypes: [variableType('empty')],
    reverse: true,
    fn: ([auth, events]) => {
      // users.value[auth?.value?.split?.(':')?.[0]] =
      //   permissions;

      return eventType({
        type: textType('local_user'),
        auth,
        events,
      });
    },
  },
  client: {
    argTypes: ['universal'],
    identityTypes: [variableType('empty')],
    reverse: true,
    fn: ([auth, events]) => {
      // users.value[auth?.value?.split?.(':')?.[0]] =
      //   permissions;

      tap('123');

      return eventType({
        type: textType('client'),
        auth,
        events,
      });
    },
  },
  server: {
    argTypes: ['universal'],
    identityTypes: [variableType('empty')],
    reverse: true,
    fn: ([url, auth, events]) => {
      // users.value[auth?.value?.split?.(':')?.[0]] =
      //   permissions;0

      return eventType({
        type: textType('server'),
        auth,
        events,
        url,
      });
    },
  },
};

// const users = mapType({});

export const toJs = (a) => {
  if ('list' === a?.type) {
    return a?.value?.map(toJs);
  } else if ('map' === a?.type) {
    return Object.fromEntries(
      Object.entries(a?.value).map(([a, b]) => [a, toJs(b)])
    );
  } else {
    return a?.value ?? a;
  }
};

export const toKiwi = (a) => {
  if (Array.isArray(a)) {
    return listType(a.map(toKiwi));
  } else if ('object' === typeof a) {
    return mapType(
      Object.fromEntries(
        Object.entries(a).map(([a, b]) => [a, toKiwi(b)])
      )
    );
  } else if ('number' === typeof a) {
    return numberType(a);
  } else if ('boolean' === typeof a) {
    return boolType(a);
  } else if ('string' === typeof a) {
    return textType(a);
  }
};

export const format = (a, parent) => {
  if ('number' === a?.type) {
    return '' + a?.value + (a?.comment ?? ''); // + (a?.unit ? a?.unit : '');
  } else if ('comparable' === a?.type) {
    if (Infinity === a?.value) {
      return 'infinity';
    } else if (-Infinity === a?.value) {
      return '-infinity';
    }
  } else if ('bool' === a?.type) {
    return '' + a?.value;
  } else if ('text' === a?.type) {
    if (parent) {
      return `'${a?.value}'`;
    } else {
      return a?.value;
    }
  } else if ('variable' === a?.type) {
    return a?.value;
  } else if ('list' === a?.type) {
    if (a?.dotList) {
      return `.${a?.value?.map((x) => x.value)?.join('.')}`;
    } else {
      const data = a?.value?.map((x) => format(x, 'list'));

      if (
        data?.join(' ').length > lineTooLong ||
        data?.some((x) => x?.match(/;/))
      ) {
        // tap('too long');
        return `[\n${addIndention(data)}\n]`;
      } else {
        return `[ ${data?.join(' ')} ]`;
      }
    }
  } else if ('map' === a?.type) {
    const data = Object.entries(a?.value)?.map(
      ([k, v]) => `${k} ${format(v, 'map')}`
    );

    if (data?.join(' ').length > mapTooLong) {
      return `{\n${addIndention(data)}\n}`;
    } else {
      return `{ ${data?.join(' ')} }`;
    }
  } else if ('parens' === a?.type) {
    if (a?.value?.[0]?.value === 'file') {
      return splitEveryTwo(
        a?.value?.slice(1).map((x) => format(x, 'parens'))
      )
        .map((x) => x.join(' '))
        .join('\n\n');
    } else if (a?.value?.[0]?.value === '#') {
      return `(# ${secondLast(a?.value)
        ?.value.map?.(format)
        .join(' ')} ${format(last(a?.value))})`;
    } else if (a?.value?.[0]?.value === 'make_module') {
      const m = splitEveryTwo(a?.value?.slice(1));

      return m
        .map((x) =>
          x.map((x) => format(x, 'module')).join(' ')
        )
        .join('\n\n');
    } else if (a?.value?.[0]?.value === '[]') {
      return (
        format(makeList(a?.value?.slice(1))) +
        (a?.comment ?? '')
      );
    } else if (a?.value?.[0]?.value === '{}') {
      return format(makeMap(a?.value?.slice(1)));
    } else if (a?.value?.[0]?.value === 'dotget') {
      return `${format(a?.value?.[1])}${format(
        a?.value?.[2]
      )}`;
    } else {
      return (
        `(${a?.value
          ?.map((x) => format(x, 'parens'))
          ?.join(' ')})` + (a?.comment ?? '')
      );
    }
  } else if ('error' === a?.type) {
    return `ERROR: ${a?.value}`;
  } else if (undefined === a || isNaN(a)) {
    return 'empty';
  }
};

const tokens = (chars) => {
  let context = ['normal'];

  let tokens = [''];

  const schars = chars?.split('');

  for (let i = 0; i < schars?.length; i++) {
    const char = schars[i];

    if ('normal' === last(context)) {
      if ('(' === char) {
        context.push('normal');

        tokens.push(char);
        tokens.push('');
      } else if ('[' === char) {
        context.push('normal');

        tokens.push('(');
        tokens.push('[]');
        tokens.push('');
      } else if ('{' === char) {
        context.push('normal');

        tokens.push('(');
        tokens.push('{}');
        tokens.push('');
      } else if ([')', ']', '}'].includes(char)) {
        context.pop();

        tokens.push(')');
        tokens.push('');
      } else if ("'" === char) {
        context.push('text');

        tokens.push('(');
        tokens.push("'");
        tokens.push('');
      } else if ('@' === char) {
        tokens.push('@');
        tokens.push('');
      } else if (
        '.' === schars[i] &&
        '.' === schars[i + 1] &&
        '.' === schars[i + 2]
      ) {
        i += 2;
        tokens.push('...');
        tokens.push('');
      } else if (' ' === char || '\n' === char) {
        tokens.push('');
      } else if (';' === char) {
        // tokens.push('(');
        // tokens.push(';');
        // tokens.push('');
        let comment = '';
        let j = i - 1;
        while ('\n' === schars[j] || ' ' === schars[j]) {
          comment = schars[j] + comment;
          j--;
        }
        while ('\n' !== schars[i]) {
          comment += schars[i];
          i++;
        }
        i--;
        // comment += '\n';
        // tap(comment);
        tokens.push(comment);
        // tokens.push(')');/
        tokens.push('');
      } else {
        tokens[tokens?.length - 1] += char;
      }
    } else if ('text' === last(context)) {
      if ("'" === char && '\\' !== schars[i - 1]) {
        context.pop();

        tokens.push(')');
        tokens.push('');
      } else if (
        '\\' === schars[i] &&
        'n' === schars[i + 1]
      ) {
        tokens.push('\n');
        tokens.push('');
        i++;
      } else if ('(' === char && '\\' !== schars[i - 1]) {
        context.push('normal');

        tokens.push(char);
        tokens.push('');
      } else {
        tokens[tokens?.length - 1] += char;
      }
    }
  }

  return tokens.filter((x) => x);
};

const nestTokens = (tokens) => {
  let groups = [[]];
  let drop = 0;
  let dropLength = -1;

  for (let i = 0; i < tokens?.length; i++) {
    const token = tokens[i];

    if ('(' === token) {
      groups.push([]);
    } else if ([')'].includes(token)) {
      const pop = groups.pop();

      last(groups).push(pop);
    } else if (['@'].includes(token)) {
      i++;
      last(groups).push(['@', tokens[i]]);
    } else if (['...'].includes(token)) {
      i++;
      last(groups).push(['...', tokens[i]]);
    } else if (';' === token?.replace(/[\n ]/g, '')?.[0]) {
      const pop = last(groups).pop();

      groups.push([]);
      last(groups).push(';');
      last(groups).push(token);
      last(groups).push(pop);
      {
        const pop = groups.pop();

        last(groups).push(pop);
      }
    } else if ([' ', '\n'].includes(token)) {
      if (first(last(groups)) === "'") {
        last(groups).push(token);
      }
    } else {
      last(groups).push(token);
    }
  }

  return groups?.[0]?.[0];
};

const ast = (nestedTokens) => {
  if (Array.isArray(nestedTokens)) {
    if ("'" === nestedTokens?.[0]) {
      if (
        nestedTokens
          ?.slice(1)
          ?.some((x) => Array.isArray(x))
      ) {
        return parensType([
          variableType('++'),
          ...nestedTokens
            ?.slice(1)
            ?.map((x) =>
              Array.isArray(x) ? ast(x) : textType(x)
            ),
        ]);
      } else {
        return textType(nestedTokens?.slice(1)?.join(''));
      }
      return parseText(nestedTokens);
    } else if (';' === nestedTokens?.[0]) {
      return {
        ...ast(nestedTokens?.[2]),
        comment: nestedTokens?.[1],
      };
    } else if ('@' === nestedTokens?.[0]) {
      return dropType(ast(nestedTokens?.[1]));
    } else if ('...' === nestedTokens?.[0]) {
      return putType(ast(nestedTokens?.[1]));
    } else if ('#' === nestedTokens?.[0]) {
      const middle = lefts(rights(nestedTokens)).map(ast);
      const hashIndex = middle.findIndex(
        (x) => '#' === x?.value
      );

      if (-1 === hashIndex) {
        return parensType([
          variableType('#'),
          listType(middle),
          ast(last(nestedTokens)),
        ]);
      } else {
        return parensType([
          variableType('#'),
          listType(middle.slice(0, hashIndex)),
          parensType([
            variableType('let'),
            ...middle.slice(hashIndex + 1, Infinity),
            ast(last(nestedTokens)),
          ]),
        ]);
      }
    } else {
      return parensType(nestedTokens.map(ast));
    }
  } else if ('true' === nestedTokens) {
    return boolType(true);
  } else if ('false' === nestedTokens) {
    return boolType(false);
  } else if ('infinity' === nestedTokens) {
    return comparableType(Infinity);
  } else if ('-infinity' === nestedTokens) {
    return comparableType(-Infinity);
  } else if ('tau' === nestedTokens) {
    return numberType(Math.PI * 2);
  } else if ('pi' === nestedTokens) {
    return numberType(Math.PI);
  } else if ('euler' === nestedTokens) {
    return numberType(Math.E);
  } else if ('_time' === nestedTokens) {
    return mapType({ _time: listType([]) });
  } else if ('...' === nestedTokens) {
    return variableType('...');
  } else if (
    (+nestedTokens.replace(/_/g, '') ||
      0 === +nestedTokens.replace(/_/g, '')) &&
    '.' !== nestedTokens?.[0]
  ) {
    return numberType(nestedTokens.replace(/_/g, ''));
  } else if (/\./g.test(nestedTokens?.[0])) {
    return dotListType(
      nestedTokens.split('.')?.slice(1)?.map(textType)
    );
  } else if (
    !/[0-9]/.test(nestedTokens?.[0]) &&
    /\./g.test(nestedTokens)
  ) {
    const x = nestedTokens.split('.');

    return parensType([
      variableType('dotget'),
      variableType(x?.[0]),
      dotListType(x?.slice(1)?.map(textType)),
    ]);
  } else {
    return variableType(nestedTokens);
  }
};

export const parse = (t) => {
  const a = ast(nestTokens(tokens(t)));

  return a;
};

const deref = (code, vars) => {
  if ('variable' === code?.type && vars?.[code?.value]) {
    let v = vars?.[code?.value];
    while ('variable' === v?.type && vars?.[v?.value]) {
      v = vars?.[v?.value];
    }
    return v;
  } else {
    return code;
  }
};

export const compute = (code, v) => {
  const vars = code?.moduleVars
    ? code?.moduleVars
    : { ...v, ...code?.vars };

  if (code?.type === 'parens') {
    const fn2 = deref(first(code?.value), vars);

    const fn =
      'parens' === fn2?.type &&
      'dotget' === fn2?.value?.[0]?.value
        ? compute(fn2, vars)
        : fn2;

    if ('parens' === fn?.type) {
      return compute(
        parensType([
          first(fn?.value),
          ...rights(code?.value),
          ...rights(fn?.value),
        ]),
        fn?.moduleVars
          ? { ...vars, ...fn?.moduleVars } /// I think this is broken
          : { ...vars, ...fn?.vars }
      );
    } else if ('list' === fn?.type && fn?.dotList) {
      if (rights(code?.value)?.length >= 2) {
        const args = rights(code?.value);

        return compute(
          parensType([
            variableType('set'),
            args?.[0],
            fn,
            args?.[1],
          ]),
          vars
        );
      } else {
        return code;
      }
    } else if (
      'variable' === fn?.type &&
      core?.[fn?.value]
    ) {
      const c = core?.[fn?.value];

      const args = rights(code?.value)
        .flatMap((arg) => {
          if (c?.meta) {
            return arg;
          } else {
            const a = compute(arg, vars);
            if ('drop' === a?.type) {
              const b = compute(a?.value, vars);
              if ('list' === b?.type) {
                return b?.value;
              } else {
                return b;
              }
            } else {
              return a;
            }
          }
        })
        .map((arg, i) => {
          const type = c.argTypes[i] ?? last(c.argTypes);

          // tap('sb', subType(arg, type), arg?.type, type);

          if (subType(arg, type)) {
            return arg;
          } else {
            return (
              c.identityTypess?.[i] ??
              last(c.identityTypess)
            );
          }
        });

      if (args?.length >= c.argTypes?.length) {
        return c?.fn?.(args, {
          ...vars,
        });
      } else {
        return code;
      }
    } else {
      return fn;
    }
  } else if (
    'variable' === code?.type &&
    vars?.[code?.value]
  ) {
    return compute(deref(code, vars), vars);
  } else {
    return code;
  }
};

globalThis.$ = mapType({});

// const folder = process.argv[2]
//   ? dirname(resolve(process.argv[2]))
//   : process.cwd();

const folder = '';

const isHttp = (a) =>
  'https://' === a?.slice(0, 8) ||
  'http://' === a?.slice(0, 7);

const coreEvents = {
  random: {
    fn: ([b, a]) => {
      const aa = jsBool(a?.value) ? a?.value : 1;

      return numberType(
        Math.floor(Math.random() * (b?.value - aa + 1) + aa)
      );
    },
  },
  time: {
    fn: ([]) => {
      return textType(new Date().toISOString());
    },
  },
  timer: {
    fn: ([b, a]) =>
      new Promise((res, rej) => {
        const finish = async () => {
          const [event, eventBlock] =
            Object.entries(b?.value)?.[0] ?? [];

          tap(b?.value);
          const v = await runEvent({
            event: event?.slice(1),
            args: eventBlock?.value?.args?.value,
            auth: eventBlock?.value?.auth?.value,
            type: eventBlock?.value?.type?.value,
          });

          res(v);
        };

        setTimeout(() => {
          finish();
        }, (a?.value ?? 1) * 1000);
      }),
  },
  interval: {
    fn: ([b, a]) =>
      new Promise((res, rej) => {
        const [event, eventBlock] =
          Object.entries(b?.value)?.[0] ?? [];

        setInterval(() => {
          runEvent({
            event: event?.slice(1),
            args: eventBlock?.value?.args?.value,
            auth: eventBlock?.value?.auth?.value,
            type: eventBlock?.value?.type?.value,
          });
        }, (a?.value ?? 1) * 1000);

        res();
      }),
  },
  alert: {
    fn: ([a]) => {
      alert(a?.value);

      return textType('alert: ' + a?.value);
    },
  },
  identity: {
    fn: ([a]) => {
      return a;
    },
  },
};

// const auth = input.value[$key].value.auth;
// delete input.value[$key].value.auth;

// const key = $key.slice(1);

// const args = input?.value[$key]?.value?.args?.value
//   ?.slice()
//   .reverse();

// const type = input.value[$key]?.value?.type?.value;

// if ('local_user' === type) {
//   tap(input?.value[$key]);
//   localUser($key, key, args, parent, upKey, {
//     event: key,
//     args,
//     type,
//     auth: auth?.value,
//   });
// } else if (
//   'client' === input.value[$key]?.value?.type?.value
// ) {
//   socket.emit(
//     'client',
//     textType(key),
//     args,
//     auth,
//     () => {}
//   );
// } else if (
//   'server' === input.value[$key]?.value?.type?.value
// ) {
//   socket.emit(
//     'meta',
//     {
//       event: key,
//       args,
//       type,
//       auth: auth?.value,
//     },
//     metaAuth,
//     (a) => {}
//   );
// }

globalThis.events = {
  0: {
    event: 'start',
    args: [],
    auth: 'what',
    type: 'local_user',
  },
};
let eventId = 1;

const findEvents = (input, path) => {
  if (input?.type === 'list') {
    return input?.value
      ?.flatMap?.((value, i) => {
        return findEvents(value, [...path, i + 1]);
      })
      .filter((x) => x);
  } else if (input?.type === 'map') {
    const f = () => {
      if (input?.value?.$event && input?.value?.auth) {
        const auth = input?.value?.auth;

        delete input.value.auth;

        return [
          {
            event: input?.value?.$event?.value,
            args: input?.value?.args?.value,
            path,
            auth: auth?.value,
            type: input?.value?.type?.value,
          },
        ];
      } else {
        return [];
      }
    };

    return [
      ...f(),
      ...input?.value
        ?.e()
        .flatMap(([$key, value]) => {
          return findEvents(value, [...path, $key]);
        })
        .filter((x) => x),
    ];
  }
};

export const setState = () => {};

const setValue = ($, value, path) => {
  let result = $;
  for (let i = 0; i < path.length; i++) {
    const p =
      'list' === result?.type ? path[i] - 1 : path[i];

    if (i === path?.length - 1) {
      result.value[p] = value;
    } else {
      result = result?.value[p];
    }
  }
};

const getValue = ($, path) => {
  let result = $;
  for (let i = 0; i < path.length; i++) {
    const p =
      'list' === result?.type ? path[i] - 1 : path[i];

    if (i === path?.length - 1) {
      return result.value[p];
    } else {
      result = result?.value[p];
    }
  }
};

export const runEvent = async (eventBlock) => {
  const { event, args, path, auth, type } = eventBlock;
  tap('EVENT:', event);

  if (mod?.value?.['$' + event] && 'local_user' === type) {
    $ = compute(
      parensType([mod?.value?.['$' + event], $, ...args])
    );
  } else if (coreEvents?.[event]) {
    const v = await coreEvents?.[event]?.fn(args);

    if (v && path) {
      setValue($, v, path);
    }
  } else if ('init' === event || 'start' === event) {
    $ = compute($);
  } else {
    const v = await new Promise((res, rej) => {
      const { event, args } = eventBlock;

      tap(
        'REMOTE_EVENT:',
        type,
        coreEvents?.[event],
        event,
        args.map(toJs),
        auth?.split(':')?.[0]
      );

      socket?.emit?.(
        event,
        {
          args: args.map(toJs),
          auth,
          type,
        },
        (a) => {
          res(toKiwi(a));
        }
      );
    });

    if (v && path) {
      setValue($, v, path);
    }
  }

  const out = mapType({ ...$?.value?.out?.value });
  const outEvents =
    (path && $.value.out
      ? findEvents($.value.out, [...path, 'out'])
      : []) ?? [];
  if (path && outEvents?.length) {
    setValue($, out, [...path, 'out']);
  }

  delete $.value.out;

  const newEvents = [
    ...outEvents,
    ...(findEvents($, []) ?? []),
  ];

  if (newEvents?.length) {
    if (out || 'init' === event) {
      otherEvents();

      await Promise.all(newEvents.map(runEvent));

      otherEvents();

      if (outEvents?.length) {
        $.value.out = getValue($, [...path, 'out']);

        const x = await runEvent(eventBlock);

        setValue($, x, path);

        return x;
      } else {
        return out;
      }
    } else {
      otherEvents();

      Promise.all(newEvents.map(runEvent));

      otherEvents();

      return boolType(true);
    }
  } else {
    otherEvents();

    if (out) {
      return out;
    } else {
      return boolType(true);
    }
  }
};

let started = false;

const otherEvents = () => {
  if ($?.value?.log) {
    const log = format($?.value?.log);

    console.log(log);

    // socket.emit(
    //   'meta',
    //   {
    //     event: 'log',
    //     args: [textType('\n;;\n\n' + log)],
    //     auth: 'meta:123421897361283946',
    //   },
    //   metaAuth
    // );

    delete $?.value?.log;
  }

  if (mod?.value?.$view) {
    globalThis?.view?.();
  }

  if (!started && mod?.value?.$start && !stillMore($)) {
    started = true;
    setState(parensType([mod?.value?.$start, $]));
  }
};

const stillMore = (input) => {
  if (input?.type === 'list') {
    let n = 0;

    for (let i = 0; i < input?.value.length; i++) {
      n += stillMore(input?.value[i]);
    }

    return n;
  } else if (input?.type === 'map') {
    let n = 0;

    for (let key in input?.value) {
      if ('$' === key?.[0]) {
        n++;
      } else {
        n += stillMore(input?.value[key]);
      }
    }

    return n;
  } else {
    return 0;
  }
};

export let server = '';
const clients = [];
const servers = [];
const modules = {};

export const run = async (text) => {
  globalThis.mod = compute(parse(`(make_module ${text})`));

  const ex = compute(mod?.value?.ex);

  ex?.value.map((ex) => {
    if (!ex?.value?.passed?.value) {
      console.log(
        'ex',
        format(ex?.value?.actual),
        format(ex?.value?.expect)
      );
    }
  });

  {
    for (let k in mod?.value) {
      const v = mod?.value?.[k]?.value;
      const fn = v?.[0]?.value;

      // tap(v, fn);

      if (['local_user', 'client', 'server'].includes(fn)) {
        const args = v?.map((x) =>
          toJs(compute(x, mod?.value))
        );

        fetch('/add_user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            auth: 'meta:123421897361283946',
          },
          body: JSON.stringify(
            'server' !== args[0]
              ? {
                  type: args[0],
                  name: args[1],
                  events: args[2],
                }
              : {
                  type: args[0],
                  url: args[1],
                  name: args[2],
                  events: args[3],
                }
          ),
        });
      } else if ('module' === fn) {
        const a = await fetch('/module', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            auth: 'meta:123421897361283946',
          },
          body: JSON.stringify({ url: v?.[1]?.value }),
        });

        const b = await a?.json();

        const m = compute(
          parse(`(make_module ${b.module})`)
        );

        mod.value[k] = m;
      }
    }

    // socket.emit('clients_servers', { clients, servers });
  }

  const def = format(compute(mod?.value?.default));

  console.log(def);

  // socket.emit(
  //   'meta',
  //   {
  //     event: 'log',
  //     args: [textType('\n;;\n\n' + def)],
  //     auth: 'meta:123421897361283946',
  //   },
  //   metaAuth
  // );

  $ = mod?.value?.$ ?? $;

  runEvent({
    event: 'init',
    args: [],
    auth: 'what',
    type: 'local_user',
  }).then((x) => {
    runEvent({
      event: 'start',
      args: [],
      auth: 'what',
      type: 'local_user',
    });
  });

  $.value.system = mapType({});

  tap('START');
  let remoteId = 0;
  socket?.onAny?.((event, args, auth, cb) => {
    tap('INCOMING_EVENT:', event, args);
    remoteId++;
    $.value.system.value['remote' + remoteId] = mapType({});
    runEvent({
      event,
      args: args.map(toKiwi),
      auth: auth,
      type: 'local_user',
      path: ['system', 'remote' + remoteId],
    }).then((x) => {
      tap('RESPONSE', x);
      cb(toJs(x));
    });
  });

  // if (mod?.value?._server) {
  //   const app = express();

  //   app.get('/:input', async (req, res) => {
  //     const go = () => {
  //       $ = compute(
  //         parensType([
  //           mod?.value?._server,
  //           $,
  //           // textType(req?.params?.input),
  //           // textType(''),
  //         ]),
  //
  //       );

  //       runEvents2($, () => {
  //         if ($?.value?.out) {
  //           res.send(format($?.value?.out));
  //           delete $?.value?.out;
  //         } else {
  //           go();
  //         }
  //       });
  //     };
  //     go();
  //   });

  //   server = app.listen(3005, () => {
  //     // console.log(`Server started`);
  //   });
  // }
};
