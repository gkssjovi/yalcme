#!/usr/bin/env node

import path from 'path';
// eslint-disable-next-line import/order
import * as dotenv from 'dotenv';
dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});
import { getArguments } from './utils/arguments';
import node from './menu';

const main = async () => {
  const _args = await getArguments();

  for (;;) {
    const { answers, name } = await node.current.render();
    await node.current.answer(answers[name], answers);
  }
};

main().catch((err: Error) => {
  // eslint-disable-next-line no-console
  console.log(err);
});
