import { useState } from "react";
import {
  useRestaurantsQuery,
  useCreateRestaurantMutation,
  useDeleteRestaurantMutation,
} from "../hooks/useRestaurants";
import { RestaurantForm, RestaurantFormValues } from "./RestaurantForm";
import type { Restaurant } from "../api/restaurants";

export function RestaurantsPage() {
  const { data, isLoading, isError } = useRestaurantsQuery();
  const createMutation = useCreateRestaurantMutation();
  const deleteMutation = useDeleteRestaurantMutation();
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = async (values: RestaurantFormValues) => {
    await createMutation.mutateAsync(values);
    setIsCreating(false);
  };

  const handleDelete = async (restaurant: Restaurant) => {
    if (!window.confirm(`Delete restaurant "${restaurant.name}"?`)) return;
    await deleteMutation.mutateAsync(restaurant.id);
  };

  return (
    <div>Restaurants Page</div>
    // <div>
    //   <h1>Restaurants</h1>

    //   <button onClick={() => setIsCreating(true)}>Create Restaurant</button>

    //   {isCreating && (
    //     <div style={{ marginTop: "16px" }}>
    //       <h2>Create</h2>
    //       <RestaurantForm
    //         defaultValues={{
    //           name: "",
    //           avgPrice: 100,
    //           speed: "medium",
    //           cuisine: "chinese",
    //           takeaway: true,
    //           dineIn: true,
    //           active: true,
    //           address: "",
    //         }}
    //         onSubmit={handleCreate}
    //         onCancel={() => setIsCreating(false)}
    //       />
    //     </div>
    //   )}

    //   {isLoading && <p>Loading...</p>}
    //   {isError && <p>Failed to load restaurants.</p>}

    //   <table
    //     style={{ marginTop: "16px", width: "100%", borderCollapse: "collapse" }}
    //   >
    //     <thead>
    //       <tr>
    //         <th>Name</th>
    //         <th>Avg Price</th>
    //         <th>Cuisine</th>
    //         <th>Speed</th>
    //         <th>Takeaway</th>
    //         <th>Dine In</th>
    //         <th>Active</th>
    //         <th>Address</th>
    //         <th>Actions</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {/* {data?.map((r) => (
    //         <tr key={r.id}>
    //           <td>{r.name}</td>
    //           <td>{r.avgPrice}</td>
    //           <td>{r.cuisine}</td>
    //           <td>{r.speed}</td>
    //           <td>{r.takeaway ? "Yes" : "No"}</td>
    //           <td>{r.dineIn ? "Yes" : "No"}</td>
    //           <td>{r.active ? "Yes" : "No"}</td>
    //           <td>{r.address}</td>
    //           <td>
    //             <button onClick={() => handleDelete(r)}>Delete</button>
    //           </td>
    //         </tr>
    //       ))} */}
    //     </tbody>
    //   </table>
    // </div>
  );
}
