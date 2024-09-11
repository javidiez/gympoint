
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./navbar.module.css"
import useAppContext from "../../store/AppContext";
import logo from "../../assets/img/logo_gym.png"




export const Navbar = ({buttonAdmin}) => {

    const { store, actions } = useAppContext();
    const { username } = store;
    const navigate = useNavigate();

    const logOut = () => {
        actions.logOut()
        navigate('/')
    }

    const closeOffcanvasAndNavigate = (path) => {
        // Cierra el offcanvas manualmente usando JavaScript puro
        const offcanvasElement = document.getElementById('offcanvasRight');
        offcanvasElement.classList.remove('show');
        offcanvasElement.setAttribute('aria-hidden', 'true');
        offcanvasElement.setAttribute('style', 'visibility: hidden;');
        
        const backdrop = document.querySelector('.offcanvas-backdrop');
        if (backdrop) {
            backdrop.remove();
        }

        navigate(path);
    };

    const handleAdmin = () => {
        navigate('/admin')
    }

    return (
        <>
        <div className="d-flex align-items-center justify-content-between mx-2">
            <button className="btn btn-dark my-4" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"><span className="material-symbols-outlined fs-1">
                menu
            </span></button>
            <div className={styles.logo_text}>
                <div className="d-flex align-items-center">
                    {buttonAdmin}
                    <p className="text-light text-nowrap fs-3 fw-bold">Gym Point</p>
                    <img src={logo} className={styles.logo} />
                </div>
            </div>
            </div>


            <div className="offcanvas offcanvas-start border-end bg-dark" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title text-light fs-4" id="offcanvasRightLabel">Bienvenid@ {username}</h5>
                    <button type="button" className="btn-close bg-secondary" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body text-light mt-4">
                    <ul className={`${styles.menu} fs-4 d-flex flex-column gap-4 list-group`}>
                        <li className="d-flex" onClick={() => closeOffcanvasAndNavigate('/in')}>
                           
                                <span className="material-symbols-outlined fs-2 me-3">
                                    home
                                </span>
                                <span>Inicio</span>
                            
                        </li>
                        <li className="d-flex" onClick={() => closeOffcanvasAndNavigate('/in')}>
                            <span className="material-symbols-outlined fs-2 me-3">
                                calendar_month
                            </span>
                            <span>Reservar</span>
                        </li>
                        <li className="d-flex" onClick={() => closeOffcanvasAndNavigate('/in')}>
                            <span className="material-symbols-outlined fs-2 me-3">
                                fitness_center
                            </span>
                            <span>Clases</span>
                        </li>
                        <li className="d-flex" onClick={() => closeOffcanvasAndNavigate('/disciplines')}>
                                <span className="material-symbols-outlined fs-2 me-3">
                                    directions_bike
                                </span>
                                <span>Disciplinas</span>
                        </li>
                        <li className="d-flex" onClick={() => closeOffcanvasAndNavigate('/in')}>
                            <span className="material-symbols-outlined fs-2 me-3">
                                accessibility_new
                            </span>
                            <span>Equipo humano</span>
                        </li>
                        <li className="d-flex" onClick={() => closeOffcanvasAndNavigate('/in')}>
                            <span className="material-symbols-outlined fs-2 me-3">
                                person
                            </span>
                            <span>Mi Perfil</span>
                        </li>
                    </ul>
                </div>
                <div className="footer">
                    <hr className="text-secondary" />
                    <div className="d-flex align-items-center mb-3 btn" onClick={logOut} data-bs-dismiss="offcanvas">
                        <span className={`${styles.logout} material-symbols-outlined ms-2`}>
                            power_settings_new
                        </span>
                        <p className={`btn ${styles.logout} fs-4`}>Cerrar sesión</p>
                    </div>
                </div>
            </div>
        </>
    )
}
