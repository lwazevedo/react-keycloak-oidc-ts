import { IKeycloakErrorProps } from "../components/KeycloakError/KeycloakError";

export interface IStateKeycloakContainer {
  isLoggedIn: boolean;
  isLoading: boolean;
  isError: boolean;
  kc: IKeycloakInstance | {};
}

export interface IKeycloakResourceAccess {
  [key: string]: IKeycloakRoles;
}

export interface IKeycloakRoles {
  roles: string[];
}
export interface ITokenParsed {
  iss?: string;
  sub?: string;
  aud?: string;
  exp?: number;
  iat?: number;
  auth_time?: number;
  nonce?: string;
  acr?: string;
  amr?: string;
  azp?: string;
  session_state?: string;
  realm_access?: IKeycloakRoles;
  resource_access?: IKeycloakResourceAccess;
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
  name: string;
  token: string;
}

export interface IKeycloakContaierProps {
  clientId: string;
  secret: string;
  authorization_endpoint: string;
  token_endpoint: string;
  end_session_endpoint: string;
  renderElement: React.ElementType;
  errorConfig?: IKeycloakErrorProps | {};
  renderLoading?: boolean;
}
