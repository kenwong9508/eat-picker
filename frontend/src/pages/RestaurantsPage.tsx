// frontend/src/pages/RestaurantsPage.tsx
import { useRestaurants } from "../hooks/useRestaurants";
import { RestaurantCard } from "../components/RestaurantCard";
import { Pagination } from "../components/Pagination";
import { CreateRestaurantDrawer } from "../components/CreateRestaurantDrawer";
import { EditRestaurantDrawer } from "../components/EditRestaurantDrawer";

export function RestaurantsPage() {
  const {
    page,
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
    isEditOpen,
    editingRestaurant,
    handleEditRestaurant,
    handleCloseEdit,
    handleEditSuccess,
  } = useRestaurants();

  const handleDeleteRestaurant = (id: number) => {
    // TODO: delete flow 之後再整
    console.log("delete restaurant", id);
  };

  return (
    <>
      <div className="mx-auto flex max-w-6xl flex-col gap-6 rounded-3xl bg-white/80 p-4 shadow-sm backdrop-blur sm:p-6 dark:bg-stone-900/80">
        {/* Header */}
        <header className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
          <div>
            <h1 className="text-xl font-bold sm:text-2xl">Restaurants</h1>
            <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
              Manage restaurants used for recommendations.
            </p>
          </div>
          <button
            type="button"
            onClick={handleOpenCreate}
            className="cursor-pointer rounded-2xl bg-amber-500 px-4 py-2 text-sm font-semibold text-stone-950 shadow-sm
             hover:bg-amber-400 active:bg-amber-500/90
             disabled:cursor-not-allowed disabled:bg-amber-300
             dark:bg-amber-400 dark:text-stone-950 dark:hover:bg-amber-300"
          >
            Create
          </button>
        </header>

        {/* Card shell with inner scroll */}
        <div className="flex-1 overflow-hidden">
          <div className="flex min-h-[260px] max-h-[80vh] flex-col overflow-hidden rounded-3xl border border-stone-200 bg-stone-50/70 dark:border-stone-700 dark:bg-stone-900/60">
            {isLoading && (
              <div className="p-6 text-sm text-stone-500 dark:text-stone-400">
                Loading restaurants…
              </div>
            )}

            {isError && error && (
              <div className="p-6 text-sm text-red-600 dark:text-red-400">
                {error.message}
              </div>
            )}

            {!isLoading && !isError && restaurants.length > 0 && (
              <>
                <div className="flex-1 overflow-y-auto">
                  <div className="grid gap-4 border-t border-stone-200 bg-gradient-to-br from-stone-50 to-amber-50 p-4 dark:border-stone-700 dark:from-stone-900 dark:to-stone-950 sm:grid-cols-2 lg:grid-cols-3">
                    {restaurants.map((restaurant) => (
                      <RestaurantCard
                        key={restaurant.id}
                        restaurant={restaurant}
                        onEdit={handleEditRestaurant}
                        onDelete={handleDeleteRestaurant}
                      />
                    ))}
                  </div>
                </div>
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  total={total}
                  pagination={pagination}
                  onPageInputChange={handlePageChange}
                  onPrev={handlePrev}
                  onNext={handleNext}
                />
              </>
            )}
          </div>
        </div>
      </div>

      <CreateRestaurantDrawer
        open={isCreateOpen}
        onClose={handleCloseCreate}
        onSuccess={handleCreateSuccess}
      />

      <EditRestaurantDrawer
        open={isEditOpen}
        restaurant={editingRestaurant}
        onClose={handleCloseEdit}
        onSuccess={handleEditSuccess}
      />
    </>
  );
}
