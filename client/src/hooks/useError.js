import { useContext } from "react";

import { ErrorContext } from "@contexts/ErrorProvider";

function useError() {
    return useContext(ErrorContext);
}

export default useError