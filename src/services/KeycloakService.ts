import { ITokenParsed } from "../interfaces";
import Keycloak from "../lib/keycloak";

class KeycloakService {
  private _kc: Keycloak;

  constructor(
    clientId: string,
    secret: string,
    authorization_endpoint: string,
    token_endpoint: string,
    end_session_endpoint: string
  ) {
    this._kc = new Keycloak({
      clientId: clientId,
      credentials: {
        secret,
      },
      oidcProvider: {
        authorization_endpoint,
        token_endpoint,
        end_session_endpoint,
      },
    });
  }

  start(): any {
    return this._kc.init({
      onLoad: "login-required",
      useNonce: false,
      checkLoginIframe: false,
    });
  }

  get tokenParsed(): ITokenParsed | undefined {
    return this._kc.tokenParsed;
  }

  get refreshToken(): string | undefined {
    return this._kc.refreshToken;
  }
  get hasRealmRole(): Function {
    return this._kc.hasRealmRole;
  }

  get hasResourceRole(): Function {
    return this._kc.hasResourceRole;
  }

  get clearToken(): Function {
    return this._kc.clearToken;
  }

  get logout(): Function {
    return this._kc.logout;
  }

  get updateToken(): Function {
    return this._kc.updateToken;
  }

  get isLoggedIn(): boolean {
    return !!this._kc.token;
  }

  get cooperativa(): number {
    return Number(this._kc.tokenParsed?.preferred_username.split(".")[1]);
  }

  get name(): string {
    return this._kc.tokenParsed?.preferred_username.split(".")[0];
  }

  get userName(): string {
    return this._kc.tokenParsed?.preferred_username;
  }

  get token(): string | undefined {
    return this._kc.token;
  }

  login(): any {
    return this._kc.login();
  }
}

export default KeycloakService;
