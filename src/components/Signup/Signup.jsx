
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./signup.module.css"
import useAppContext from "../../store/AppContext";


export const SignUp = () => {

	const {store, actions} = useAppContext()
	const {username, email, password} = store
	const navigate = useNavigate()

	const signUp = (username, email, password) => {
		actions.signUp(username, email, password)
		actions.setUsername('')
		navigate('/in')
	}


	return (
        <div className={`${styles.sign_up_container} text-center`}>
				<div className="mt-2">
					<img src={''} className="w-75" alt="" />
				</div>
				<p className="fs-2 text-light">¡Regístrate!</p>
				<p className="text-secondary">Crea una nueva cuenta</p>
				<div>
					<div className="d-flex flex-column justify-content-center gap-4 mt-4">
						<input type="email" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" onChange={(e) => actions.setUsername(e.target.value)} value={username}/>
						<input type="email" className="form-control" placeholder="Email" aria-label="Email" aria-describedby="basic-addon1" onChange={(e) => actions.setEmail(e.target.value)} value={email}/>
						<input type="password" className="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1"  onChange={(e) => actions.setPassword(e.target.value)} value={password}/>
						<button onClick={() => signUp(username, email, password)} className="btn btn-primary fs-3 fw-bolder">Registrarse</button>
						<p className="text-secondary pb-5">¿Ya tienes una cuenta? <Link to="/login" className="text-danger fw-bold text-decoration-none">Logueate!</Link></p>
					</div>
				</div>

			</div>
	);
};
