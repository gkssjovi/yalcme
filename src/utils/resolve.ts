import os from 'os';

export const resolveTilde = (filePath: string): string => {
  if (!filePath || typeof filePath !== 'string') {
    return '';
  }

  if (filePath.startsWith('~/') || filePath === '~') {
    return filePath.replace('~', os.homedir());
  }

  return filePath;
};
