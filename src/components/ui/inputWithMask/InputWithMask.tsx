import { forwardRef } from "react";
import { IMaskInput, type IMaskInputProps } from "react-imask";

import styles from "../input/Input.module.scss";

type InputWithMaskProps = IMaskInputProps<HTMLInputElement> & {
  label?: string;
  error?: string;
  className?: string;
};

const InputWithMask = forwardRef<HTMLInputElement, InputWithMaskProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className={styles.inputBlock}>
        {label && <label htmlFor={props.id}>{label}</label>}
        <div className={styles.input}>
          <IMaskInput
            {...props}
            id={props.id}
            inputRef={ref}
            className={className}
          />
        </div>
        {error && <span className={styles.error}>{error}</span>}
      </div>
    );
  },
);

export default InputWithMask;
