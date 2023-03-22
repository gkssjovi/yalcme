import { getSourcePath } from '../utils';
import { DatabaseData, SourceType } from '../types';
import { env } from '../config';
import path from 'path';
import { readFileSync } from 'fs';

class DatabaseService {
  public constructor() {}

  public get data(): DatabaseData {
    return JSON.parse(readFileSync(path.resolve(env.DB_SOURCE), 'utf-8')) as DatabaseData;
  }

  public getSource(): Array<SourceType> {
    return this.data.source;
  }

  public getTargers(): Array<string> {
    return this.data.target;
  }

  public findSource(sourceObject: SourceType): SourceType {
    const sources = this.getSource();
    const source = sources.find((item) => getSourcePath(item) === getSourcePath(sourceObject));

    if (!source) {
      throw new Error('Unable to find the source.');
    }

    return source;
  }
}

export const Database = new DatabaseService();
