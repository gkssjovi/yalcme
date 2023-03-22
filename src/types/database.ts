export type SourceObject = {
  path: string;
  beforePublish?: string;
};

export type SourceType = string | SourceObject;

export type DatabaseData = {
  source: Array<SourceType>;
  target: Array<string>;
};
