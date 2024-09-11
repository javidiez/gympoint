
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar";
import useAppContext from "../../store/AppContext";
import styles from "./gyms.module.css"

export const Gyms = () => {

    const { store, actions } = useAppContext();
    const { token, gyms } = store;
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/');
        }
    }, [token])

    useEffect(() => {
        if (gyms.length === 0) {
            actions.getGyms();
        }
    }, [gyms, actions]);

    const handleAdmin = () => {
        navigate('/admin')
    }

    return (
        <>
            <Navbar buttonAdmin={<button onClick={handleAdmin} className="btn btn-danger me-2">Administrador</button>} />
            <div className="container pb-5">
                <h1 className="mb-5">Mi gimnasio</h1>
                <div className="border rounded p-4">
                    {gyms?.map((gym, index) => (
                        <div key={index} className="d-flex gap-4">
                            <div>
                            <img src={gym.logo} className={styles.logo} />
                            </div>
                            <div>
                            <p className="display-5">{gym.name}</p>
                            <p className="fs-4 ">{gym.location}</p>
                            <p className="fs-4">{gym.street}</p>
                            <p className="fs-4">{gym.phone}</p>
                            
                            </div>
                            
                        </div>
                    ))}
                </div>
            </div>

        </>
    )
}
