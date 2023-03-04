/// <reference types="node" />

declare class ValidationError extends Error {
  constructor(message: string, path: string);
  path: Object;
}

declare class Messages {
  type(prop: any, ctx: any, type: any): any;
  required(prop: any): any;
  match(prop: any, ctx: any, regexp: any): any;
  length(prop: any, ctx: any, len: any): any;
  size(prop: any, ctx: any, size: any): any;
  enum(prop: any, ctx: any, enums: any): any;
  default(prop: any): any;
}

declare class Property {
  constructor(name: string, schema: Schema);
  message(messages: Object | string): Property;
  schema(schema: Schema): Property;
  use(fns: Object): Property;
  required(bool?: boolean): Property;
  type(type: string | Function): Property;
  length(rules: Object | number): Property;
  size(rules: Object | number): Property;
  enum(enums: string[]): Property;
  match(regexp: RegExp): Property;
  each(rules: any[] | Object | Schema | Property): Property;
  elements(arr: any[]): Property;
  path(...args: any[]): any;
  typecast(value: any): any;
  validate(value: any, ctx: Object, path?: string): ValidationError;
}

declare class Schema {
  constructor(obj?: Object, opts?: Object);
  path(path: string, rules?: Object | any[] | string | Schema | Property): Property;
  typecast(obj: Object): Schema;
  strip(obj: Object, prefix?: string): Schema;
  validate(obj: Object, opts?: Object): ValidationError[];
  assert(obj: Object, opts?: Object): void;
  message(name: string | Object, message?: string | Function): Schema;
  validator(name: string | Object, fn?: Function): Schema;
  typecaster(name: string | Object, fn?: Function): Schema;
  hook(fn: Function): Schema;
  propagate(path: string, prop: Property): Schema;
}

declare const schemaClass: typeof Schema;

declare module 'validate' {
  export = schemaClass;
}
