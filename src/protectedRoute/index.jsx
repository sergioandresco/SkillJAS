import { SignedIn, SignedOut, RedirectToSignIn, useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
	const { user, isLoaded } = useUser();
	const role = user?.publicMetadata?.role || "user";

	if (!isLoaded) return null; // o un spinner si prefieres

	if (allowedRoles && !allowedRoles.includes(role)) {
		return <Navigate to="/unauthorized" />;
	}

	return (
		<>
			<SignedIn>{children}</SignedIn>
			<SignedOut>
				<RedirectToSignIn />
			</SignedOut>
		</>
	);
};

export default ProtectedRoute;