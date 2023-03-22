import semver from 'semver';
import { Package } from '../types';
import path from 'path';
import { existsSync, readdirSync } from 'fs';
import { execSync } from 'child_process';

export const getNextPublishVersion = (pgk: Package): string => {
  const dir = execSync('yalc dir', { encoding: 'utf-8' }).trim();
  const yalcPackageDir = path.join(dir, 'packages', pgk.name);
  let version = pgk.version;

  if (existsSync(yalcPackageDir)) {
    const versions = readdirSync(yalcPackageDir);
    if (versions.length) {
      const yalcMaxVersion = semver.maxSatisfying(versions, '*') as string;
      version = semver.maxSatisfying([version, yalcMaxVersion], '*') as string;
    }
  }

  return semver.inc(version, 'patch') as string;
};
