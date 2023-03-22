export type Package = {
  name: string;
  version: string;
  dependencies: Record<string, string>;
};

export type ErrorType = {
  message: string;
  code?: number;
};
