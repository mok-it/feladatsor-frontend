import { Box, TableCell, TableRow } from "@mui/material";
import { ReactNode, useCallback, useEffect, useRef } from "react";
import { useEffectOnce, useIntersection } from "react-use";

type Props<T> = {
  data: T[];
  isInitialLoading: boolean;
  isFetchingNextPage: boolean;
  hasMore: boolean;
  fetchNextPage: () => void;
  children: (item: T) => ReactNode;
  loadingElement?: ReactNode;
  asTableRows?: boolean;
  colSpan?: number;
};

export function InfiniteLoad<T>({
  children,
  data,
  isFetchingNextPage,
  hasMore,
  isInitialLoading,
  fetchNextPage,
  loadingElement,
  asTableRows,
  colSpan,
}: Props<T>) {
  const intersectionRef = useRef(null);
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  });

  const checkIntersection = useCallback(() => {
    if (intersection?.isIntersecting && !isFetchingNextPage && hasMore) {
      fetchNextPage();
    }
  }, [
    intersection?.isIntersecting,
    isFetchingNextPage,
    hasMore,
    fetchNextPage,
  ]);

  useEffectOnce(() => {
    fetchNextPage();
  });

  useEffect(() => {
    checkIntersection();
  }, [data.length, checkIntersection, intersection?.isIntersecting]);

  const wrapContent = (content: ReactNode) => {
    if (asTableRows) {
      return (
        <TableRow>
          <TableCell colSpan={colSpan} sx={{ border: 0 }}>
            {content}
          </TableCell>
        </TableRow>
      );
    }
    return <Box p={2}>{content}</Box>;
  };

  const sentinel = asTableRows ? (
    <tr ref={intersectionRef} style={{ height: 0, border: 0, padding: 0 }}>
      <td
        colSpan={colSpan}
        style={{
          height: 0,
          border: 0,
          padding: 0,
          position: "relative",
          bottom: 400,
        }}
      />
    </tr>
  ) : (
    <Box
      ref={intersectionRef}
      style={{
        position: "relative",
        bottom: 400,
        left: 0,
        height: 10,
        width: 10,
        pointerEvents: "none",
      }}
    />
  );

  return (
    <>
      {isInitialLoading ? (
        wrapContent("Loading...")
      ) : (
        <>
          {data.map((row, index) => {
            const isLoaderRow = index > data.length - 1;
            return !isLoaderRow && children(row as T);
          })}
          {hasMore && (loadingElement || wrapContent("Loading..."))}
        </>
      )}
      {!hasMore &&
        !isFetchingNextPage &&
        wrapContent(data.length > 0 ? "A végére értél" : "Nincs találat")}
      {sentinel}
    </>
  );
}
