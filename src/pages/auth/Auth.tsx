import styles from "./Auth.module.scss";

import AuthModal from "../../components/pages/auth/authModal/AuthModal";
import LiquidGlassWrapper from "../../components/global/liquidGlassWrapper/LiquidGlassWrapper";

function Auth() {
  return (
    <div className={styles.authPage}>
      <LiquidGlassWrapper>
        <AuthModal />
      </LiquidGlassWrapper>
    </div>
  );
}

export default Auth;
