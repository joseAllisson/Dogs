import React from "react";
import { USER_GET, TOKEN_POST, TOKEN_VALIDATE_POST } from "./api";
import { useNavigate } from "react-router-dom";

export const UserContext = React.createContext();

export function UserStorage({ children }) {
  const [dados, setDados] = React.useState(null);
  const [login, setLogin] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  async function getUser(token) {
    const { url, options } = USER_GET(token);

    const response = await fetch(url, options);
    const json = await response.json();

    setDados(json);
    setLogin(true);
    setError(null);
  }

  const userLogout = React.useCallback(async function () {
    setError(null);
    setDados(null);
    setLoading(false);
    setLogin(false);
    window.localStorage.removeItem("token");
    navigate("/login");
    
  }, [navigate]);

  async function userLogin(username, password) {
    try {
      setLoading(true);
      const { url, options } = TOKEN_POST({ username, password });

      const response = await fetch(url, options);
      const { token } = await response.json();
      if (!response.ok)
        throw new Error(`Usuário inválido!`);
      window.localStorage.setItem("token", token);
      await getUser(token);
      navigate("/conta");
    } catch (err) {
      setError(err.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem("token");

      if (token) {
        try {
          setLoading(true);
          const { url, options } = TOKEN_VALIDATE_POST(token);
          const response = await fetch(url, options);
          if (!response.ok) throw new Error("Token error");
          await getUser(token);
        } catch (err) {
          userLogout();
        } finally {
          setLoading(false);
        }
      } else {
        setLogin(false)
      }
    }
    autoLogin();
  }, [userLogout]);

  return (
    <UserContext.Provider
      value={{ userLogin, dados, login, userLogout, error, loading }}
    >
      {children}
    </UserContext.Provider>
  );
}
