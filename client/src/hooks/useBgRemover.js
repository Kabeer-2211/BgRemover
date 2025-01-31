import { useContext } from "react";
import { BgRemoverContext } from "../contexts/BgRemoverProvider";

function bgRemover() {
  return useContext(BgRemoverContext);
}

export default bgRemover;
