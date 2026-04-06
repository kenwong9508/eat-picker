// src/routes/config.ts
import type { ReactElement } from "react";
import { RecommendPage } from "../pages/RecommendPage";
import { RestaurantsPage } from "../pages/RestaurantsPage";

export type AppRoute = {
  name: string;
  path: string;
  element: ReactElement;
  showInMenu?: boolean;
  hint?: string;
};

export const routes: AppRoute[] = [
  {
    name: "Recommend",
    path: "/",
    element: <RecommendPage />,
    showInMenu: true,
    hint: "Pick tonight's meal",
  },
  {
    name: "Restaurants",
    path: "/restaurants",
    element: <RestaurantsPage />,
    showInMenu: true,
    hint: "Manage your restaurant list",
  },
];
