# react-keycloak-oidc-ts

## Introduction

This package uses a copy of the keycloak-js library for oidc adapter, and this copy has been changed to support secrect for connecting to sensitive clients.

This package does not (support) other keycloak integration configurations. It was created to solve a single problem and no more.

As the name implies, this package is for performing keycloak integrations in react applications.

For integrations with a keycloak greater than 8, use the library itself [keycloa-js](https://www.npmjs.com/package/keycloak-js). 

\
Using react-keycloak:

```text
 npm i react-keycloak-oidc-ts
```

Include the container in index.tsx and pass its main component to be rendered with the keycloak settings.

Example:

```js
import React from "react";
import ReactDOM from "react-dom";

import App from "pages/App";

import { KeycloakContaier } from "react-keycloak-oidc-ts";

// Settings keycloak
const configKeycloak = {
  clientId: process.env.REACT_APP_KEYCLOAK_CLIENT_ID ?? "",
  secret: process.env.REACT_APP_KEYCLOAK_SECRET ?? "",
  authorization_endpoint:
    process.env.REACT_APP_KEYCLOAK_AUTHORIZATION_ENDPOINT ?? "",
  token_endpoint: process.env.REACT_APP_KEYCLOAK_TOKEN_ENDPOINT ?? "",
  end_session_endpoint:
    process.env.REACT_APP_KEYCLOAK_END_SESSION_ENDPOINT ?? "",
};

// This error setting is for when the keycloak login screen cannot be loaded. 
// It`s not mandatory - It has default configuration.
const erroConfig = {
  errorTitle: 'YOUR ERROR TITLE';
  errorMsg: 'YOUR ERROR MESSAGE';
  errorBtnTitle: 'YOUR BUTTON TITLE';
}

// This setting indicates whether you want the loading component to be rendered before the keycloak login screen.
// It`s not mandatory - deafault true
const renderLoading = false;


// This render container keycloak
const renderKeycloakLogin = () = <KeycloakContaier {...configKeycloak} renderElement={App} erroConfig={erroConfig} renderLoading={renderLoading}/>

ReactDOM.render(
  <React.StrictMode>
    {renderKeycloakLogin()}
  </React.StrictMode>,
  document.getElementById("root")
);

```

To use other functions and get data after you are logged in, use the useKeycloak hook.

Example:

```js
import React from "react";
import { ContentWrapper, Welcome } from "./styles";
import { PageWrapper } from "shared/styles";
import { useKeycloak } from "react-keycloak-oidc-ts";

export default function Login() {
  const { logout, userName } = useKeycloak();
  return (
    <PageWrapper>
      <ContentWrapper>
        <Welcome>{userName}</Welcome>
        <button onClick={() => logout()}>Sair</button>
      </ContentWrapper>
    </PageWrapper>
  );
}
```

Note:

To run locally and integrate with keycloak, it may be necessary to have a local proxy.

```text
npm install http-proxy-middleware
```

Example:

```js
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  
  app.use(
    process.evn.REACT_APP_URL_AUTH,
    createProxyMiddleware({
      pathRewrite: () => process.env.REACT_APP_KEYCLOAK_URL,
      target: `${process.env.REACT_APP_KEYCLOAK_URL}${process.env.REACT_APP_KEYCLOAK_PROXY_PATH_REDIRECT}`,
      changeOrigin: true,
      secure: false,
    })
  );
};


```
