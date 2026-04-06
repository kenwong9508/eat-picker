// src/routes/Router.tsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainLayout } from "../layout/MainLayout";
import { routes } from "./config";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: routes.map((route) => ({
      path: route.path === "/" ? "" : route.path.replace(/^\//, ""),
      element: route.element,
    })),
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
