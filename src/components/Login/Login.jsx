
import React, { useContext, useState } from "react";
import useAppContext from "../../store/AppContext";
import { Link, useNavigate } from "react-router-dom";
import styles from "./login.module.css"


export const Login = () => {

	const { store, actions } = useAppContext();
	const { email, password } = store;
    const navigate = useNavigate();

	const logIn = async (email, password) => {
		await actions.logIn(email, password);
		navigate('/in');
	}

	const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            actions.logIn(email, password);
        }
    };



	return (

			<div className={`${styles.log_in_container} text-center`}>
				<div className="mt-2">
					<img src={''} className="w-75" alt="" />
				</div>
				<p className="fs-2 text-light">¡Hola de nuevo!</p>
				<p className="text-secondary">Bienvenido otra vez</p>
				<div>
					<div className="d-flex flex-column gap-4 mt-4">
						<input type="email" className="form-control" placeholder="Email" aria-label="Email" aria-describedby="basic-addon1"  onChange={(e) => actions.setEmail(e.target.value)} value={email}/>
						<input type="password" className="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1" onChange={(e) => actions.setPassword(e.target.value)} value={password} onKeyDown={handleKeyDown}/>
						<button onClick={() => logIn(email, password)} className="btn btn-primary fs-3 fw-bolder">Entrar</button>
						<p className="text-secondary pb-5">¿Has olvidado tu contraseña? <Link to="/signup" className="text-danger fw-bold text-decoration-none">Recuperar</Link></p>
					</div>
				</div>

			</div>
	);
};
