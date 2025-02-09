import { useContext } from "react";

import { useSelector } from "react-redux";

import { BgRemoverContext } from "@contexts/BgRemoverProvider";

const useBgRemover = () => {
  const context = useContext(BgRemoverContext);
  const bgRemoverState = useSelector((state) => state.bgRemover);
  return { ...context, ...bgRemoverState };
};
export default useBgRemover;
