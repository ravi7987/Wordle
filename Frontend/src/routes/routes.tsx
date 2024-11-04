import React from "react";
import { RouteObject, Navigate } from "react-router-dom";

import App from "../views/app.tsx";
import Options from "../views/options.tsx";
import ConventionalWordle from "../views/conventionalWordle.tsx";
import AdvancedWordle from "../views/advancedWordle.tsx";
import Settings from "../views/settings.tsx";

const AppRoutes = () => {
  const routes: RouteObject[] = [
    {
      path: "/",
      element: <App />,
      children: [
        { path: "", element: <Navigate to="/options" /> },
        { path: "options", element: <Options /> },
        { path: "conventional", element: <ConventionalWordle /> },
        { path: "advanced", element: <AdvancedWordle /> },
        { path: "settings", element: <Settings /> },
      ],
    },
  ];
  return routes;
};

export default AppRoutes;
