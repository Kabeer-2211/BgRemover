import { useContext } from "react";
import { UserContext } from "../contexts/UserProvider";
import { useSelector } from "react-redux";

const useSession = () => ({
  ...useContext(UserContext),
  ...useSelector((state) => state.auth),
});

export default useSession;
