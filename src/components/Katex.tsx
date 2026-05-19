import { useTheme } from "@mui/material";
import "katex/dist/katex.min.css";
import { Fragment, ReactNode } from "react";
import Latex from "react-latex";

type KaTexProps = {
  value: string;
  fixNewLines?: boolean;
};

type Segment =
  | { kind: "text"; value: string }
  | { kind: "list"; ordered: boolean; items: string[] };

const LIST_ENV = /\\(begin|end)\{(itemize|enumerate)\}/g;

const splitItems = (body: string): { head: string; items: string[] } => {
  const items: string[] = [];
  let head = "";
  let current: string | null = null;
  let depth = 0;
  let i = 0;
  while (i < body.length) {
    const env = body.slice(i).match(/^\\(begin|end)\{(itemize|enumerate)\}/);
    if (env) {
      if (env[1] === "begin") depth++;
      else if (depth > 0) depth--;
      if (current === null) head += env[0];
      else current += env[0];
      i += env[0].length;
      continue;
    }
    if (
      depth === 0 &&
      body.startsWith("\\item", i) &&
      !/[A-Za-z]/.test(body[i + 5] ?? "")
    ) {
      if (current !== null) items.push(current.replace(/\s+$/g, ""));
      current = "";
      i += 5;
      while (i < body.length && /\s/.test(body[i])) i++;
      continue;
    }
    if (current === null) head += body[i];
    else current += body[i];
    i++;
  }
  if (current !== null) items.push(current.replace(/\s+$/g, ""));
  return { head, items };
};

const parseLatexSegments = (input: string): Segment[] => {
  const segments: Segment[] = [];
  let cursor = 0;

  while (cursor < input.length) {
    LIST_ENV.lastIndex = cursor;
    const match = LIST_ENV.exec(input);
    if (!match || match[1] !== "begin") {
      // No more list opens — rest is text. (Stray \end{...} stays in text too.)
      if (match && match[1] === "end") {
        // Treat orphan \end as literal text up to and including it.
        const end = match.index + match[0].length;
        segments.push({ kind: "text", value: input.slice(cursor, end) });
        cursor = end;
        continue;
      }
      if (cursor < input.length) {
        segments.push({ kind: "text", value: input.slice(cursor) });
      }
      break;
    }

    const openStart = match.index;
    const env = match[2] as "itemize" | "enumerate";
    if (openStart > cursor) {
      segments.push({ kind: "text", value: input.slice(cursor, openStart) });
    }

    // Find matching \end{env} with depth tracking.
    let depth = 1;
    const scan = openStart + match[0].length;
    let bodyEnd = -1;
    let endAfter = -1;
    const scanner = new RegExp(LIST_ENV.source, "g");
    scanner.lastIndex = scan;
    let inner: RegExpExecArray | null;
    while ((inner = scanner.exec(input))) {
      if (inner[1] === "begin" && inner[2] === env) {
        depth++;
      } else if (inner[1] === "end" && inner[2] === env) {
        depth--;
        if (depth === 0) {
          bodyEnd = inner.index;
          endAfter = inner.index + inner[0].length;
          break;
        }
      }
    }

    if (bodyEnd === -1) {
      // Unmatched \begin — treat the rest as text.
      segments.push({ kind: "text", value: input.slice(openStart) });
      break;
    }

    const body = input.slice(scan, bodyEnd);
    const { head, items } = splitItems(body);
    if (head.trim().length > 0) {
      segments.push({ kind: "text", value: head });
    }
    segments.push({ kind: "list", ordered: env === "enumerate", items });
    cursor = endAfter;
  }

  return segments;
};

const renderSegments = (
  segments: Segment[],
  fixNewLines: boolean,
  errorColor: string,
  keyPrefix = "s",
): ReactNode[] => {
  return segments.map((seg, i) => {
    const key = `${keyPrefix}-${i}`;
    if (seg.kind === "text") {
      const text = fixNewLines ? seg.value.replace(/\n/g, "$\\\\$") : seg.value;
      return (
        <Latex
          key={key}
          throwOnError={false}
          errorColor={errorColor}
          children={text}
        />
      );
    }
    const ListTag = seg.ordered ? "ol" : "ul";
    return (
      <ListTag key={key} style={{ margin: "0.25em 0", paddingLeft: "1.5em" }}>
        {seg.items.map((item, j) => (
          <li key={`${key}-${j}`}>
            {renderSegments(
              parseLatexSegments(item),
              fixNewLines,
              errorColor,
              `${key}-${j}`,
            )}
          </li>
        ))}
      </ListTag>
    );
  });
};

export const KaTeX = ({ fixNewLines = true, value }: KaTexProps) => {
  const theme = useTheme();
  const normalized = value.replace(/~/g, " ");
  const segments = parseLatexSegments(normalized);
  return (
    <Fragment>
      {renderSegments(segments, fixNewLines, theme.palette.error.main)}
    </Fragment>
  );
};
