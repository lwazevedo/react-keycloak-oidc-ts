import * as React from "react";
import "./loading.css";

interface IKeycloakLoadingProps {}

const KeycloakLoading: React.FunctionComponent<IKeycloakLoadingProps> = (
  props
) => {
  return (
    <div className="keycloak-container-loading">
      <div className="keycloak-loading"></div>
    </div>
  );
};

export default KeycloakLoading;
