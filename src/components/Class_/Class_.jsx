import React, { useContext, useState, useEffect } from "react";
import useAppContext from "../../store/AppContext";
import styles from "./class_.module.css";

export const Class_ = ({ effort, name, time, room, teacher }) => {
    const { store, actions } = useAppContext();
    const { classes, userId, inscriptions } = store;

    useEffect(() => {
        actions.getClasses();
        actions.getInscriptions();
    }, []);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowDate = tomorrow.toISOString().split('T')[0];

    const now = new Date();
    const todayDate = now.toISOString().split('T')[0];
    const currentTime = now.toTimeString().split(' ')[0].substring(0, 5);

    const addInscription = (class_id, user_id) => {
        actions.addInscription(class_id, user_id);
    }

    const deleteInscription = async (id) => {
        await actions.deleteInscription(id);
    };

    const storedUserId = parseInt(localStorage.getItem('userId'), 10);

    return (
        <>
            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="btn active fs-4 text-light" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Clases de hoy</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="btn fs-4 text-light" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Clases de mañana</button>
                </li>
            </ul>
            <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabIndex="0">
                    <div className="table-responsive">
                        <table className={`table align-middle table-sm text-center table-borderless table-dark mt-5 fs-5`}>
                            <thead>
                                <tr className={styles.tableHeader}>
                                    <th scope="col">Disciplina</th>
                                    <th scope="col">Horario</th>
                                    <th scope="col">Sala</th>
                                    <th scope="col">Profesor</th>
                                    <th scope="col">Modalidad</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody className={styles.tbody_table}>
                                {classes
                                    .filter(class_ => class_.date === todayDate && class_.start_time >= currentTime)
                                    .sort((a, b) => {
                                        const timeA = a.start_time.split(':');
                                        const timeB = b.start_time.split(':');
                                        const hoursA = parseInt(timeA[0], 10);
                                        const minutesA = parseInt(timeA[1], 10);
                                        const hoursB = parseInt(timeB[0], 10);
                                        const minutesB = parseInt(timeB[1], 10);
                                        return hoursA === hoursB ? minutesA - minutesB : hoursA - hoursB;
                                    })
                                    .map(class_ => {
                                        const userInscription = inscriptions.find(inscription =>
                                            inscription.class.class_id === class_.id && inscription.user.user_id === storedUserId
                                        );

                                        return (
                                            <tr key={class_.id}>
                                                <td className="text-nowrap pe-2">
                                                    <span className='text-light'>
                                                        <div className="d-flex gap-3">
                                                            {class_.discipline && class_.discipline.effort === "low" ?
                                                                <div className="d-flex gap-3 align-items-center"><div className={styles.low}></div> </div> : class_.discipline.effort === "moderate"
                                                                    ? <div className="d-flex gap-3 align-items-center"><div className={styles.moderate}></div></div>
                                                                    : <div className="d-flex gap-3 align-items-center"><div className={styles.high}></div></div>}
                                                            {class_.discipline.name.charAt(0).toUpperCase() + class_.discipline.name.slice(1)}
                                                        </div>
                                                    </span>
                                                </td>
                                                <td className="text-nowrap pe-2">
                                                    <span className='text-light'>{class_.start_time} - {class_.end_time}</span>
                                                </td>
                                                <td className="text-nowrap pe-2">
                                                    <span className='text-light'>{class_.room.name.charAt(0).toUpperCase() + class_.room.name.slice(1)}</span>
                                                </td>
                                                <td className="text-nowrap pe-2">
                                                    <span className='text-light pe-1'>
                                                        {class_.teacher.name.charAt(0).toUpperCase() + class_.teacher.name.slice(1)}
                                                    </span>
                                                    <span className='text-light'>
                                                        {class_.teacher.lastname.charAt(0).toUpperCase() + class_.teacher.lastname.slice(1)}
                                                    </span>
                                                </td>
                                                <td className="text-nowrap">
                                                    <span className='text-light'> {class_.type.charAt(0).toUpperCase() + class_.type.slice(1)} </span>
                                                </td>
                                                <td>
                                                    {!userInscription ? (
                                                        <>
                                                            <button type="button" data-bs-toggle="modal" data-bs-target={`#modalRes${class_.id}`}

                                                                className="btn btn-success p-0 fs-5 px-2"
                                                            >
                                                                Reservar
                                                            </button>


                                                            <div class="modal fade" id={`modalRes${class_.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                                <div className={`${styles.modal_shadow} modal-dialog`}>
                                                                    <div class="modal-content bg-dark p-4">
                                                                        <div className="d-flex justify-content-between">
                                                                            <h1 className="modal-title fs-5" id="exampleModalLabel">Tu reserva</h1>
                                                                            <button type="button" className="btn btn-dark text-light fw-bold fs-5" data-bs-dismiss="modal" aria-label="Close">X</button>
                                                                        </div>
                                                                        <div className="modal-body row gap-3 text-start">
                                                                            <p><span className="fw-bold">Disciplina</span>: {class_.discipline.name.charAt(0).toUpperCase() + class_.discipline.name.slice(1)}</p>
                                                                            <p><span className="fw-bold">Horario</span>: {class_.start_time} - {class_.end_time} </p>
                                                                            <p><span className="fw-bold">Fecha</span>: {new Date(class_.date).toLocaleDateString('es-ES', {
                                                                                day: '2-digit',
                                                                                month: '2-digit',
                                                                                year: 'numeric'
                                                                            })}</p>

                                                                        </div>
                                                                        <div className="d-flex justify-content-end gap-3 mt-4">
                                                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                                                            <button onClick={() => addInscription(class_.id, storedUserId)} type="button" data-bs-dismiss="modal" className="btn btn-success p-0 fs-5 px-2">Reservar</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <button
                                                            onClick={() => deleteInscription(userInscription.id)}
                                                            className="btn btn-danger p-0 fs-5 px-2"
                                                        >
                                                            Cancelar
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabIndex="0">
                    <div className="table-responsive">
                        <table className={`table align-middle table-sm text-center table-borderless table-dark mt-5 fs-5`}>
                            <thead>
                                <tr className={styles.tableHeader}>
                                    <th scope="col">Disciplina</th>
                                    <th scope="col">Horario</th>
                                    <th scope="col">Sala</th>
                                    <th scope="col">Profesor</th>
                                    <th scope="col">Modalidad</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody className={styles.tbody_table}>
                                {classes
                                    .filter(class_ => class_.date === tomorrowDate)
                                    .sort((a, b) => {
                                        const timeA = a.start_time.split(':');
                                        const timeB = b.start_time.split(':');
                                        const hoursA = parseInt(timeA[0], 10);
                                        const minutesA = parseInt(timeA[1], 10);
                                        const hoursB = parseInt(timeB[0], 10);
                                        const minutesB = parseInt(timeB[1], 10);
                                        return hoursA === hoursB ? minutesA - minutesB : hoursA - hoursB;
                                    })
                                    .map(class_ => {
                                        const userInscription = inscriptions.find(inscription =>
                                            inscription.class.class_id === class_.id && inscription.user.user_id === storedUserId
                                        );

                                        return (
                                            <tr key={class_.id}>
                                                <td className="text-nowrap pe-2">
                                                    <span className='text-light'>
                                                        <div className="d-flex gap-3">
                                                            {class_.discipline && class_.discipline.effort === "low" ?
                                                                <div className="d-flex gap-3 align-items-center"><div className={styles.low}></div> </div> : class_.discipline.effort === "moderate"
                                                                    ? <div className="d-flex gap-3 align-items-center"><div className={styles.moderate}></div></div>
                                                                    : <div className="d-flex gap-3 align-items-center"><div className={styles.high}></div></div>}
                                                            {class_.discipline.name.charAt(0).toUpperCase() + class_.discipline.name.slice(1)}
                                                        </div>
                                                    </span>
                                                </td>
                                                <td className="text-nowrap pe-2">
                                                    <span className='text-light'>{class_.start_time} - {class_.end_time}</span>
                                                </td>
                                                <td className="text-nowrap pe-2">
                                                    <span className='text-light'>{class_.room.name.charAt(0).toUpperCase() + class_.room.name.slice(1)}</span>
                                                </td>
                                                <td className="text-nowrap pe-2">
                                                    <span className='text-light pe-1'>
                                                        {class_.teacher.name.charAt(0).toUpperCase() + class_.teacher.name.slice(1)}
                                                    </span>
                                                    <span className='text-light'>
                                                        {class_.teacher.lastname.charAt(0).toUpperCase() + class_.teacher.lastname.slice(1)}
                                                    </span>
                                                </td>
                                                <td className="text-nowrap">
                                                    <span className='text-light'> {class_.type.charAt(0).toUpperCase() + class_.type.slice(1)} </span>
                                                </td>
                                                <td>
                                                    {!userInscription ? (
                                                        <>
                                                            <button type="button" data-bs-toggle="modal" data-bs-target={`#modalRes${class_.id}`}

                                                                className="btn btn-success p-0 fs-5 px-2"
                                                            >
                                                                Reservar
                                                            </button>


                                                            <div class="modal fade" id={`modalRes${class_.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                                <div className={`${styles.modal_shadow} modal-dialog`}>
                                                                    <div class="modal-content bg-dark p-4">
                                                                        <div className="d-flex justify-content-between">
                                                                            <h1 className="modal-title fs-5" id="exampleModalLabel">Tu reserva</h1>
                                                                            <button type="button" className="btn btn-dark text-light fw-bold fs-5" data-bs-dismiss="modal" aria-label="Close">X</button>
                                                                        </div>
                                                                        <div className="modal-body row gap-3 text-start">
                                                                            <p><span className="fw-bold">Disciplina</span>: {class_.discipline.name.charAt(0).toUpperCase() + class_.discipline.name.slice(1)}</p>
                                                                            <p><span className="fw-bold">Horario</span>: {class_.start_time} - {class_.end_time} </p>
                                                                            <p><span className="fw-bold">Fecha</span>: {new Date(class_.date).toLocaleDateString('es-ES', {
                                                                                day: '2-digit',
                                                                                month: '2-digit',
                                                                                year: 'numeric'
                                                                            })}</p>

                                                                        </div>
                                                                        <div className="d-flex justify-content-end gap-3 mt-4">
                                                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                                                            <button onClick={() => addInscription(class_.id, storedUserId)} type="button" data-bs-dismiss="modal" className="btn btn-success p-0 fs-5 px-2">Reservar</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <button
                                                            onClick={() => deleteInscription(userInscription.id)}
                                                            className="btn btn-danger p-0 fs-5 px-2"
                                                        >
                                                            Cancelar
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
