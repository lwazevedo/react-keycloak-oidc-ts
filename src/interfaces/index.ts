import { IKeycloakErrorProps } from "../components/KeycloakError/KeycloakError";

export interface IStateKeycloakContainer {
  isLoggedIn: boolean;
  isLoading: boolean;
  isError: boolean;
  kc: IKeycloakInstance | {};
}

export interface ITokenParsed {
  acr: string;
  auth_time: number;
  azp: string;
  cd_user_system: string;
  distinguishedName: string;
  email_verified: boolean;
  exp: string;
  given_name: string;
  iat: string;
  iss: string;
  jti: string;
  locale: string;
  name: string;
  nbf: number;
  preferred_username: string;
  roles: string[];
  scope: string;
  session_state: string;
  sub: string;
  typ: string;
}

export interface IKeycloakInstance {
  tokenParsed: ITokenParsed;
  refreshToken: string;
  hasRealmRole: Function;
  hasResourceRole: Function;
  clearToken: Function;
  logout: Function;
  updateToken: Function;
  isLoggedIn: boolean;
  cooperativa: number;
  userName: string;
}

export interface IKeycloakContaierProps {
  clientId: string;
  secret: string;
  authorization_endpoint: string;
  token_endpoint: string;
  end_session_endpoint: string;
  rederElement: React.ElementType;
  errorConfig?: IKeycloakErrorProps | {};
  renderLoading?: boolean;
}
