import type { ReactNode } from "react";
import cn from "classnames";

import styles from "./Button.module.scss";

interface ButtonPropsI {
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  children: ReactNode;
}

function Button({
  className,
  onClick,
  type = "button",
  disabled = false,
  children,
}: ButtonPropsI) {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={cn(className, styles.button)}
    >
      {children}
    </button>
  );
}

export default Button;
