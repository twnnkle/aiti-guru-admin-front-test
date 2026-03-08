import cn from "classnames";

import styles from "./Search.module.scss";

import SearchIcon from "../../../../icons/SearchIcon";

interface SearchPropsI {
  className?: string;
  searchInput: string;
  handleSearchInputChange: (value: string) => void;
}

function Search({
  className,
  searchInput,
  handleSearchInputChange,
}: SearchPropsI) {
  return (
    <div className={cn(className, styles.search)}>
      <div className={styles.searchIcon}>
        <SearchIcon />
      </div>
      <input
        type='text'
        placeholder='Найти'
        value={searchInput}
        onChange={(e) => handleSearchInputChange(e.target.value)}
      />
    </div>
  );
}

export default Search;
