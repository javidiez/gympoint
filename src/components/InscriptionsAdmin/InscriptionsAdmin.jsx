
import React, { useContext, useState, useEffect, useRef } from "react";
import useAppContext from "../../store/AppContext";
import { Link, useNavigate } from "react-router-dom";
import styles from "./inscriptionsAdmin.module.css"

export const InscriptionAdmin = () => {

    const { store, actions } = useAppContext();
    const { inscriptions, inscriptionUser, inscriptionClass, users, classes } = store;
    const navigate = useNavigate();


    useEffect(() => {
        actions.getInscriptions()
    }, [])

    const addInscription = async (e, class_id, user_id) => {
        e.preventDefault();

        try {
            await actions.addInscription(class_id, user_id);
            actions.setInscriptionUser('');
            actions.setInscriptionClass('');

        } catch (error) {
            console.error("Error adding inscription:", error);
        }
    };


    const deleteInscription = async (id) => {
        await actions.deleteInscription(id);
    };

    const editDiscipline = (id) => {
        actions.editDiscipline(id);
        navigate('/edit_discipline');
    };


    return (
        <div className="tab-pane fade" id="pills-inscriptions" role="tabpanel" aria-labelledby="pills-inscriptions-tab" tabIndex="0">
            <div className="d-flex align-items-center">
                <p className='text-light my-5 fs-1 fw-bold'>Reservas</p>
                <button className="btn btn-warning fs-5 ms-5 p-0 px-2 py-1" data-bs-toggle="modal" data-bs-target="#inscriptions" >Crear</button>

                <div className="modal fade" id="inscriptions" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className={`${styles.modal_shadow} modal-dialog modal-lg`}>
                        <div className="modal-content bg-dark">
                            <div className="d-flex justify-content-between p-3">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Crear reserva</h1>
                                <button type="button" className="btn btn-dark text-light fw-bold fs-5" data-bs-dismiss="modal" aria-label="Close">X</button>
                            </div>
                            <div className="modal-body">
                                <form className="row g-3" onSubmit={(e) => addInscription(e,inscriptionClass, inscriptionUser)}>
                                    <div className="col-sm-6">
                                        <label htmlFor="user" className="form-label fs-5">Usuario</label>
                                        <select className="form-select" id="user" value={inscriptionUser} onChange={(e) => actions.setInscriptionUser(e.target.value)}>
                                            <option disable hidden>Selecciona un usuario</option>
                                            {users && users.length > 0 ? (
                                                users.map((user) => (
                                                    <option key={user.id} value={user.id}>
                                                        {user.email}
                                                    </option>
                                                ))
                                            ) : (
                                                <option disabled>No hay usuarios disponibles</option>
                                            )}
                                        </select>
                                    </div>
                                    <div className="col-sm-6">
                                        <label htmlFor="classes" className="form-label fs-5">Clase</label>
                                        <select className="form-select" id="classes" value={inscriptionClass} onChange={(e) => actions.setInscriptionClass(e.target.value)}>
                                            <option disable hidden>Selecciona una clase</option>
                                            {classes?.map((class_) => (
                                                <option key={class_.id} value={class_.id}>
                                                    {class_.discipline.name} / {class_.start_time} {class_.end_time}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="d-flex justify-content-end gap-3 pt-4">
                                        <button type="button" className="btn btn-secondary fs-5 " data-bs-dismiss="modal">Cerrar</button>
                                        <button type="submit" className="btn btn-warning fs-5 me-3" data-bs-dismiss="modal">Crear</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
            <div className="table-responsive">
                <table className='table table-striped table-hover table-dark align-middle'>
                    <thead>
                        <tr className="fs-5">
                            <th className='text-light'>#</th>
                            <th className='text-light'>Usuario</th>
                            <th className='text-light'>Disciplina</th>
                            <th className='text-light'>Horario</th>
                            <th className='text-light'>Fecha</th>
                            <th className='text-light'></th>

                        </tr>
                    </thead>
                    <tbody className="fs-5">
                        {inscriptions.map((insc, index) => (
                            <tr key={insc.id}>
                                <td>
                                    <span className='text-light'>{index + 1}</span>
                                </td>
                                <td className="text-nowrap">
                                    <span className='text-light'>{insc.user.name} {insc.user.lastname}</span>
                                </td>
                                <td className="text-nowrap pe-2">
                                                <span className='text-light'>
                                                    <div className="d-flex gap-3">
                                                        {insc.class.discipline && insc.class.discipline.effort == "low" ?
                                                            <div className="d-flex gap-3 align-items-center"><div className={styles.low}></div> </div> : insc.class.discipline.effort == "moderate"
                                                                ? <div className="d-flex gap-3 align-items-center"><div className={styles.moderate}></div></div>
                                                                : <div className="d-flex gap-3 align-items-center"><div className={styles.high}></div></div>}
                                                        {insc.class.discipline.name.charAt(0).toUpperCase() + insc.class.discipline.name.slice(1)}</div></span>
                                            </td>
                                <td className="text-nowrap">
                                    <span className='text-light'>{insc.class.start_time} - {insc.class.end_time}</span>
                                </td>
                                <td className="text-nowrap">
                                    <span className='text-light'>{new Date(insc.class.date).toLocaleDateString('es-ES', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric'
                                    })}</span>
                                </td>

                                <td className='text-end text-nowrap'>
                                    <span onClick={() => deleteInscription(insc.id)} className={`material-symbols-outlined text-light me-2 delete-icon ${styles.icons_edit_trash}`}>
                                        delete
                                    </span>
                                    <span onClick={() => editDiscipline(insc.id)} className="material-symbols-outlined text-light delete-icon">
                                        edit
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    )
}
