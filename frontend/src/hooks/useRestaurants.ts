import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchRestaurants } from "../api/restaurants";
import type { RestaurantsRequest } from "../types/restaurant";

export function useRestaurants(initialPage = 1, initialLimit = 9) {
  const [page, setPage] = useState<RestaurantsRequest["page"]>(initialPage);
  const [limit] = useState<RestaurantsRequest["limit"]>(initialLimit);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["restaurants", page, limit],
    queryFn: () => fetchRestaurants({ page, limit }),
    placeholderData: keepPreviousData,
  });

  const restaurants = data?.restaurants ?? [];
  const pagination = data?.pagination;

  const total = pagination?.total ?? 0;
  const totalPages =
    pagination?.pages ?? (total > 0 ? Math.ceil(total / limit) : 1);

  const handlePageChange = (raw: string) => {
    const value = Number(raw);

    if (Number.isNaN(value) || value <= 0) {
      setPage(1);
      return;
    }

    const clamped = Math.min(Math.max(1, value), totalPages || 1);
    setPage(clamped);
  };

  const handlePrev = () => {
    setPage((p) => Math.max(1, p - 1));
  };

  const handleNext = () => {
    setPage((p) => (pagination && pagination.hasNext ? p + 1 : p));
  };

  return {
    page,
    setPage,
    restaurants,
    pagination,
    total,
    totalPages,
    isLoading,
    isError,
    error,
    handlePageChange,
    handlePrev,
    handleNext,
  };
}
