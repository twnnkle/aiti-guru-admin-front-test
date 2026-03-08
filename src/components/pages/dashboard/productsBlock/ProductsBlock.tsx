import { useEffect, useRef, useState } from "react";

import styles from "./ProductsBlock.module.scss";

import Footer from "./footer/Footer";
import Header from "./header/Header";
import ProductsTable, {
  type ProductsTableI,
} from "./productsTable/ProductsTable";
import AddProductModal from "./addProductModal/AddProductModal";

import type { FooterPropsI } from "./footer/Footer";

interface ProductsBlockPropsI extends ProductsTableI, FooterPropsI {
  handleRefresh: () => void;
}

function ProductsBlock({
  products,
  totalProducts,
  selectedIds,
  handleSort,
  handleSelectAll,
  handleSelectOne,
  handleRefresh,
  selectedPage,
  handlePageChange,
}: ProductsBlockPropsI) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const blockRef = useRef<HTMLDivElement>(null);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    if (blockRef.current) {
      blockRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selectedPage]);

  return (
    <div className={styles.productsBlock} ref={blockRef}>
      <div className='container'>
        <Header handleRefresh={handleRefresh} toggleModal={toggleModal} />
        <ProductsTable
          products={products}
          selectedIds={selectedIds}
          handleSort={handleSort}
          handleSelectAll={handleSelectAll}
          handleSelectOne={handleSelectOne}
        />
        <Footer
          totalProducts={totalProducts}
          selectedPage={selectedPage}
          handlePageChange={handlePageChange}
        />
      </div>

      <AddProductModal isOpenModal={isModalOpen} toggleModal={toggleModal} />
    </div>
  );
}

export default ProductsBlock;
