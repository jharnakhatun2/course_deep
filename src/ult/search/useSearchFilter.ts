import { useState, useMemo } from "react";

export const useSearchFilter = <T extends Record<string, any>>(
  items: T[],
  searchKeys: (keyof T)[]
) => {
  const [query, setQuery] = useState("");

  const filteredItems = useMemo(() => {
    if (!query) return items;

    return items.filter((item) =>
      searchKeys.some((key) =>
        String(item[key]).toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [items, query, searchKeys]);

  return { query, setQuery, filteredItems };
};
