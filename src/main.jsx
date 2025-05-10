import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from "@clerk/clerk-react";
import { shadesOfPurple } from '@clerk/themes'
import { esMX } from '@clerk/localizations'
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/index.js";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<ClerkProvider
			appearance={{
				baseTheme: shadesOfPurple,
			}}
			publishableKey={clerkPubKey}
			localization={esMX}
			signUpFallbackRedirectUrl="/dashboard"
      		signInFallbackRedirectUrl="/dashboard"
		>
			<ThemeProvider theme={theme}>
				<App />
			</ThemeProvider>
		</ClerkProvider>
	</StrictMode>,
)