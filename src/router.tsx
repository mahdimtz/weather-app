import { createBrowserRouter } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import WeatherDetail from "./pages/WeatherDetail";
const router = createBrowserRouter([
  
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "detail/:date",        
    element: <WeatherDetail />,
  }
]);

export default router;
