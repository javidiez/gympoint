
import React, { useState } from "react";
import useAppContext from "../../store/AppContext";
import { Link, useNavigate } from "react-router-dom";
import styles from "./login.module.css"


export const Login = () => {

    const navigate = useNavigate();



	return (

			<div className={`${styles.log_in_container} text-center`}>
				<div className="mt-2">
					<img src={''} className="w-75" alt="" />
				</div>
				<p className="fs-2 text-light">¡Hola de nuevo!</p>
				<p className="text-secondary">Bienvenido otra vez</p>
				<div>
					<div className="d-flex flex-column gap-4 mt-4">
						<input type="email" className="form-control" placeholder="Email" aria-label="Email" aria-describedby="basic-addon1"  onChange={""} value={""}/>
						<input type="password" className="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1" onChange={""} value={""}/>
						<button onClick={""} className="btn btn-primary fs-3 fw-bolder">Log In</button>
						<p className="text-secondary pb-5">¿Has olvidado tu contraseña? <Link to="/signup" className="text-danger fw-bold text-decoration-none">Recuperar</Link></p>
					</div>
				</div>

			</div>
	);
};
