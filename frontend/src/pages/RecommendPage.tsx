import { useState } from "react";
import { useRecommendRestaurant } from "../hooks/useRecommend";
import type { Cuisine } from "../api/restaurants";

export function RecommendPage() {
  const [cuisine, setCuisine] = useState<Cuisine | "">("");
  const { data, isFetching, refetch, isError } = useRecommendRestaurant(
    cuisine ? { cuisine } : {},
  );

  return (
    <div>Recommend Page</div>
    // <div>
    //   <h1>Recommend Restaurant</h1>

    //   <div style={{ marginBottom: "12px" }}>
    //     <label>Cuisine </label>
    //     <select
    //       value={cuisine}
    //       onChange={(e) => setCuisine(e.target.value as Cuisine | "")}
    //     >
    //       <option value="">Any</option>
    //       <option value="chinese">Chinese</option>
    //       <option value="japanese">Japanese</option>
    //       <option value="western">Western</option>
    //       <option value="other">Other</option>
    //     </select>

    //     <button
    //       onClick={() => refetch()}
    //       disabled={isFetching}
    //       style={{ marginLeft: 8 }}
    //     >
    //       {isFetching ? "Loading..." : "Recommend"}
    //     </button>
    //   </div>

    //   {isError && <p>Failed to fetch recommendation.</p>}

    //   {data && (
    //     <div
    //       style={{
    //         border: "1px solid #ddd",
    //         padding: "12px",
    //         borderRadius: "4px",
    //         maxWidth: 400,
    //       }}
    //     >
    //       <h2>{data.name}</h2>
    //       <p>Cuisine: {data.cuisine}</p>
    //       <p>Average Price: {data.avgPrice}</p>
    //       <p>Speed: {data.speed}</p>
    //       <p>Takeaway: {data.takeaway ? "Yes" : "No"}</p>
    //       <p>Dine In: {data.dineIn ? "Yes" : "No"}</p>
    //       <p>Address: {data.address}</p>
    //     </div>
    //   )}
    // </div>
  );
}
