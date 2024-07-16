import express from 'express';
import fs from 'node:fs/promises';
import { Server } from 'socket.io';
import { io } from 'socket.io-client';
import { resolve, dirname } from 'node:path';
import chokidar from 'chokidar';
import {
  run,
  tap,
  setState,
  mapType,
  compute,
  parensType,
  format,
  parse,
  splitEveryTwo,
} from './core.js';

let formated = '';

const path = resolve(
  process.env.INIT_CWD + '/' + process.argv[2]
);

const go = async () => {
  const code = await fs.readFile(path, {
    encoding: 'utf8',
  });

  const formatted = format(parse(`(make_module ${code})`));

  // if (code !== formatted) {
  //   setTimeout(() => {
  //     fs.writeFile(path, formatted);
  //   }, 100);
  // } else {
  console.log('');
  console.log(';;');
  console.log('');
  run(code);
  // }
};

if (process.argv[2]) {
  chokidar.watch(path).on('change', () => {
    setTimeout(() => {
      go();
    }, 100);
  });

  go();
}
