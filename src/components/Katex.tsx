import "katex/dist/katex.min.css";
import Latex from "react-latex-next";
import React from "react";

type KaTexProps = {
  texExpression: string;
};

export const KaTeX = ({ texExpression }: KaTexProps) => {
  return <Latex children={texExpression} />;
};
