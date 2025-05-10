import { Routes, Route } from "react-router-dom";
import { SignIn, SignUp, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import HomePage from "./views/home";
import Dashboard from "./views/dashboard";

const ProtectedRoute = ({ children }) => {
	return (
		<>
			<SignedIn>{children}</SignedIn>
			<SignedOut>
				<RedirectToSignIn />
			</SignedOut>
		</>
	);
};

function App() {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route 
				path="/sign-in/*" 
				element={
					<SignIn
						routing="path" 
						path="/sign-in"
					/>
				} 
			/>
      		<Route path="/sign-up/*" element={<SignUp routing="path" path="/sign-up" />} />

			<Route
				path="/dashboard"
				element={
					<ProtectedRoute>
						<Dashboard />
					</ProtectedRoute>
				}
			/>
		</Routes>
	)
}

export default App
