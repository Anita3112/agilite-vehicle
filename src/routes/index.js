import React from "react";
import Vehicle from "../views/vehicle";
import {
  createBrowserRouter,
} from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Vehicle/>,
    }
  ]);


