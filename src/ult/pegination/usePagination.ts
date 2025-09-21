import { useState, useMemo } from "react";

export const usePagination = <T>(items: T[], itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  }, [items, currentPage, itemsPerPage]);

  return {
    currentPage,
    setCurrentPage,
    totalPages,
    currentItems,
    totalItems: items.length,
    startIndex: (currentPage - 1) * itemsPerPage,
    itemsPerPage,
  };
};
