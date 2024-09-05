import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home/Home";

const App = () => {

	return (
		<div>
			<BrowserRouter>
					<Routes>
            <Route path="" element={<Home />} />
						<Route path="/" element={<Home />} />
						<Route path="/home" element={<Home />} />
						<Route path="/index.html" element={<Home />} />
					</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;
