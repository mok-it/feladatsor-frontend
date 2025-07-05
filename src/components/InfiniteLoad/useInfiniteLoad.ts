import { uniqBy } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useEffectOnce, useToggle } from "react-use";
import { useImmer } from "use-immer";

export const useInfiniteLoad = <T>({
  fetch,
  limit,
}: {
  fetch: (skip: number) => Promise<{ data: T[]; totalCount?: number }>;
  limit: number;
}) => {
  const [hasMore, setHasMore] = useToggle(true);
  const [loadingSkip, setLoadingSkip] = useState(-1);
  const [data, setData] = useImmer<T[]>([]);
  const [totalCount, setTotalCount] = useState<number | undefined>(undefined);

  const fetchMore = useCallback(async () => {
    const skip = data.length || 0;
    if (loadingSkip >= skip) return;
    setLoadingSkip(skip);
    const result = await fetch(skip);
    const newData = result?.data || [];
    if (result?.totalCount !== undefined) {
      setTotalCount(result.totalCount);
    }
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

  const manualReset = useCallback(() => {
    setData([]);
    setLoadingSkip(-1);
    setHasMore(true);
    setTotalCount(undefined);
    reset();
  }, [setData, setHasMore, reset]);

  return {
    data,
    fetchMore,
    hasMore,
    reset: manualReset,
    totalCount,
  };
};
