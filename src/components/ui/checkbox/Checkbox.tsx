import type { InputHTMLAttributes } from "react";
import cn from "classnames";

import styles from "./Checkbox.module.scss";

interface CheckboxPropsI extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

function Checkbox({ className, ...props }: CheckboxPropsI) {
  return (
    <input
      {...props}
      type='checkbox'
      className={cn(className, styles.checkbox)}
    />
  );
}

export default Checkbox;
