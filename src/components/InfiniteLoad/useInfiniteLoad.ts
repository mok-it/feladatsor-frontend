import { uniqBy } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useEffectOnce, useToggle } from "react-use";
import { useImmer } from "use-immer";

export const useInfiniteLoad = <T>({
  fetch,
  orderBy,
  order,
  limit,
}: {
  fetch: (skip: number) => Promise<T[]>;
  orderBy: keyof T | null;
  order: "asc" | "desc";
  limit: number;
}) => {
  const [hasMore, setHasMore] = useToggle(true);
  const [loadingSkip, setLoadingSkip] = useState(-1);
  const [data, setData] = useImmer<T[]>([]);

  const fetchMore = useCallback(async () => {
    const skip = data.length || 0;
    if (loadingSkip >= skip) return;
    setLoadingSkip(skip);
    const newData = (await fetch(skip)) || [];
    setData((prev) => uniqBy([...prev, ...newData], "id"));
    if (newData.length < limit) {
      setHasMore(false);
    }
  }, [data.length, loadingSkip, fetch, setData, limit, setHasMore]);

  const [resetSignal, reset] = useToggle(false);
  useEffectOnce(() => {
    fetchMore();
  });
  useEffect(() => {
    fetchMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetSignal]);

  useEffect(() => {
    setData([]);
    setLoadingSkip(-1);
    setHasMore(true);
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderBy, order]);

  return {
    data,
    fetchMore,
    hasMore,
    reset,
  };
};
