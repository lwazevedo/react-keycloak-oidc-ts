import { useContext } from "react";
import KeycloakContext from "../contexts/KeycloakContext";

export const useKeycloak = () => {
  const { state } = useContext(KeycloakContext);
  return { ...state };
};
