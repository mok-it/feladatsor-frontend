type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, ...number[]];

export type Leaves<T, D extends number = 3> = [D] extends [never]
  ? never
  : T extends object
    ? {
        [K in keyof Required<T> & string]: K extends string
          ? Required<T>[K] extends object
            ? Required<T>[K] extends Array<unknown>
              ? `${K}`
              : `${K}.${Leaves<T[K], Prev[D]>}`
            : `${K}`
          : never;
      }[keyof T & string]
    : never;
