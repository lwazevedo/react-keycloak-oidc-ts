import Keycloak from "../lib/Keycloak";

class KeycloakService {
  private _kc: any = {};
  private _window: any = window as any;

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
    // this._kc = new this._window.Keycloak({
    //   clientId: clientId,
    //   credentials: {
    //     secret,
    //   },
    //   oidcProvider: {
    //     authorization_endpoint,
    //     token_endpoint,
    //     end_session_endpoint,
    //   },
    // });
  }

  start(): any {
    return this._kc.init({
      onLoad: "login-required",
      useNonce: false,
      checkLoginIframe: false,
    });
  }

  get tokenParsed(): any {
    return this._kc.tokenParsed;
  }

  get refreshToken(): string {
    return this._kc.refreshToken;
  }
  get hasRealmRole(): any {
    return this._kc.hasRealmRole;
  }

  get hasResourceRole(): any {
    return this._kc.hasResourceRole;
  }

  get clearToken(): void {
    return this._kc.clearToken;
  }

  get logout(): void {
    return this._kc.logout;
  }

  get updateToken(): void {
    return this._kc.updateToken;
  }

  get isLoggedIn(): boolean {
    return !!this._kc.token;
  }

  get cooperativa(): number {
    return Number(this._kc.tokenParsed?.preferred_username.split(".")[1]);
  }

  get userName(): string {
    return this._kc.tokenParsed?.preferred_username;
  }

  get token(): string {
    return this._kc.token;
  }

  login(): any {
    return this._kc.login();
  }
}

export default KeycloakService;
