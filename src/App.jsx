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
import CourseByCategory from "./pages/courseByCategory";
import VideoDetail from "./pages/videoDetail";
import AdminVideos from "./components/adminVideos";
import FavoriteVideos from "./pages/favorites";
import AddDocumentation from "./components/addDocumentation";
import Documentations from "./pages/documentations";
import AdminDocumentations from "./components/adminDocumentations";

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
			path: "courses",
			element: <Categories />
		},
		{
			path: "course/category/:category",
			element: <CourseByCategory />
		},
		{
			path: "course/video/:id",
			element: <VideoDetail />
		},
		{
			path: "add-video",
			element: <AddVideo />
		},
		{
			path: "admin-videos",
			element: <AdminVideos />
		},
		{
			path: "favorites",
			element: <FavoriteVideos />
		},
		{
			path: "add-documentation",
			element: <AddDocumentation />
		},
		{
			path: "documentations",
			element: <Documentations />
		},
		{
			path: "admin-documentations",
			element: <AdminDocumentations />
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
