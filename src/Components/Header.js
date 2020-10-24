import React from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { ReactComponent as Dogs } from "../Assets/dogs.svg";
import { UserContext } from "../UserContext";

function Header() {
  const { dados } = React.useContext(UserContext);

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav}  container`}>
        <Link className={styles.logo} to="/" end="true">
          <Dogs />
        </Link>
        {dados ? (
          <div>
            <Link to="conta" className={styles.login}>
              {dados.email}
            </Link>{" "}
            
          </div>
        ) : (
          <Link to="login" className={styles.login}>
            {" "}
            Login / Entrar
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
