import { lazy } from "react";

export const public_routes = [
  {
    path: "/",
    exact: true,
    Component: lazy(() => import("../pages/landing")),
  },
  {
    path: "/about",
    exact: true,
    Component: lazy(() => import("../pages/about")),
  },
  {
    path: "/contact",
    exact: true,
    Component: lazy(() => import("../pages/contact")),
  },
  {
    path: "/privacy",
    exact: true,
    Component: lazy(() => import("../pages/privacy")),
  },
  {
    path: "/products",
    exact: true,
    Component: lazy(() => import("../pages/products")),
  },
  {
    path: "/terms",
    exact: true,
    Component: lazy(() => import("../pages/terms")),
  },
];

export const protectedRoutes = [
  {
    path: "/products/:id",
    exact: true,
    Component: lazy(() => import("../pages/product")),
  },
  {
    path: "/compare",
    exact: true,
    Component: lazy(() => import("../pages/compare")),
  },
];
