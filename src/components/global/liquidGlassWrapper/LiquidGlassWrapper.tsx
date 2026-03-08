import type { ReactNode } from "react";
import cn from "classnames";

import styles from "./LiquidGlassWrapper.module.scss";

interface LiquidGlassWrapperI {
  children: ReactNode;
  borderRadius?: string;
  borderSize?: string;
  className?: string;
}

function LiquidGlassWrapper({
  children,
  borderRadius = "34",
  borderSize = "6",
  className,
}: LiquidGlassWrapperI) {
  return (
    <div
      className={cn(styles.liquidGlassWrapper, className)}
      style={{
        borderRadius: `${borderRadius}px`,
      }}
    >
      <div
        className={styles.content}
        style={{
          borderRadius: `${borderRadius}px`,
          borderWidth: `${borderSize}px`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default LiquidGlassWrapper;
