import styles from "./Header.module.scss";

import Search from "./search/Search";

interface HeaderPropsI {
  searchInput: string;
  handleSearchInputChange: (value: string) => void;
}

function Header({ searchInput, handleSearchInputChange }: HeaderPropsI) {
  return (
    <div className={styles.header}>
      <div className='container'>
        <p className={styles.title}>Товары</p>

        <Search
          searchInput={searchInput}
          handleSearchInputChange={handleSearchInputChange}
        />
      </div>
    </div>
  );
}

export default Header;
