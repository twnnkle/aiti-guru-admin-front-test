import type { InputHTMLAttributes, ReactNode } from "react";

import styles from "./Input.module.scss";

interface ActionI {
  icon: ReactNode;
  onClick: () => void;
}

interface InputPropsI extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
  inputIcon?: ReactNode;
  action?: ActionI;
}

function Input({
  label,
  error,
  className,
  inputIcon,
  action,
  ...props
}: InputPropsI) {
  const { id } = props;

  return (
    <div className={styles.inputBlock}>
      {label && <label htmlFor={id}>{label}</label>}

      <div className={styles.input}>
        {inputIcon && <div className={styles.inputIcon}>{inputIcon}</div>}
        <input {...props} className={className} />
        {action && (
          <div className={styles.actionIcon} onClick={action.onClick}>
            {action.icon}
          </div>
        )}
      </div>

      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}

export default Input;
