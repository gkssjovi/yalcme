import { colorize, Colors } from '../utils';
import { env } from '../config';
import { readySmall, readyBig, errorSmall } from './library';

const printReadySmall = () => {
  process.stdout.write(colorize(readySmall, Colors.FgGreen));
};

const printReadyBig = () => {
  for (let i = 0; i < readyBig.length; i++) {
    let char = readyBig[i];
    if (char === ':') {
      char = colorize(char, Colors.Dim);
    } else {
      char = colorize(char, Colors.FgGreen);
    }
    process.stdout.write(char);
  }
};

export const printReady = () => {
  if (env.READY_TYPE === 'small') {
    printReadySmall();
    return;
  }
  printReadyBig();
};

export function printError(print: true): void;
export function printError(print: false): string;
export function printError(print: true | false): string | void {
  if (print) {
    process.stdout.write(colorize(errorSmall, Colors.FgRed));
    return;
  }
  return colorize(errorSmall, Colors.FgRed);
}
