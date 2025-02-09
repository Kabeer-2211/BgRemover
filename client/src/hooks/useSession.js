import { useContext } from "react";

import { useSelector } from "react-redux";

import { UserContext } from "@contexts/UserProvider";

const useSession = () => {
  const context = useContext(UserContext);
  const authState = useSelector((state) => state.auth);
  return { ...context, ...authState };
};

export default useSession;
