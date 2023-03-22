import { getNextPublishVersion, waitFor } from '.';
import { printError, printReady } from '../typography';
import { ErrorType } from '../types';
import { isSourceObject } from '../typeguards';
import { Database } from '../services';
import { spawn } from 'child_process';
import { parsePackage, resolvePackage, updatePackage } from './package';
import { colorize, Colors } from './colors';

export const publish = async (sourcePath: string, targets: Array<string>) => {
  try {
    const source = Database.findSource(sourcePath);
    const sourcePackage = parsePackage(resolvePackage(sourcePath));
    const version = getNextPublishVersion(sourcePackage);

    updatePackage(sourcePath, { ...sourcePackage, version });

    if (isSourceObject(source)) {
      const { beforePublish } = source;
      if (beforePublish) {
        const commands = beforePublish
          .split('&&')
          .map((item) => item.split(/\s+/).filter(Boolean))
          .filter((item) => item.length);

        for (const command of commands) {
          const [cmd, ...args] = command;
          await waitFor(spawn(cmd, args, { cwd: sourcePath }));
        }
      }
    }

    await waitFor(spawn('yalc', ['publish'], { cwd: sourcePath }));

    for (const target of targets) {
      const targetPackage = parsePackage(resolvePackage(target));

      if (!Object.prototype.hasOwnProperty.call(targetPackage.dependencies, sourcePackage.name)) {
        const error = new Error(
          `Package "${sourcePackage.name}" is not a dependency of "${targetPackage.name}".`
        ) as ErrorType;
        error.code = 501;
        throw error;
      }

      const packageVersion = targetPackage.dependencies[sourcePackage.name];

      if (!/\.yalc\//.test(packageVersion)) {
        await waitFor(spawn('yalc', ['add', `${sourcePackage.name}@${version}`], { cwd: target }));
      } else {
        await waitFor(spawn('yalc', ['update', `${sourcePackage.name}@${version}`], { cwd: target }));
      }
    }

    printReady();
  } catch (e) {
    const error = e as ErrorType;

    if (error?.code === 500) {
      process.stdout.write('\n');
      printError(true);
    } else if (error?.code === 501) {
      console.error(colorize(error.message, Colors.FgRed));
      printError(true);
    } else {
      console.error(e);
    }
  }
};
