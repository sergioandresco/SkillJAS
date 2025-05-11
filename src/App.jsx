import { Routes, Route } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SignIn, SignUp, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import HomePage from "./views/home";
import Dashboard from "./views/dashboard";
import Unauthorized from "./views/unauthorized";
import ProtectedRoute from "./protectedRoute";
import { MenuProvider } from './context/MenuContext';
import Categories from "./components/categories";
import Welcome from "./components/welcome";
import AddVideo from "./components/addVideo";

const router = createBrowserRouter([
	{
	  path: "/",
	  element: <HomePage />,
	},
	{
	  path: "/sign-in/*",
	  element: (
		<SignIn
		  routing="path"
		  path="/sign-in"
		/>
	  ),
	},
	{
	  path: "/sign-up/*",
	  element: (
		<SignUp
		  routing="path"
		  path="/sign-up"
		/>
	  ),
	},
	{
	  path: "/dashboard",
	  element: (
		<ProtectedRoute allowedRoles={["user", "admin"]}>
		  <MenuProvider>
			<Dashboard />
		  </MenuProvider>
		</ProtectedRoute>
	  ),
	  children: [
		{
			index: true,
			element: <Welcome />
		},
		{
			path: "categories",
			element: <Categories />
		},
		{
			path: "add-video",
			element: <AddVideo />
		},
	  ]
	},
	{
	  path: "/unauthorized",
	  element: <Unauthorized />,
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App
