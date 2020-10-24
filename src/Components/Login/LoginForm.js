import React from "react";
import Input from "../Form/Input";
import Button from "../Form/Button";
import useForm from "../../Hooks/useForm";
// import { TOKEN_POST, USER_GET } from "../../api";
import { UserContext } from "../../UserContext";
import { Link } from "react-router-dom";
import Error from "../Helper/Error";
import styles from "../Login/LoginForm.module.css";
import btn from "../Form/Button.module.css";
import Head from "../Helper/Head";

function LoginForm() {
  const username = useForm();
  const password = useForm();

  const { userLogin, error, loading } = React.useContext(UserContext);

  async function handleSubmit(event) {
    event.preventDefault();

    if (username.validation() && password.validation()) {
      userLogin(username.value, password.value);
    }
  }

  return (
    <section className="animeLeft">
      <Head title="Login" />
      <h1 className="title">Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input label="Usuario" name="username" type="text" {...username} />

        <Input label="Senha" name="password" type="Password" {...password} />

        {loading ? (
          <Button disabled>Carregando...</Button>
        ) : (
          <Button>Entrar</Button>
        )}
      </form>
      <Error error={error} />

      <Link className={styles.perdeu} to="perdeu">
        Perdeu a Senha?
      </Link>

      <div className={styles.cadastro}>
        <h2 className={styles.subtitle}>Cadastre-se</h2>
        <p>Ainda não possui conta? Cadastre-se no site.</p>
        <Link className={btn.button} to="/login/criar">
          Cadastro
        </Link>
      </div>
    </section>
  );
}

export default LoginForm;
