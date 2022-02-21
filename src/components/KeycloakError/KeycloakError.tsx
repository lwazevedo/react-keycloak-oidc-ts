import * as React from "react";
import "./error.css";
import { useKeycloak } from "../../hooks";

export interface IKeycloakErrorProps {
  errorTitle?: string;
  errorMsg?: string;
  errorBtnTitle?: string;
}

const KeycloakError: React.FunctionComponent<IKeycloakErrorProps> = ({
  errorTitle = "An unexpected error occurred!",
  errorMsg = "If the problem persists, please contact your IT team!",
  errorBtnTitle = "Try again",
}) => {
  const { isLoggedIn, logout } = useKeycloak();
  const onHandleTryAgain = () => {
    if (isLoggedIn) logout();
    else window.location.reload();
  };
  return (
    <div className="keycloak-container-error">
      <span className="keycloak-text">{errorTitle}</span>
      <span className="keycloak-text">{errorMsg}</span>
      <button onClick={onHandleTryAgain} className="btn-try-again">
        {errorBtnTitle}
      </button>
    </div>
  );
};

export default KeycloakError;
