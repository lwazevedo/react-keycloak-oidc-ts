import * as React from "react";
import KeycloakService from "../../services/KeycloakService";
import KeycloakError from "../KeycloakError";
import KeycloakLoading from "../KeycloakLoading";

import { KeycloakProvider } from "../../contexts/KeycloakContext";
import {
  IKeycloakContaierProps,
  IStateKeycloakContainer,
} from "../../interfaces";

const initialState = {
  isLoggedIn: false,
  isLoading: false,
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
  errorConfig = {},
  renderLoading = true,
}) => {
  const [state, setState] =
    React.useState<IStateKeycloakContainer>(initialState);

  React.useEffect(() => {
    const init = async () => {
      setState({ ...state, isLoading: true });
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
              isLoading: false,
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
          else {
            service.login();
            setState(initialState);
          }
        })
        .catch((error: any) => {
          console.error(error);
          setState({ ...initialState, isError: true });
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

  if (state.isError) return <KeycloakError {...errorConfig} />;
  if (renderLoading && state.isLoading && !state.isLoggedIn)
    return <KeycloakLoading />;

  return (
    <KeycloakProvider state={state.kc}>
      {!state.isLoading && state.isLoggedIn && Element ? (
        <Element />
      ) : (
        <KeycloakError {...errorConfig} />
      )}
    </KeycloakProvider>
  );
};

export default KeycloakContaier;
