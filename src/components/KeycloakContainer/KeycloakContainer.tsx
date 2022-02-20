import * as React from "react";
import KeycloakService from "../../services/KeycloakService";
import KeycloakError from "../KeycloakError";
import KeycloakLoading from "../KeycloakLoading";

import { KeycloakProvider } from "../../contexts/KeycloakContext";
import { IKeycloakContaierProps, IKeycloakInstance } from "../../interfaces";

interface IStateContainer {
  isLoggedIn: boolean;
  isError: boolean;
  kc: IKeycloakInstance | {};
}
const initialState = {
  isLoggedIn: false,
  isError: false,
  kc: {},
};

const KeycloakContaier: React.FunctionComponent<IKeycloakContaierProps> = ({
  clientId,
  secret,
  authorization_endpoint,
  token_endpoint,
  end_session_endpoint,
  rederElement: Element,
}) => {
  const [state, setState] = React.useState<IStateContainer>(initialState);

  React.useEffect(() => {
    const init = async () => {
      const service = new KeycloakService(
        clientId,
        secret,
        authorization_endpoint,
        token_endpoint,
        end_session_endpoint
      );
      service
        .start()
        .then((auth: any) => {
          if (auth)
            setState({
              isLoggedIn: auth,
              isError: false,
              kc: {
                tokenParsed: service.tokenParsed,
                refreshToken: service.refreshToken,
                hasRealmRole: service.hasRealmRole,
                hasResourceRole: service.hasResourceRole,
                clearToken: service.clearToken,
                logout: service.logout,
                updateToken: service.updateToken,
                isLoggedIn: service.isLoggedIn,
                cooperativa: service.cooperativa,
                userName: service.userName,
              },
            });
          else service.login();
        })
        .catch((error: any) => {
          setState({ isLoggedIn: false, isError: true, kc: {} });
        });
    };
    init();
  }, [
    clientId,
    secret,
    authorization_endpoint,
    token_endpoint,
    end_session_endpoint,
  ]);

  if (state.isError) return <KeycloakError />;
  if (!state.isLoggedIn) return <KeycloakLoading />;

  return (
    <KeycloakProvider state={state.kc}>
      {Element ? <Element /> : <KeycloakError />}
    </KeycloakProvider>
  );
};

export default KeycloakContaier;
