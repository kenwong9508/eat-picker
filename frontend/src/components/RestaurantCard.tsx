import { Restaurant } from "../types/restaurant";
import { formatCurrency } from "../utils";
import { formatCuisine, formatSpeed } from "../utils/restaurantFormat";

type RestaurantCardProps = {
  restaurant: Restaurant;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
};

export function RestaurantCard({
  restaurant,
  onEdit,
  onDelete,
}: RestaurantCardProps) {
  return (
    <div className="flex flex-col rounded-2xl bg-white/90 p-4 shadow-sm ring-1 ring-stone-200 dark:bg-stone-900/90 dark:ring-stone-700">
      {/* Header: name + cuisine + status */}
      <div className="mb-2 flex items-start justify-between gap-2">
        <div>
          <h2 className="text-base font-semibold text-stone-900 dark:text-stone-50">
            {restaurant.name}
          </h2>
          {restaurant.address && (
            <p className="mt-1 line-clamp-2 text-xs text-stone-500 dark:text-stone-400">
              {restaurant.address}
            </p>
          )}
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="inline-flex rounded-full bg-stone-100 px-2 py-0.5 text-xs text-stone-700 dark:bg-stone-800 dark:text-stone-100">
            {formatCuisine(restaurant.cuisine)}
          </span>
          {restaurant.active ? (
            <span className="inline-flex rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
              Active
            </span>
          ) : (
            <span className="inline-flex rounded-full bg-stone-100 px-2 py-0.5 text-[10px] font-medium text-stone-500 dark:bg-stone-700 dark:text-stone-300">
              Hidden
            </span>
          )}
        </div>
      </div>

      {/* Middle info row */}
      <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-stone-600 dark:text-stone-300">
        <span className="inline-flex items-center gap-1">
          <span className="font-semibold">
            {formatCurrency(restaurant.avgPrice)}
          </span>
          <span className="text-stone-400 dark:text-stone-500">/ person</span>
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
          <span>{formatSpeed(restaurant.speed)}</span>
        </span>
        <span className="inline-flex items-center gap-1">
          {restaurant.dineIn && <span>Dine-in</span>}
          {restaurant.takeaway && (
            <>
              {restaurant.dineIn && <span>·</span>}
              <span>Takeaway</span>
            </>
          )}
          {!restaurant.dineIn && !restaurant.takeaway && (
            <span className="text-stone-400 dark:text-stone-500">
              No service
            </span>
          )}
        </span>
      </div>

      {/* Footer: updated + actions */}
      <div className="mt-auto flex items-center justify-between border-t border-stone-100 pt-2 text-[11px] text-stone-500 dark:border-stone-700 dark:text-stone-400">
        <span>
          Updated {new Date(restaurant.updatedAt).toLocaleDateString()}
        </span>
        <div className="flex items-center gap-2 text-xs">
          <button
            type="button"
            className="cursor-pointer text-teal-700 hover:underline dark:text-teal-300 disabled:cursor-not-allowed"
            onClick={() => onEdit?.(restaurant.id)}
            disabled={!onEdit}
          >
            Edit
          </button>
          <button
            type="button"
            className="text-red-500 opacity-40 dark:text-red-400 disabled:cursor-not-allowed"
            onClick={() => onDelete?.(restaurant.id)}
            disabled={!onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
