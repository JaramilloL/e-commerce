import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Shoping from "../pages/Shoping";
import Card from "../pages/Card";
import AddProductAdmin from "../pages/AddProductAdmin";
// en este archivo se trabajajaran las rutas de la app

export const routes = createBrowserRouter([
    { 
        path: '/login',
        element: <Login/>
    },
    {
        path: '/register',
        element: <Register/>
    },
    {
        path: '/home',
        element: <Home/>
    },
    {
        path: '/shoping',
        element: <Shoping/>
    },
    {
        path: '/card',
        element: <Card/>
    },
    {
        path: '/admin',
        element: <AddProductAdmin/>
    },
    {
        path: '/*',
        element: <Navigate to={'/home'}/>
    }
])