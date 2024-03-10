import { getKeys } from "./getKeys";
/* eslint-disable  @typescript-eslint/no-explicit-any */

const groupBy = <
  T extends Record<PropertyKey, any>, //Object to groupby
  FuncReturn extends PropertyKey, //Function return type
  K extends GroupingStrategy<T, FuncReturn>, //key or a function that returns a key
>(
  arr: T[],
  key: K,
): Record<keyof T | FuncReturn, T[]> =>
  arr.reduce(
    (accumulator, val, currentIndex) => {
      const groupedKey =
        typeof key === "function"
          ? key(val, currentIndex)
          : val[key as keyof T];

      if (!accumulator[groupedKey]) accumulator[groupedKey] = [];
      accumulator[groupedKey].push(val);
      return accumulator;
    },
    {} as Record<keyof T | FuncReturn, T[]>,
  );

export type GroupByMultipleReturn<T, K extends any[]> = K extends [
  any,
  ...infer KR,
]
  ? Record<string, GroupByMultipleReturn<T, KR>>
  : T[];

export type GroupingStrategy<
  T extends Record<PropertyKey, unknown>,
  FuncReturn extends PropertyKey,
> = keyof T | ((arg: T, index: number) => FuncReturn);

export const groupByMultiple = <
  T extends Record<keyof T | FuncReturn, unknown>,
  FuncReturn extends PropertyKey,
  K extends GroupingStrategy<T, FuncReturn>[],
>(
  arr: T[],
  keys: [...K],
  propIndex = 0,
) => {
  const grouppedObj = groupBy(arr, keys[propIndex]);

  for (const key of getKeys(grouppedObj))
    grouppedObj[key] =
      propIndex < keys.length - 1
        ? groupByMultiple<any, string, any[]>(
            grouppedObj[key],
            keys,
            propIndex + 1,
          )
        : grouppedObj[key];

  return grouppedObj as GroupByMultipleReturn<T, K>;
};
