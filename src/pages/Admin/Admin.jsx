
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar";
import useAppContext from "../../store/AppContext";
import bodyPump from "../../assets/img/body-pump.jpg"
import { Disciplines } from "../Disciplines/Disciplines";
import styles from "./admin.module.css"
import { DisciplineAdmin } from "../../components/DisciplinesAdmin/DisciplinesAdmin";
import { TeachersAdmin } from "../../components/TeachersAdmin/TeachersAdmin";
import { RoomsAdmin } from "../../components/RoomsAdmin/RoomsAdmin";
import { GymsAdmin } from "../../components/GymsAdmin/GymsAdmin";
import { ClassAdmin } from "../../components/ClassAdmin/ClassAdmin";
import { InscriptionAdmin } from "../../components/InscriptionsAdmin/InscriptionsAdmin";



export const Admin = () => {

    const { store, actions } = useAppContext();
    const { token, role, classes, inscriptions, rooms, gyms } = store;
    const navigate = useNavigate();

    useEffect(() => {
        if (!token || role === "user") {
            navigate('/');
        }
    }, [token])


    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            const element = document.getElementById(hash.substring(1));
            if (element) {
                element.scrollIntoView();
            }
        }
    }, []);



    return (
        <>
            <Navbar />
            <div className="container">
                <ul className="nav nav-pills mt-5 d-flex gap-2" id="pills-tab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="btn btn-secondary active fs-5 mb-2" id="pills-classes-tab" data-bs-toggle="pill" data-bs-target="#pills-classes" type="button" role="tab" aria-controls="pills-classes" aria-selected="true">Clases</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="btn btn-secondary fs-5" id="pills-inscriptions-tab" data-bs-toggle="pill" data-bs-target="#pills-inscriptions" type="button" role="tab" aria-controls="pills-inscriptions" aria-selected="true">Reservas</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <Link to="/admin#discipline" className="btn btn-secondary fs-5" id="pills-disciplines-tab" data-bs-toggle="pill" data-bs-target="#pills-disciplines" type="button" role="tab" aria-controls="pills-disciplines" aria-selected="true">Disciplinas</Link>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="btn btn-secondary fs-5" id="pills-teachers-tab" data-bs-toggle="pill" data-bs-target="#pills-teachers" type="button" role="tab" aria-controls="pills-teachers" aria-selected="false">Equipo humano</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="btn btn-secondary fs-5" id="pills-rooms-tab" data-bs-toggle="pill" data-bs-target="#pills-rooms" type="button" role="tab" aria-controls="pills-rooms" aria-selected="false">Salas</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="btn btn-secondary fs-5" id="pills-gyms-tab" data-bs-toggle="pill" data-bs-target="#pills-gyms" type="button" role="tab" aria-controls="pills-gyms" aria-selected="false">Centros</button>
                    </li>
                </ul>
                <div className="tab-content" id="pills-tabContent">
                    <ClassAdmin />
                    <InscriptionAdmin />
                    <DisciplineAdmin />
                    <TeachersAdmin />
                    <RoomsAdmin />
                    <GymsAdmin />

                </div>
            </div>

        </>
    )
}
