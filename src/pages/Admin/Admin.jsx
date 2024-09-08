
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
                <ClassAdmin/>
                    <div className="tab-pane fade" id="pills-inscriptions" role="tabpanel" aria-labelledby="pills-inscriptions-tab" tabIndex="0">
                        <div className="d-flex align-items-center">
                            <p className='text-light my-5 fs-1 fw-bold'>Reservas</p>
                            <button className="btn btn-warning fs-5 ms-5 p-0 px-2 py-1">Crear</button>
                        </div>
                        <table className='table table-striped table-hover table-dark'>
                            <thead>
                                <tr className="fs-5">
                                    <th className='text-light'>#</th>
                                    <th className='text-light'>Disciplina</th>
                                    <th className='text-light'>Horario</th>
                                    <th className='text-light'>Sala</th>
                                    <th className='text-light'>Usuario</th>
                                </tr>
                            </thead>
                            <tbody>
                                {inscriptions.map((inscription, index) => (
                                    <tr key={inscription.id}>
                                        <td>
                                            <span className='text-light'>{index + 1}</span>
                                        </td>
                                        <td>
                                            <span className='text-light'>{inscription.name}</span>
                                        </td>
                                        <td>
                                            <span className='text-light'>{inscription.is_admin ? <b>Administrador</b> : <b>Usuario</b>}</span>
                                        </td>
                                        <td className='text-end'>
                                            <span onClick={() => deleteDiscipline(inscription.id)} className="material-symbols-outlined text-light me-2 delete-icon">
                                                delete
                                            </span>
                                            <span onClick={() => editDiscipline(inscription.id)} className="material-symbols-outlined text-light delete-icon">
                                                edit
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                        <DisciplineAdmin/>
                        <TeachersAdmin/>
                        <RoomsAdmin/>
                        <GymsAdmin/>
                </div>
            </div>

        </>
    )
}
