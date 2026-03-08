import styles from "./Header.module.scss";

import Button from "../../../../ui/button/Button";

import AddProductIcon from "../../../../icons/AddProductIcon";
import UpdateProductsIcon from "../../../../icons/UpdateProductsIcon";

export interface HeaderPropsI {
  handleRefresh: () => void;
  toggleModal: () => void;
}

function Header({ handleRefresh, toggleModal }: HeaderPropsI) {
  return (
    <div className={styles.header}>
      <p className={styles.title}>Все позиции</p>

      <div className={styles.btns}>
        <button className={styles.updateProductsBtn} onClick={handleRefresh}>
          <UpdateProductsIcon />
        </button>

        <Button className={styles.addProductBtn} onClick={toggleModal}>
          <AddProductIcon />
          Добавить
        </Button>
      </div>
    </div>
  );
}

export default Header;
