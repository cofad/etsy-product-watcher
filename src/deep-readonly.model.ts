export type DeepReadonly<T> = T extends (infer R)[] ? DeepReadonlyArray<R>
  : // deno-lint-ignore ban-types
  T extends Function ? T
  : // deno-lint-ignore ban-types
  T extends object ? DeepReadonlyObject<T>
  : T;

type DeepReadonlyArray<T> = ReadonlyArray<DeepReadonly<T>>;

type DeepReadonlyObject<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
};
