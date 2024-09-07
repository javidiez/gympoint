
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar";
import useAppContext from "../../store/AppContext";
import bodyPump from "../../assets/img/body-pump.jpg"
import { Disciplines } from "../Disciplines/Disciplines";




export const Admin = () => {

    const { store } = useAppContext();
    const { token, role, classes, disciplines, inscriptions, rooms, gyms, teachers } = store;
    const navigate = useNavigate();

    useEffect(() => {
        if (!token || role === "user") {
            navigate('/');
        }
    }, [token])

    const deleteDiscipline = async (id) => {
        await actions.deleteDiscipline(id);
    };

    const editDiscipline = (id) => {
        actions.editDiscipline(id);
        navigate('/edit_discipline');
    };

    return (
        <>
            <Navbar />
            <div className="container">
                <ul className="nav nav-pills mb-3 mt-5 d-flex gap-4" id="pills-tab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="btn btn-secondary active fs-4" id="pills-classes-tab" data-bs-toggle="pill" data-bs-target="#pills-classes" type="button" role="tab" aria-controls="pills-classes" aria-selected="true">Clases</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="btn btn-secondary fs-4" id="pills-inscriptions-tab" data-bs-toggle="pill" data-bs-target="#pills-inscriptions" type="button" role="tab" aria-controls="pills-inscriptions" aria-selected="true">Reservas</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="btn btn-secondary fs-4" id="pills-disciplines-tab" data-bs-toggle="pill" data-bs-target="#pills-disciplines" type="button" role="tab" aria-controls="pills-disciplines" aria-selected="true">Disciplinas</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="btn btn-secondary fs-4" id="pills-teachers-tab" data-bs-toggle="pill" data-bs-target="#pills-teachers" type="button" role="tab" aria-controls="pills-teachers" aria-selected="false">Equipo humano</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="btn btn-secondary fs-4" id="pills-rooms-tab" data-bs-toggle="pill" data-bs-target="#pills-rooms" type="button" role="tab" aria-controls="pills-rooms" aria-selected="false">Salas</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="btn btn-secondary fs-4" id="pills-gyms-tab" data-bs-toggle="pill" data-bs-target="#pills-gyms" type="button" role="tab" aria-controls="pills-gyms" aria-selected="false">Centros</button>
                    </li>
                </ul>
                <div className="tab-content" id="pills-tabContent">
                    <div className="tab-pane fade show active" id="pills-classes" role="tabpanel" aria-labelledby="pills-classes-tab" tabIndex="0">
                        <div className="d-flex align-items-center">
                            <p className='text-light my-5 fs-1 fw-bold'>Clases</p>
                            <button className="btn btn-warning fs-5 ms-5 p-0 px-2 py-1">Crear</button>
                        </div>
                        <table className='table table-striped table-hover table-dark'>
                            <thead>
                                <tr className="fs-5">
                                    <th className='text-light'>#</th>
                                    <th className='text-light'>Esfuerzo (sacar palabra)</th>
                                    <th className='text-light'>Disciplina</th>
                                    <th className='text-light'>Horario</th>
                                    <th className='text-light'>Sala</th>
                                    <th className='text-light'>Profesor</th>
                                </tr>
                            </thead>
                            <tbody>
                                {classes.map((class_, index) => (
                                    <tr key={class_.id}>
                                        <td>
                                            <span className='text-light'>{index + 1}</span>
                                        </td>
                                        <td>
                                            <span className='text-light'>{class_.name}</span>
                                        </td>
                                        <td>
                                            <span className='text-light'>{class_.is_admin ? <b>Administrador</b> : <b>Usuario</b>}</span>
                                        </td>
                                        <td className='text-end'>
                                            <span onClick={() => deleteDiscipline(class_.id)} className="material-symbols-outlined text-light me-2 delete-icon">
                                                delete
                                            </span>
                                            <span onClick={() => editDiscipline(class_.id)} className="material-symbols-outlined text-light delete-icon">
                                                edit
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
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
                    <div className="tab-pane fade" id="pills-disciplines" role="tabpanel" aria-labelledby="pills-disciplines-tab" tabIndex="0">
                        <div className="d-flex align-items-center">
                            <p className='text-light my-5 fs-1 fw-bold'>Disciplinas</p>
                            <button className="btn btn-warning fs-5 ms-5 p-0 px-2 py-1">Crear</button>
                        </div>
                        <table className='table table-striped table-hover table-dark'>
                            <thead>
                                <tr className="fs-5">
                                    <th className='text-light'>#</th>
                                    <th className='text-light'>Imagen</th>
                                    <th className='text-light'>Nombre</th>
                                    <th className='text-light'>Esfuerzo</th>

                                </tr>
                            </thead>
                            <tbody>
                                {disciplines.map((discipline, index) => (
                                    <tr key={class_.id}>
                                        <td>
                                            <span className='text-light'>{index + 1}</span>
                                        </td>
                                        <td>
                                            <span className='text-light'>{discipline.name}</span>
                                        </td>
                                        <td>
                                            <span className='text-light'>{discipline.is_admin ? <b>Administrador</b> : <b>Usuario</b>}</span>
                                        </td>
                                        <td className='text-end'>
                                            <span onClick={() => deleteDiscipline(discipline.id)} className="material-symbols-outlined text-light me-2 delete-icon">
                                                delete
                                            </span>
                                            <span onClick={() => editDiscipline(discipline.id)} className="material-symbols-outlined text-light delete-icon">
                                                edit
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="tab-pane fade" id="pills-teachers" role="tabpanel" aria-labelledby="pills-teachers-tab" tabIndex="0">
                        <div className="d-flex align-items-center">
                            <p className='text-light my-5 fs-1 fw-bold'>Equipo humano</p>
                            <button className="btn btn-warning fs-5 ms-5 p-0 px-2 py-1">Crear</button>
                        </div>
                        <table className='table table-striped table-hover table-dark'>
                            <thead>
                                <tr className="fs-5">
                                    <th className='text-light'>#</th>
                                    <th className='text-light'>Imagen</th>
                                    <th className='text-light'>Nombre</th>
                                </tr>
                            </thead>
                            <tbody>
                                {teachers.map((teacher, index) => (
                                    <tr key={teacher.id}>
                                        <td>
                                            <span className='text-light'>{index + 1}</span>
                                        </td>
                                        <td>
                                            <span className='text-light'>{teacher.name}</span>
                                        </td>
                                        <td>
                                            <span className='text-light'>{teacher.is_admin ? <b>Administrador</b> : <b>Usuario</b>}</span>
                                        </td>
                                        <td className='text-end'>
                                            <span onClick={() => deleteDiscipline(teacher.id)} className="material-symbols-outlined text-light me-2 delete-icon">
                                                delete
                                            </span>
                                            <span onClick={() => editDiscipline(teacher.id)} className="material-symbols-outlined text-light delete-icon">
                                                edit
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="tab-pane fade" id="pills-rooms" role="tabpanel" aria-labelledby="pills-rooms-tab" tabIndex="0">
                        <div className="d-flex align-items-center">
                            <p className='text-light my-5 fs-1 fw-bold'>Salas</p>
                            <button className="btn btn-warning fs-5 ms-5 p-0 px-2 py-1">Crear</button>
                        </div>
                        <table className='table table-striped table-hover table-dark'>
                            <thead>
                                <tr className="fs-5">
                                    <th className='text-light'>#</th>
                                    <th className='text-light'>Nombre</th>
                                    <th className='text-light'>Capacidad</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rooms.map((room, index) => (
                                    <tr key={room.id}>
                                        <td>
                                            <span className='text-light'>{index + 1}</span>
                                        </td>
                                        <td>
                                            <span className='text-light'>{room.name}</span>
                                        </td>
                                        <td>
                                            <span className='text-light'>{room.is_admin ? <b>Administrador</b> : <b>Usuario</b>}</span>
                                        </td>
                                        <td className='text-end'>
                                            <span onClick={() => deleteDiscipline(room.id)} className="material-symbols-outlined text-light me-2 delete-icon">
                                                delete
                                            </span>
                                            <span onClick={() => editDiscipline(room.id)} className="material-symbols-outlined text-light delete-icon">
                                                edit
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="tab-pane fade" id="pills-gyms" role="tabpanel" aria-labelledby="pills-gyms-tab" tabIndex="0">
                        <div className="d-flex align-items-center">
                            <p className='text-light my-5 fs-1 fw-bold'>Centros</p>
                            <button className="btn btn-warning fs-5 ms-5 p-0 px-2 py-1">Crear</button>
                        </div>
                        <table className='table table-striped table-hover table-dark'>
                            <thead>
                                <tr className="fs-5">
                                    <th className='text-light'>#</th>
                                    <th className='text-light'>Nombre</th>
                                    <th className='text-light'>Calle</th>
                                    <th className='text-light'>Provincia</th>
                                    <th className='text-light'>Teléfono</th>
                                </tr>
                            </thead>
                            <tbody>
                                {gyms.map((gym, index) => (
                                    <tr key={gym.id}>
                                        <td>
                                            <span className='text-light'>{index + 1}</span>
                                        </td>
                                        <td>
                                            <span className='text-light'>{gym.name}</span>
                                        </td>
                                        <td>
                                            <span className='text-light'>{gym.is_admin ? <b>Administrador</b> : <b>Usuario</b>}</span>
                                        </td>
                                        <td className='text-end'>
                                            <span onClick={() => deleteDiscipline(gym.id)} className="material-symbols-outlined text-light me-2 delete-icon">
                                                delete
                                            </span>
                                            <span onClick={() => editDiscipline(gym.id)} className="material-symbols-outlined text-light delete-icon">
                                                edit
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </>
    )
}
