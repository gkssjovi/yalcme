import { ErrorType } from '../types';
import { promisify } from 'util';
import { exec, ChildProcessWithoutNullStreams } from 'child_process';
import { colorize, Colors } from './colors';

export const call = promisify(exec);

export const waitFor = async (result: ChildProcessWithoutNullStreams): Promise<string> => {
  return new Promise((resolve, reject) => {
    result.stdout.on('data', (data: string) => {
      process.stdout.write(data);
    });

    result.stderr.on('data', (data: string) => {
      process.stdout.write(data);
    });

    result.stderr.on('error', (data: string) => {
      process.stdout.write(data);
    });

    result.on('close', (code, signal) => {
      if (code || signal) {
        const error: ErrorType = { message: 'error', code: 500 };
        reject(error);
      } else {
        resolve('done');
      }

      if (code) {
        process.stdout.write(colorize(`Process exit with code: ${code}.`, Colors.FgRed));
      }
      if (signal) {
        process.stdout.write(colorize(`Process killed with signal: ${signal}.`, Colors.FgRed));
      }
    });
  });
};
