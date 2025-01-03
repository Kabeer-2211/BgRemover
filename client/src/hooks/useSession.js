import { useContext } from "react";
import { UserContext } from "../contexts/UserProvider";
const useSession = () => {
    return useContext(UserContext);
};

export default useSession