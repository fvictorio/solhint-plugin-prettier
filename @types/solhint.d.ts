declare class BaseChecker {
  constructor(reporter: any, ruleId: string, meta: any);
  error(ctx: any, message: string, fix?: any): void;
  errorAt(line: number, column: number, message: string, fix?: any): void;
  warn(ctx: any, message: string, fix?: any): void;
  addReport(type: string, ctx: any, message: string, fix?: any): void;
}

declare module 'solhint/lib/rules/base-checker' {
  export = BaseChecker;
}

declare namespace identifierNaming {
  function isMixedCase(text: string): boolean;
  function isNotMixedCase(text: string): boolean;
  function isCamelCase(text: string): boolean;
  function isNotCamelCase(text: string): boolean;
  function isUpperSnakeCase(text: string): boolean;
  function isNotUpperSnakeCase(text: string): boolean;
  function hasLeadingUnderscore(text: string): boolean;
}

declare module 'solhint/lib/common/identifier-naming' {
  export = identifierNaming;
}

declare module 'solhint/test/common/contract-builder' {
  const contractWith: (code: string) => string;
  const libraryWith: (code: string) => string;
  const funcWith: (statements: string) => string;
  const modifierWith: (statements: string) => string;
  const multiLine: (...args: string[]) => string;
  const contractWithPrettier: (code: string) => string;
  const stateDef: (count: number) => string;
  const constantDef: (count: number) => string;
  const repeatLines: (line: string, count: number) => string;
  export { contractWith, libraryWith, funcWith, modifierWith, multiLine, contractWithPrettier, stateDef, constantDef, repeatLines };
}
