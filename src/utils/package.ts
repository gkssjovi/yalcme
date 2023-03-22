import { PackageDetail } from '../types/package';
import { Package, SourceType } from '../types';
import path from 'path';
import { readFileSync, writeFileSync } from 'fs';

export const parsePackage = (dir: string): Package => {
  return JSON.parse(readFileSync(dir, 'utf-8')) as Package;
};

export const resolvePackage = (pathName: string): string => {
  return path.resolve(pathName, 'package.json');
};

export function getPackageDetails(dest: Array<string>): Array<PackageDetail>;
export function getPackageDetails(dest: string): PackageDetail;
export function getPackageDetails(dest: string | Array<string>): PackageDetail | Array<PackageDetail> {
  const isDestArray = Array.isArray(dest);

  if (!Array.isArray(dest)) {
    dest = [dest];
  }

  const result = dest.map((pathName) => {
    const { name } = parsePackage(resolvePackage(pathName));
    return {
      name,
      path: pathName,
    };
  });

  if (!isDestArray) {
    return result[0];
  }

  return result;
}

export const updatePackage = (dir: string, pgk: Package): void => {
  return writeFileSync(resolvePackage(dir), JSON.stringify(pgk, null, 2));
};

export function getSourcePath(source: SourceType): string;
export function getSourcePath(source: Array<SourceType>): Array<string>;
export function getSourcePath(source: SourceType | Array<SourceType>): string | Array<string> {
  const single = (s: SourceType): string => {
    if (typeof s === 'string') {
      return s;
    }
    return s.path;
  };

  if (typeof source === 'object' && Array.isArray(source)) {
    return source.map((item) => single(item));
  }

  return single(source);
}
