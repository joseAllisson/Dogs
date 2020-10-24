import React from "react";
import styles from "./Input.module.css"

function Input({ label, type, name, value, onChange, error, onBlur  }) {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={name}>{label}</label>
      <input className={styles.input} type={type} name={name} id={name} value={value} onChange={onChange} onBlur={onBlur}/>
      <p className={styles.error}>{error}</p>
    </div>
  );
}

export default Input;
