import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { LoggedHome } from "./pages/LoggedHome/LoggedHome";
import { Disciplines } from "./pages/Disciplines/Disciplines";
import { Admin } from "./pages/Admin/Admin";
import { MyInscriptions } from "./pages/MyInscriptions/MyInscriptions";

const App = () => {

	const NotFoundRedirect = () => {
		const navigate = useNavigate();

		useEffect(() => {
			// Redirige a la página de perfil si la ruta no existe
			navigate('/in');
		}, [navigate]);

		return null; 
	};

	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path="" element={<Home />} />
					<Route path="/" element={<Home />} />
					<Route path="/home" element={<Home />} />
					<Route path="/index.html" element={<Home />} />
					<Route path="/in" element={<LoggedHome />} />
					<Route path="/disciplines" element={<Disciplines />} />
					<Route path="/admin" element={<Admin />} />
					<Route path="/my-inscriptions" element={<MyInscriptions />} />
					<Route path="*" element={<NotFoundRedirect />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;
