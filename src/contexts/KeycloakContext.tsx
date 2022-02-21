import React, { createContext } from "react";
import { IKeycloakInstance } from "../interfaces";

// type propsContext = {
//   state: IKeycloakInstance;
// };

interface ContextProps {
  state: IKeycloakInstance;
}

const DEFAULT_VALUE = {
  state: {
    tokenParsed: {
      acr: "",
      auth_time: 0,
      azp: "",
      cd_user_system: "",
      distinguishedName: "",
      email_verified: false,
      exp: "",
      given_name: "",
      iat: "",
      iss: "",
      jti: "",
      locale: "",
      name: "",
      nbf: 0,
      preferred_username: "",
      roles: [""],
      scope: "",
      session_state: "",
      sub: "",
      typ: "",
    },
    refreshToken: "",
    hasRealmRole: (role: string) => false,
    hasResourceRole: (role: string, resource: string) => false,
    clearToken: () => "",
    logout: () => "",
    updateToken: () => "",
    isLoggedIn: false,
    cooperativa: 0,
    userName: "",
    name: "",
    token: "",
  },
};

const KeycloakContext = createContext<ContextProps>(DEFAULT_VALUE);

interface KeycloakProviderProps {
  children: React.ReactNode;
  state: any;
}
const KeycloakProvider: React.FunctionComponent<KeycloakProviderProps> = ({
  children,
  state,
}) => {
  return (
    <KeycloakContext.Provider value={{ state }}>
      {children}
    </KeycloakContext.Provider>
  );
};

export { KeycloakProvider };
export default KeycloakContext;
