import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchRestaurants } from "../api/restaurants";
import type { Restaurant, RestaurantsGetRequest } from "../types/restaurant";
import { useToast } from "../components/ToastProvider";

export function useRestaurants(initialPage = 1, initialLimit = 9) {
  const [page, setPage] = useState<RestaurantsGetRequest["page"]>(initialPage);
  const [limit] = useState<RestaurantsGetRequest["limit"]>(initialLimit);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const { showToast } = useToast();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["restaurants", page, limit],
    queryFn: () => fetchRestaurants({ page, limit }),
    placeholderData: keepPreviousData,
    retry: false,
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

  const handleOpenCreate = () => {
    setIsCreateOpen(true);
  };

  const handleCloseCreate = () => {
    setIsCreateOpen(false);
  };

  const handleCreateSuccess = () => {
    showToast({
      type: "success",
      title: "Restaurant created",
      message: "New restaurant has been added to the list.",
    });
  };

  const [editingId, setEditingId] = useState<number | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const editingRestaurant: Restaurant | null = editingId
    ? (restaurants.find((r) => r.id === editingId) ?? null)
    : null;

  const handleEditRestaurant = (id: number) => {
    setEditingId(id);
    setIsEditOpen(true);
  };

  const handleCloseEdit = () => {
    setIsEditOpen(false);
    setEditingId(null);
  };

  const handleEditSuccess = () => {
    showToast({
      type: "success",
      title: "Restaurant updated",
      message: "Restaurant details have been saved.",
    });
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
    isCreateOpen,
    handleOpenCreate,
    handleCloseCreate,
    handleCreateSuccess,
    // edit
    isEditOpen,
    editingRestaurant,
    handleEditRestaurant,
    handleCloseEdit,
    handleEditSuccess,
    //
  };
}
