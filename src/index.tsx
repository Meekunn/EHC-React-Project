/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import reportWebVitals from "./reportWebVitals"
import App from "./App"
import "./index.scss"

const container = document.getElementById("root")
const root = createRoot(container!)
root.render(
	<StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</StrictMode>
)

reportWebVitals()
