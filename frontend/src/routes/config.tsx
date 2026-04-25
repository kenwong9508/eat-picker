// src/routes/config.ts
import type { ReactElement } from "react";
import { lazy } from "react";

// Recommend 首屏，照樣直接 import
import { RecommendPage } from "../pages/RecommendPage";

// Restaurants 做 lazy load
const RestaurantsPage = lazy(() =>
  import("../pages/RestaurantsPage").then((module) => ({
    default: module.RestaurantsPage,
  })),
);

export type AppRoute = {
  name: string;
  path: string;
  element: ReactElement;
  showInMenu?: boolean;
  hint?: string;
};

export const routes: AppRoute[] = [
  {
    name: "Recommendtest999",
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
