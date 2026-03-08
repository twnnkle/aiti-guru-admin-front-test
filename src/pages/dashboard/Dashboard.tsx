import { useCallback, useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

import styles from "./Dashboard.module.scss";

import Header from "../../components/pages/dashboard/header/Header";
import ProductsBlock from "../../components/pages/dashboard/productsBlock/ProductsBlock";

import type { ProductI, ProductResponseI, SortKey } from "../../types/products";

import { API_BASE_URL } from "../../config";
import { fetchWithProgress } from "../../utils/fetchWithProgress";

const SORT_BY_KEY = "products_sortBy";
const ORDER_KEY = "products_order";
export const LIMIT = 20;

function Dashboard() {
  const [products, setProducts] = useState<ProductI[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [selectedPage, setSelectedPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const [sortBy, setSortBy] = useState<SortKey>(() => {
    const saved = localStorage.getItem(SORT_BY_KEY) as SortKey | null;
    return saved && ["title", "brand", "sku", "rating", "price"].includes(saved)
      ? saved
      : "title";
  });

  const [order, setOrder] = useState<"asc" | "desc">(() => {
    const saved = localStorage.getItem(ORDER_KEY) as "asc" | "desc" | null;
    return saved === "asc" || saved == "desc" ? saved : "asc";
  });

  const fetchProducts = useCallback(
    async (
      sortBy: SortKey,
      order: "asc" | "desc",
      pageCount: number,
      searchQuery: string,
    ) => {
      const skip = (pageCount - 1) * LIMIT;
      let url = `${API_BASE_URL}/products`;

      const params = new URLSearchParams();
      params.append("limit", LIMIT.toString());
      params.append("skip", skip.toString());

      if (searchQuery) {
        url = `${API_BASE_URL}/products/search`;
        params.append("q", searchQuery);
      }
      params.append("sortBy", sortBy);
      params.append("order", order);

      try {
        const response = await fetchWithProgress(`${url}?${params.toString()}`);

        if (!response.ok) {
          throw new Error("Ошибка получения продуктов");
        }

        const data: ProductResponseI = await response.json();
        setProducts(data.products);
        setTotalProducts(data.total);
      } catch (error) {
        console.error(error);
      }
    },
    [],
  );

  const handleSort = (key: SortKey) => {
    if (key === sortBy) {
      setOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(key);
      setOrder("asc");
    }

    setSelectedPage(1);
  };

  const handleSelectAll = () => {
    if (selectedIds.length === products.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(products.map((p) => p.id));
    }
  };

  const handleSelectOne = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handlePageChange = (newPage: number) => {
    setSelectedPage(newPage);
  };

  const handleRefresh = () => {
    fetchProducts(sortBy, order, selectedPage, searchQuery);
    setSelectedPage(1);
  };

  const debouncedSearch = useDebouncedCallback((query: string) => {
    setSearchQuery(query);
    setSelectedPage(1);
  }, 500);

  const handleSearchInputChange = (value: string) => {
    setSearchInput(value);
    debouncedSearch(value);
  };

  useEffect(() => {
    fetchProducts(sortBy, order, selectedPage, searchQuery);
  }, [fetchProducts, sortBy, order, selectedPage, searchQuery]);

  useEffect(() => {
    localStorage.setItem(SORT_BY_KEY, sortBy);
  }, [sortBy]);

  useEffect(() => {
    localStorage.setItem(ORDER_KEY, order);
  }, [order]);

  return (
    <div className={styles.dashboardPage}>
      <Header
        searchInput={searchInput}
        handleSearchInputChange={handleSearchInputChange}
      />
      <ProductsBlock
        products={products}
        totalProducts={totalProducts}
        selectedIds={selectedIds}
        handleSort={handleSort}
        handleSelectAll={handleSelectAll}
        handleSelectOne={handleSelectOne}
        handleRefresh={handleRefresh}
        selectedPage={selectedPage}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}

export default Dashboard;
