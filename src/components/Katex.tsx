import "katex/dist/katex.min.css";
import Latex from "react-latex";
import { useTheme } from "@mui/material";

type KaTexProps = {
  texExpression: string;
  fixNewLines?: boolean;
};

export const KaTeX = ({ texExpression, fixNewLines = true }: KaTexProps) => {
  const theme = useTheme();

  const text = fixNewLines
    ? texExpression.replace(/\n/g, "$\\\\$")
    : texExpression;
  return (
    <Latex
      throwOnError={false}
      errorColor={theme.palette.error.main}
      children={text}
    />
  );
};
