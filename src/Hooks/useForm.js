import React from "react";

const types = {
  email: {
    regex: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    message: "Email inválido!",
  },
  // /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
  password: {
    regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
    message: "A senha precisaa ter 1 caracter maísculo, 1 minúsculo e 1 digito. Com no minimo 8 caracteres!",
  },
  number: {
    regex: /^\d+$/,
    message: "Utilize apenas números!"
  }
};

function useForm(type) {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(null);

  function validation(value) {
    if (type === false) return true;
    if (value.length === 0) {
      setError("preencha um Campo!");
      return false;
    } else if (types[type] && !types[type].regex.test(value)) {
      setError(types[type].message);
      return false;
    } else {
      setError(null);
      return true;
    }
  }

  function onChange({ target }) {
    if (error) validation(target.value);
    setValue(target.value);
  }

  return {
    value,
    onChange,
    setValue,
    error,
    validation: () => validation(value),
    onBlur: () => validation(value),
  };
}

export default useForm;
