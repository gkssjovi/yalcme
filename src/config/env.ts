import { resolveTilde } from '../utils/resolve';

type Env = {
  DB_SOURCE: string;
  READY_TYPE: 'small' | 'big';
};

export const env: Env = {
  DB_SOURCE: resolveTilde(process.env.DB_SOURCE || ''),
  READY_TYPE: (process.env.READY_TYPE || 'small') as 'small',
};
