// {
//     element: <IdentityLayout />,
//     children: [
//       {
//         path: "login",
//         element: <Login />,
//         action: loginAction,
//         errorElement: <Login />,
//       },
//       {
//         path: "register",
//         element: <Register />,
//         action: registerAction,
//         errorElement: <Register />,
//       },
//     ],

import { createBrowserRouter } from "react-router-dom";
import IdentityLayout from "./layouts/identityLayout";
import Login from "./components/features/identity/login";
import Dashboard from "./pages/Dashboard";

//   },
  const router = createBrowserRouter([
   
   
    
          {
            element: <IdentityLayout />,
            children: [
             {
               
            element: <Login />,
            index:true
             
            },]
          },
          {
            path: "dashboard",
            element: <Dashboard />,
          },
  ]);

  export default router