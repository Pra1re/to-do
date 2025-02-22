
import { createBrowserRouter } from "react-router-dom";

import Home from "../home";
 
import Layout from "../Layout";

import Login from "../login";
import Register from "../register";
import Privaterouter from "./privaterouter";
import Forget from "../forget";
import DynamicTitle from "../dynamictitle";
import NotFound from "../notfound";

const Router = createBrowserRouter([
  {
    path: "/",
    element:<Layout />, 
    children: [
      { path: "/", element:<DynamicTitle title="Home"><Privaterouter><Home /> </Privaterouter> </DynamicTitle>},
      {path:"/login",element:<DynamicTitle title="Login"><Login></Login></DynamicTitle>},
      {path:"/register",element:<DynamicTitle title="Register"><Register /></DynamicTitle>},
      {path:"/forget",element:<Forget />},

      {
        path: "*",
        element:<DynamicTitle title="NotFound"><NotFound /></DynamicTitle>, 
    
    
      },
    ],



  },


  
]);

export default Router;
