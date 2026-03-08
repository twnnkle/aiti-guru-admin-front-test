import cn from "classnames";

import styles from "./ProductsTable.module.scss";

import Checkbox from "../../../../ui/checkbox/Checkbox";

import type { ProductI, SortKey } from "../../../../../types/products";

import AddBtnIcon from "../../../../icons/AddBtnIcon";
import MoreBtnIcon from "../../../../icons/MoreBtnIcon";

export interface ProductsTableI {
  products: ProductI[];
  selectedIds: number[];
  handleSort: (key: SortKey) => void;
  handleSelectAll: () => void;
  handleSelectOne: (id: number) => void;
}

function ProductsTable({
  products,
  selectedIds,
  handleSort,
  handleSelectAll,
  handleSelectOne,
}: ProductsTableI) {
  const allSelected =
    products.length > 0 && selectedIds.length === products.length;

  return (
    <div className={styles.productsTable}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.checkboxCell}>
              <Checkbox
                id='selectAll'
                checked={allSelected}
                onChange={handleSelectAll}
              />
            </th>
            <th onClick={() => handleSort("title")} className={styles.sortable}>
              Наименование
            </th>
            <th onClick={() => handleSort("brand")} className={styles.sortable}>
              Вендор
            </th>
            <th onClick={() => handleSort("sku")} className={styles.sortable}>
              Артикул
            </th>
            <th
              onClick={() => handleSort("rating")}
              className={styles.sortable}
            >
              Оценка
            </th>
            <th onClick={() => handleSort("price")} className={styles.sortable}>
              Цена, ₽
            </th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => {
            const isSelected = selectedIds.includes(product.id);

            return (
              <tr
                key={product.id}
                className={cn({ [styles.selectedRow]: isSelected })}
              >
                <td className={styles.checkboxCell}>
                  <Checkbox
                    id={`select-${product.id}`}
                    checked={selectedIds.includes(product.id)}
                    onChange={() => handleSelectOne(product.id)}
                  />
                </td>
                <td>
                  <div className={styles.productInfo}>
                    {product.images && product.images[0] && (
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className={styles.productImage}
                      />
                    )}
                    <div className={styles.productTitleAndCategory}>
                      <p className={styles.productTitle}>{product.title}</p>
                      <span className={styles.productCategory}>
                        {product.category}
                      </span>
                    </div>
                  </div>
                </td>
                <td className={styles.brand}>{product.brand || "-"}</td>
                <td className={styles.sku}>{product.sku}</td>
                <td className={styles.rating}>
                  <span
                    className={cn({
                      [styles.lowRating]: product.rating < 3,
                    })}
                  >
                    {product.rating}
                  </span>
                  /5
                </td>
                <td className={styles.price}>
                  {product.price.toString().split(".")[0]}
                  <span className={styles.priceRemains}>
                    ,{product.price.toString().split(".")[1]}
                  </span>
                </td>
                <td>
                  <div className={styles.btns}>
                    <button className={styles.addBtn}>
                      <AddBtnIcon />
                    </button>

                    <button className={styles.moreBtn}>
                      <MoreBtnIcon />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ProductsTable;
