import { useContext } from "react";

import { ModeContext } from "@contexts/ModeProvider";

function useMode() {
    return useContext(ModeContext);
}

export default useMode