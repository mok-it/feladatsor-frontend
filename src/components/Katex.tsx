import "katex/dist/katex.min.css";
import Latex from "react-latex";
import { useTheme } from "@mui/material";

type KaTexProps = {
  textExpression: string;
  fixNewLines?: boolean;
};

export const KaTeX = ({ textExpression, fixNewLines = true }: KaTexProps) => {
  const theme = useTheme();

  const text = fixNewLines
    ? textExpression.replace(/\n/g, "$\\\\$")
    : textExpression;
  return (
    <Latex
      throwOnError={false}
      errorColor={theme.palette.error.main}
      children={text}
    />
  );
};
