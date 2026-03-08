import ReactPaginate from "react-paginate";

import styles from "./Footer.module.scss";

import { LIMIT } from "../../../../../pages/dashboard/Dashboard";

import PaginationArrowIcon from "../../../../icons/PaginationArrowIcon";

export interface FooterPropsI {
  totalProducts: number;
  selectedPage: number;
  handlePageChange: (newPage: number) => void;
}

function Footer({
  totalProducts,
  selectedPage,
  handlePageChange,
}: FooterPropsI) {
  const totalPages = Math.ceil(totalProducts / LIMIT);
  const start = (selectedPage - 1) * LIMIT + 1;
  const end = Math.min(selectedPage * LIMIT, totalProducts);

  const handlePageClick = (e: { selected: number }) => {
    handlePageChange(e.selected + 1);
  };

  return (
    <div className={styles.footer}>
      {totalProducts > 0 && (
        <p className={styles.productsCounter}>
          Показано{" "}
          <span>
            {start}-{end}
          </span>{" "}
          из <span>{totalProducts}</span>
        </p>
      )}

      {totalPages > 0 && (
        <ReactPaginate
          breakLabel='...'
          nextLabel={<PaginationArrowIcon isReversed />}
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          pageCount={totalPages}
          previousLabel={<PaginationArrowIcon />}
          renderOnZeroPageCount={null}
          forcePage={selectedPage - 1}
          containerClassName={styles.pagination}
          pageLinkClassName={styles.pageLink}
          previousLinkClassName={styles.prevPageLink}
          nextClassName={styles.pageItem}
          nextLinkClassName={styles.nextPageLink}
          breakLinkClassName={styles.pageLink}
          activeClassName={styles.activePage}
        />
      )}
    </div>
  );
}

export default Footer;
