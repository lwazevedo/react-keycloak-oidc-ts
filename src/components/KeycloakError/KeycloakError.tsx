import * as React from "react";
import "./error.css";
import { useKeycloak } from "../../hooks";

interface IKeycloakErrorProps {}

const KeycloakError: React.FunctionComponent<IKeycloakErrorProps> = (props) => {
  const { isLoggedIn, logout } = useKeycloak();
  const onHandleTentarNovamente = () => {
    if (isLoggedIn) logout();
    else window.location.reload();
  };
  return (
    <div className="keycloak-container-error">
      <span>Ocorreu um erro inesperado!</span>
      <span>Se persistir, favor entrar em contato com a TI!</span>
      <button
        onClick={onHandleTentarNovamente}
        className="btn-tentar-novamente"
      >
        Tentar novamente
      </button>
    </div>
  );
};

export default KeycloakError;
