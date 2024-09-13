
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar";
import useAppContext from "../../store/AppContext";
import styles from "./disciplineInfo.module.css"
import avatar from "../../assets/img/avatar.png"


export const DisciplineInfo = () => {

    const { store, actions } = useAppContext();
    const { token, disciplines, role } = store;
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (!token) {
            navigate('/');
        }
    }, [token])

    useEffect(() => {
        actions.getDisciplines()
    }, [])

    const handleAdmin = () => {
        navigate('/admin')
    }

    const discipline = disciplines.find(discipline => discipline.id === parseInt(id));

    return (
        <>
            <Navbar
                buttonAdmin={role === "admin" ? (
                    <button onClick={handleAdmin} className="btn btn-danger me-2">Administrador</button>
                ) : null}
            />
            <div className={`container ${styles.container}`}>
                {discipline ? (
                    <>
                        <h1>{discipline.name}</h1>
                        <p className="py-3 fs-5">{discipline.description}</p>
                        <p className="py-3 fs-5"><span className="fw-bold">Calorías quemadas</span>: {discipline.kal ? `${discipline.kal} por hora` :  "Sin especificar"}</p>
                        <img src={discipline.image} alt={discipline.name} className={styles.disciplineImage} />
                    </>
                ) : (
                    <p>Disciplina no encontrada</p>
                )}
            </div>
        </>
    );
};
