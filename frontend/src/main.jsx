import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Login from "./routes/Login.jsx";
import Discover from "./routes/Discover";
import Register from "./routes/Register.jsx";
import MyRecipes from "./routes/MyRecipes.jsx";
import AdminDashboard from "./routes/AdminDashboard";
import Create from "./routes/Create";
import Hero from "./routes/Hero.jsx";
import RecipeDetailPage from "./components/RecipeDetailpage.jsx";
import AuthProvider from "./components/AuthProvider.jsx";
import ErrorPage from "./components/ErrorPage.jsx";

// Routes
// If you want to use the Navbar add your component to children, otherwise add it to the end of the list as a new object.
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/discover",
        element: <Discover />,
      },
      {
        path: "/admin",
        element: <AdminDashboard />,
      },
      {
        path: "/create",
        element: <Create />,
      },
      {
        path: "/",
        element: <Hero />,
      },
      {
        path: "/my-recipes",
        element: <MyRecipes />,
      },
      {
        path: "/recipe/:id",
        element: <RecipeDetailPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "*", // Catch-all route
    element: <ErrorPage code={404} message="Not Found" />, // Render the Error404 component
  },
]);

// Render the app
const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(
  <AuthProvider>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </AuthProvider>
);
