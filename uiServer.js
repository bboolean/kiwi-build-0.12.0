import express from 'express';
import fs from 'node:fs/promises';
import { Server } from 'socket.io';
import { io } from 'socket.io-client';
import { resolve, dirname } from 'node:path';
import { tap } from './core.js';

const app = express();
app.use(express.json());

const file = process.argv[3];

tap('INIT_CWD', process.env.INIT_CWD);
tap('cwd()', process.cwd());

const folder = process.cwd();
// file
//   ? dirname(resolve(file))
//   : process.cwd();

const port = process.argv[2] ? +process.argv[2] : 3004;

const metaAuth = 'meta:123421897361283946';

// const users = {
//   [metaAuth]: mapType({
//     log: boolType(true),
//     add_user: boolType(true),
//     send_event: boolType(true),
//   }),
// };

const localUserEvents = {};
const clientEvents = {};
const serverEvents = {};
const serverSockets = {};
const clientSockets = {};

app.get('/', async (req, res) => {
  Object.entries(serverSockets).map(([name, socket]) => {
    tap('CLO');
    socket.close();
  });

  const ui = await fs.readFile(
    dirname(process.argv[1]) + `/dist/ui.js`,
    {
      encoding: 'utf8',
    }
  );

  const code = await fs.readFile(
    resolve(process.cwd() + '/' + file),
    {
      encoding: 'utf8',
    }
  );

  const toNumbers = (a) =>
    a.split('').map((x) => x.charCodeAt(0));

  res.send(
    `
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0px;">
      <canvas
        id='canvas'
        style="margin: 0 auto; background: white"
        height="1"
        width="1"
      >
      </canvas>
      <script src="/socket.io/socket.io.js"></script>
      <script type="module">
        const toText = (a) => a.map((x) => String.fromCharCode(x)).join('');

        globalThis.metaAuth = toText([${toNumbers(
          metaAuth
        )}]);

        ${ui}

        const code = toText([${toNumbers(code)}]);
        
        globalThis.run(code)
      </script>
    </body>`
  );
});

app.post('/add_user', async (req, res) => {
  tap('add_user', req.body);
  if (metaAuth === req.headers.auth && metaAuth) {
    const { name, type, events, url, auth } = req.body;
    tap(req.body, req.headers.auth);
    res.send({ a: true });
    if ('local_user' === type) {
      localUserEvents[name] = events;
    } else if ('client' === type) {
      clientEvents[name] = events;

      tap('CKLIENT', clientEvents);
    } else if ('server' === type) {
      serverEvents[name] = events;

      const serverSocket = io('' + url, {
        auth: {
          user: name,
        },
      });

      serverSockets[name] = serverSocket;

      tap('server', url, name);

      serverSocket.onAny((event, ...args) => {
        tap('ev', event, ...args);

        localUserSocket.emit(
          event,
          args.slice(0, -1),
          name,
          args.slice(-1)?.[0]
        );
      });

      serverSocket.on('disconnect', (a) => {
        tap('disconnect');
      });
    }
  }
});

app.post('/module', async (req, res) => {
  if (metaAuth === req.headers.auth && metaAuth) {
    tap(req.body);

    const g = await events.get([req?.body?.url]);

    tap(g);

    res.send({ module: g });
  }
});

const localUserServer = app.listen(port, () => {
  console.log(`Server started on ${port}`);
});

const localUserIO = new Server(localUserServer);

const isHttp = (a) =>
  'https://' === a?.slice(0, 8) ||
  'http://' === a?.slice(0, 7);

const events = {
  log: async ([out]) => {
    console.log(out?.value);

    return 'log';
  },
  get: async ([a, options]) => {
    const { encoding } = options ?? {};
    try {
      if (isHttp(a)) {
        const f = await fetch(a);
        const t = await f.text();

        return t;
      } else {
        tap('TTT', encoding, options);
        const contents = await fs.readFile(
          '/' === a?.[0]
            ? a
            : resolve(process.cwd() + '/' + a),
          {
            encoding: encoding ?? 'utf8',
          }
        );

        tap(contents);

        return contents;
      }
    } catch (e) {
      return {
        error: 'Not found',
      };
    }
  },
  set: async ([file, contents, options]) => {
    const { encoding } = options ?? {};
    try {
      if (isHttp(file)) {
        return 'set';
      } else {
        const f =
          '/' === file?.[0]
            ? file
            : resolve(process.cwd() + '/' + file);

        await fs.mkdir(dirname(f), { recursive: true });

        const write = await fs.writeFile(f, contents, {
          encoding: encoding ?? 'utf8',
        });

        return 'set';
      }
    } catch (e) {
      return {
        error: 'Not found',
      };
    }
  },
  delete: async ([file]) => {
    try {
      if (isHttp(file)) {
        return 'delete';
      } else {
        tap(resolve(process.cwd() + '/' + file));

        const f =
          '/' === file?.[0]
            ? file
            : resolve(process.cwd() + '/' + file);

        const write = await fs.writeFile(f, 'deleted');

        return 'set';
      }
    } catch (e) {
      return {
        error: 'Not found',
      };
    }
  },
};

const event = (a, cb) => {
  const { event, args, auth, type } = a;

  const user = users[auth];

  // && 'local_user' === type

  if (user && user?.value[event]) {
    tap('in', event);

    events?.[event]?.(args, cb);
  } else if ('server' === type) {
    tap('server', event, args, auth, type);
    tap('js', args.map(toJs));
    serverEvents[auth].emit(
      event,
      ...args.map(toJs),
      () => {}
    );
  }
};

let localUserSocket = null;

localUserIO.use((socket, next) => {
  if (
    metaAuth &&
    metaAuth === socket.handshake.auth.metaAuth
  ) {
    tap('connected');
    next();
  } else {
    tap('rejected', socket.handshake.auth);
    next(new Error('auth'));
  }
});

localUserIO.on('connection', (ioSocket) => {
  localUserSocket = ioSocket;

  localUserSocket.onAny(
    (event, { type, args, auth }, cb) => {
      tap('270', event, args, auth, type);
      if (
        'local_user' === type &&
        localUserEvents[auth]?.[event]
      ) {
        events[event]?.(args)?.then((result) => {
          cb(result);
        });
      } else if ('client' === type) {
        tap('10', clientSockets?.[auth]);
        clientSockets?.[auth]?.emit?.(event, ...args, cb);
      } else if ('server' === type) {
        tap('2');
        serverSockets?.[auth]?.emit?.(event, ...args, cb);
      } else {
        cb({ error: true, message: 'Event not found' });
      }
    }
  );
});

const clientApp = express();

const clientServer = clientApp.listen(port + 1000, () => {
  console.log(`Server started on ${port + 1000}`);
});

const clientIO = new Server(clientServer);

clientIO.use((socket, next) => {
  if (clientEvents[socket.handshake.auth.user]) {
    next();
    tap('connect to client');
  } else {
    tap('rejected', socket.handshake.auth);
    next(new Error('auth'));
  }
});

clientIO.on('connection', (socket) => {
  clientSockets[socket.handshake.auth.user] = socket;

  socket.onAny((event, ...argscb) => {
    const [cb, ...a] = argscb?.slice()?.reverse();
    const args = a?.slice()?.reverse();

    tap('co', clientEvents);

    if (clientEvents[socket.handshake.auth.user]?.[event]) {
      if (events[event]) {
        events[event]?.(args)?.then((result) => {
          cb(result);
        });
      } else {
        tap('lko');
        localUserSocket.emit(
          event,
          args,
          socket.handshake.auth.user,
          (result) => {
            tap('cb', result);
            cb(result);
          }
        );
      }
    } else {
      cb({
        error: true,
        message: 'Not authorized',
        clientEvents,
      });
    }
  });
});
