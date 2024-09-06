
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Login } from "../../components/Login/Login";
import { SignUp } from "../../components/Signup/Signup";
import logo from "../../assets/img/logo_gym.png"
import styles from "./home.module.css"
import useAppContext from "../../store/AppContext";


export const Home = () => {

    const { store } = useAppContext();
    const { token } = store;
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
          navigate('/profile');
        }
      }, [token])

    return (
        <div className="pt-5 container d-flex justify-content-center">
            <div className="d-flex flex-column">
                <div className="d-flex flex-column mb-5 text-light align-items-center">
                <img src={logo} className={styles.logo}/>
                <p className="display-5 fw-bold">Gym Point</p>
                </div>
           <ul className={`nav nav-pills d-flex justify-content-center ${styles.pills}`} id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className={`nav-link active fs-5 text-light ${styles.active}`} id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Iniciar sesión</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link fs-5 text-light" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Registrarse</button>
                </li>
            </ul>
            <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabIndex="0">
                    <Login />

                </div>
                <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabIndex="0">
                    <SignUp/>
                </div>

            </div>
            </div>

        </div>
    )
}
