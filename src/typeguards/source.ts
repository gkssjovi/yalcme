import { SourceType, SourceObject } from '../types';

export const isSourceString = (source: SourceType): source is string => typeof source === 'string';
export const isSourceObject = (source: SourceType): source is SourceObject => typeof source !== 'string';
