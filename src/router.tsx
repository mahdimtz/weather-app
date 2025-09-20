import { createBrowserRouter } from "react-router-dom";

import Login from "./pages/login";
import Dashboard from "./pages/Dashboard";
import WeatherDetail from "./pages/WeatherDetail";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/detail/:date",        
    element: <WeatherDetail />,
  }
]);

export default router;
