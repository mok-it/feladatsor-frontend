import { useTheme } from "@mui/material";
import "katex/dist/katex.min.css";
import Latex from "react-latex";

type KaTexProps = {
  value: string;
  fixNewLines?: boolean;
};

export const KaTeX = ({ fixNewLines = true, value }: KaTexProps) => {
  const theme = useTheme();
  const text = fixNewLines ? value.replace(/\n/g, "$\\\\$") : value;

  return (
    <Latex
      throwOnError={false}
      errorColor={theme.palette.error.main}
      children={text}
    />
  );
};
