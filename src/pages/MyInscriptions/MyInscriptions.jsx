
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar";
import useAppContext from "../../store/AppContext";
import styles from "./myInscriptions.module.css"


export const MyInscriptions = () => {

    const { store, actions } = useAppContext();
    const { token, inscriptions, role, userId } = store;
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/');
        }
    }, [token])

    useEffect(() => {
        actions.getInscriptions()
        console.log(userId)
    }, [])

    const handleAdmin = () => {
        navigate('/admin')
    }

    const storedUserId = parseInt(localStorage.getItem('userId'), 10);

    const deleteInscription = async (id) => {
        await actions.deleteInscription(id);
    };

    return (
        <>
            <Navbar buttonAdmin={role == "admin" ? <button onClick={handleAdmin} className="btn btn-danger me-2">Administrador</button> : ''} />
            <div className="container">
                <h1 className="mb-5">Reservas</h1>

                <div className="table-responsive">
                    <table className='table table-striped table-hover table-dark align-middle'>
                        <thead>
                            <tr className="fs-5">
                                <th className='text-light'>#</th>
                                <th className='text-light'>Disciplina</th>
                                <th className='text-light'>Horario</th>
                                <th className='text-light'>Fecha</th>
                                <th className='text-light'>Sala</th>
                                <th className='text-light'>Profesor</th>
                                <th className='text-light'>Modalidad</th>
                                <th className='text-light'></th>

                            </tr>
                        </thead>
                        <tbody className="fs-5">
                            {inscriptions
                                .filter(inscription =>
                                    inscription.user.user_id === storedUserId
                                )
                                .map((insc, index) => (
                                    <tr key={insc.id}>
                                        <td>
                                            <span className='text-light'>{index + 1}</span>
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
                                        <td className="text-nowrap">
                                            <span className='text-light'>{insc.class.room.name}</span>
                                        </td>
                                        <td className="text-nowrap">
                                            <span className='text-light'>{insc.class.teacher.name}</span>
                                        </td>
                                        <td className="text-nowrap">
                                        <span className='text-light'> {insc.class.type.charAt(0).toUpperCase() + insc.class.type.slice(1)} </span>
                                        </td>
                                        <td >
                                            <button
                                                onClick={() => deleteInscription(insc.id)}
                                                className="btn btn-danger p-0 fs-5 px-2"
                                            >
                                                Cancelar
                                            </button>
                                        </td>

                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>


    )
}
