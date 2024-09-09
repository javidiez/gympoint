
import React, { useContext, useState, useEffect } from "react";
import useAppContext from "../../store/AppContext";
import { Link, useNavigate } from "react-router-dom";
import styles from "./class_.module.css"


export const Class_ = ({ effort, name, time, room, teacher }) => {

    const { store, actions } = useAppContext();
    const { classes } = store
    const navigate = useNavigate();

    useEffect(() => {
        actions.getClasses()
    }, [])

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowDate = tomorrow.toISOString().split('T')[0];

    const now = new Date();
    const todayDate = now.toISOString().split('T')[0];
    const currentTime = now.toTimeString().split(' ')[0].substring(0, 5);

    return (
        <>
            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="btn active fs-4 text-light " id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Clases de hoy</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="btn fs-4 text-light" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Clases de mañana</button>
                </li>
            </ul>
            <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">
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
                                    .filter(class_ => {
                                        return class_.date === todayDate && class_.start_time >= currentTime;
                                    })
                                    .map((class_, index) => (
                                        <tr key={class_.id}>

                                            <td className="text-nowrap pe-4">
                                                <span className='text-light'>
                                                    <div className="d-flex gap-3">
                                                        {class_.discipline && class_.discipline.effort == "low" ?
                                                            <div className="d-flex gap-3 align-items-center"><div className={styles.low}></div> </div> : class_.discipline.effort == "moderate"
                                                                ? <div className="d-flex gap-3 align-items-center"><div className={styles.moderate}></div></div>
                                                                : <div className="d-flex gap-3 align-items-center"><div className={styles.high}></div></div>}
                                                        {class_.discipline.name.charAt(0).toUpperCase() + class_.discipline.name.slice(1)}</div></span>
                                            </td>
                                            <td className="text-nowrap pe-4">
                                                <span className='text-light'>{class_.start_time} - {class_.end_time}</span>
                                            </td>
                                            <td className="text-nowrap pe-4">
                                                <span className='text-light'>{class_.room.name.charAt(0).toUpperCase() + class_.room.name.slice(1)}</span>
                                            </td>
                                            <td className="text-nowrap pe-4">
                                                <span className='text-light pe-2'>
                                                    {class_.teacher.name.charAt(0).toUpperCase() + class_.teacher.name.slice(1)}
                                                </span>
                                                <span className='text-light'>
                                                    {class_.teacher.lastname.charAt(0).toUpperCase() + class_.teacher.lastname.slice(1)}
                                                </span>
                                            </td>
                                            <td className="text-nowrap">
                                                <span className='text-light'> {class_.type.charAt(0).toUpperCase() + class_.type.slice(1)}  </span>
                                            </td>
                                            <td>
                                                <button className="btn btn-success p-0 fs-5 px-2">Reservar</button>
                                            </td>
                                        </tr>

                                    ))}
                            </tbody>
                        </table>

                    </div>

                </div>
                <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabindex="0">
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
                                    .map((class_, index) => (
                                        <tr key={class_.id}>

                                            <td className="text-nowrap">
                                                <span className='text-light'>
                                                    <div className="d-flex gap-3">
                                                        {class_.discipline && class_.discipline.effort == "low" ?
                                                            <div className="d-flex gap-3 align-items-center"><div className={styles.low}></div> </div> : class_.discipline.effort == "moderate"
                                                                ? <div className="d-flex gap-3 align-items-center"><div className={styles.moderate}></div></div>
                                                                : <div className="d-flex gap-3 align-items-center"><div className={styles.high}></div></div>}
                                                        {class_.discipline.name.charAt(0).toUpperCase() + class_.discipline.name.slice(1)}</div></span>
                                            </td>
                                            <td className="text-nowrap">
                                                <span className='text-light'>{class_.start_time} - {class_.end_time}</span>
                                            </td>
                                            <td className="text-nowrap">
                                                <span className='text-light'>{class_.room.name.charAt(0).toUpperCase() + class_.room.name.slice(1)}</span>
                                            </td>
                                            <td className="text-nowrap">
                                                <span className='text-light pe-2'>
                                                    {class_.teacher.name.charAt(0).toUpperCase() + class_.teacher.name.slice(1)}
                                                </span>
                                                <span className='text-light'>
                                                    {class_.teacher.lastname.charAt(0).toUpperCase() + class_.teacher.lastname.slice(1)}
                                                </span>
                                            </td>
                                            <td className="text-nowrap">
                                                <span className='text-light'> {class_.type.charAt(0).toUpperCase() + class_.type.slice(1)}  </span>
                                            </td>
                                            <td>
                                                <button className="btn btn-success p-0 fs-5 px-2">Reservar</button>
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
