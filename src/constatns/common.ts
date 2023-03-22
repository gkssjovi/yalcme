import tty from 'tty';
import path from 'path';

export const REDIRECTED = !tty.isatty(process.stdout.fd);

export const ROOT_DIR = path.resolve(__dirname, '../../');
