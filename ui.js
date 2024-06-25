globalThis.socket = globalThis?.io?.({
  auth: { metaAuth: globalThis.metaAuth },
});
import {
  run,
  tap,
  setState,
  mapType,
  compute,
  parensType,
  last,
} from './core.js';

const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');

const rootFontSize = 20;

globalThis.run = run;

const resize = () => {
  canvas.width = Math.round(document.body.clientWidth - 1);
  canvas.height = Math.round(
    document.body.clientHeight - 1
  );
};
resize();

window.onresize = function () {
  resize();

  view();
};

window.addEventListener('click', ({ clientX, clientY }) => {
  for (let block of globalThis.blocks) {
    // tap(block);
    if (
      clientX >= block.x &&
      clientX <= block.x + block.w &&
      clientY >= block.y &&
      clientY <= block.y + block.h
    ) {
      $.value.$$$click = mapType(
        compute(block?.options?.click)
      );

      // tap($);

      setState($);
      break;
    }
  }
});

globalThis.blocks = [];

const drawBlock = ({
  type,
  x,
  y,
  w,
  h,
  value,
  options,
  adjust,
}) => {
  if ('group' === type) {
    blocks.push({
      type,
      x,
      y,
      w,
      h,
      value,
      options,
      adjust,
    });

    if (options?.border) {
      c.strokeStyle = 'black';
      c.lineWidth = options?.border;
      if (options?.corners) {
        c.beginPath();
        c.roundRect(x, y, w, h, options?.corners);
        c.stroke();
      } else {
        c.strokeRect(x, y, w, h);
      }
    }

    for (let block of value) {
      drawBlock(block);
    }
  } else {
    c.font = rootFontSize + 'px Arial';

    const s = options?.font_size
      ? options?.font_size
      : rootFontSize;

    // window
    //     .getComputedStyle(document.body)
    //     .fontSize?.slice(0, -2);

    c.font = s + 'px Arial';

    // const vs = value?.split('\n');
    // for (let i = 0; i < vs?.length; i++) {
    c.fillText(value, x, y + adjust /** i*/);
    // }
  }
};

const isObject = (x) =>
  typeof x === 'object' && !Array.isArray(x) && x !== null;

const computeBlock = (
  block,
  outsideX,
  outsideY,
  outsideW,
  outsideH,
  outsideOptions
) => {
  if ('group' === block?.type) {
    const options = block?.options;
    const x = options?.x ?? outsideX;
    const y = options?.y ?? outsideY;
    const w = options?.w ?? outsideW;
    const h = options?.h ?? outsideH;

    const value = block?.value;
    const padding = (options?.padding ?? 0) * rootFontSize;
    const vpadding = options?.vpadding
      ? options?.vpadding * rootFontSize
      : padding;
    const hpadding = options?.hpadding
      ? options?.hpadding * rootFontSize
      : padding;
    const gap = (options?.gap ?? 0) * rootFontSize;

    const px = x + hpadding;
    const py = y + vpadding;
    const pw = w - padding * 2;
    const ph = h - padding * 2;

    if (block?.options?.type?.includes('content')) {
      // debugger;
      return {
        type: 'group',
        x,
        y,
        w,
        h,
        options: {
          border: 1,
        },
        value: block?.value?.map((b) => {
          const v = computeBlock(
            b,
            b.x + px - block?.value?.[0]?.x,
            b.y + py - block?.value?.[0]?.y,
            pw,
            ph
          );
          return v;
        }),
      };
    } else {
      const rows = [[]];

      {
        let xEnd = 0;
        let flexCount = 0;

        // tap('pw', pw);

        for (let b of value) {
          xEnd += b.w + gap;
          flexCount += 1;

          if (
            xEnd > pw ||
            [b, ...last(rows)].some((bb) => {
              return (
                pw / flexCount <
                bb?.w +
                  gap +
                  (bb?.options?.padding *
                    2 *
                    rootFontSize || 0)
              );
            })
          ) {
            rows.push([]);

            last(rows).push(b);

            xEnd = b.w + gap;
            flexCount = 1;
          } else {
            last(rows).push(b);
          }
        }
      }

      // tap('rx', rows);

      const rowBlocks = [];
      let yOffset = 0;
      let largestW = 0;
      let largestH = 0;

      {
        let xOffset = 0;
        let yOffset = 0;

        const rowsCount = rows?.filter(
          (x) => x?.length
        )?.length;

        for (let row of rows?.filter((x) => x?.length)) {
          const flexCount = row?.reduce((a, v) => {
            const flex = v?.options?.flex ?? 1;

            return a + flex;
          }, 0);

          const unit =
            (pw - gap * (flexCount - 1)) / flexCount;

          for (let block of row) {
            const flex = block?.options?.flex ?? 1;

            const ww = unit * flex || block.w;

            const hh =
              (ph - gap * (rowsCount - 1)) / rowsCount;

            const b = computeBlock(
              block,
              px + xOffset,
              py + yOffset,
              ww,
              hh,
              options
            );

            largestH = Math.max(largestH, hh);

            rowBlocks.push(b);

            xOffset += ww + gap;
          }
          largestW = Math.max(largestW, xOffset);
          xOffset = 0;
          yOffset += (ph + gap) / rowsCount;
        }
      }

      // tap('r', rowBlocks);

      return {
        type: 'group',
        x: outsideX,
        y: outsideY,
        w: outsideW,
        h: outsideH,
        // h: largestH,
        value: rowBlocks,
        options,
      };
    }
  } else {
    return {
      ...block,
      x: outsideX,
      y: outsideY,
    };
  }
};

let lastView = mapType({});

const convert = (o, x, y) => {
  if ('list' === o?.type) {
    const hasOptions = 'map' === o?.value?.[0]?.type;
    const options = hasOptions
      ? Object.fromEntries(
          Object.entries(o?.value?.[0]?.value).map(
            ([a, b]) => {
              return [a, b?.value];
            }
          )
        )
      : {};

    const padding = (options?.padding ?? 0) * rootFontSize;
    const vpadding = options?.vpadding
      ? options?.vpadding * rootFontSize
      : padding;
    const hpadding = options?.hpadding
      ? options?.hpadding * rootFontSize
      : padding;
    const gap = (options?.gap ?? 0) * rootFontSize;

    const w = (options?.w ?? 0) * rootFontSize;
    const h = (options?.h ?? 0) * rootFontSize;
    const type = options?.type ?? 'vt_content';

    const px = x + hpadding;
    const py = y + vpadding;

    const value = hasOptions
      ? o?.value?.slice(1)
      : o?.value;

    const newValue = [];

    const is_hz = type.includes('hz');
    const is_vt = type.includes('vt');

    const dir = is_hz ? 'w' : 'h';
    const cdir = is_vt ? 'w' : 'h';

    let dirEnd = 0;
    let cLargest = 0;

    for (let i = 0; i < value?.length; i++) {
      const vv = value[i];

      const v = convert(
        vv,
        px + (is_hz ? dirEnd : 0),
        py + (is_vt ? dirEnd : 0)
      );

      dirEnd += v[dir] + gap;
      cLargest = Math.max(cLargest, v[cdir]);

      newValue.push(v);
    }

    return {
      type: 'group',
      options,
      x,
      y,
      w: (w || (is_hz ? dirEnd : cLargest)) + hpadding * 2,
      h: (h || (is_vt ? dirEnd : cLargest)) + vpadding * 2,
      value: newValue,
    };
  } else if ('text' === o?.type) {
    const size = rootFontSize;

    c.font = size + 'px Arial';

    return {
      type: 'text',
      x,
      y,
      w: c.measureText(o?.value)?.width,
      h: (size + 4) * o?.value?.split('\n')?.length,
      adjust: c.measureText('M')?.width,
      value: o?.value,
    };
  }
};

globalThis.view = () => {
  c.clearRect(0, 0, canvas.width, canvas.height);

  lastView = compute(parensType([mod?.value?.$view, $]));

  const rb = convert(lastView, 0, 0);

  // tap('rb', rb);

  blocks = [];

  const cb = computeBlock(
    rb,
    0,
    0,
    canvas.width,
    canvas.height,
    {}
  );

  // tap('cb', cb);

  drawBlock(cb);
};
