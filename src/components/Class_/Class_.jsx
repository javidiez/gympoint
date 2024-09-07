
import React, { useContext, useState } from "react";
import useAppContext from "../../store/AppContext";
import { Link, useNavigate } from "react-router-dom";
import styles from "./class_.module.css"


export const Class_ = ({ effort, name, time, room, teacher }) => {

    const { store, actions } = useAppContext();
    const navigate = useNavigate();

    return (
        <div className="table-responsive">
            <table className={`table align-middle table-sm text-center table-borderless table-dark mt-5 fs-5`}>
                <thead>
                    <tr className={styles.tableHeader}>
                        <th scope="col"></th>
                        <th scope="col">Disciplina</th>
                        <th scope="col">Horario</th>
                        <th scope="col">Sala</th>
                        <th scope="col">Profesor</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody className={styles.tbody_table}>
                    <tr>
                        <td scope="row">
                            <div className={`${styles.circle_effort} bg-warning`}>
                                {effort}
                            </div>
                        </td>
                        <td className="text-nowrap px-3">Body pump</td>
                        <td className="text-nowrap px-3">10:30 - 11:30</td>
                        <td className="text-nowrap px-3">Sala Cicle</td>
                        <td className="text-nowrap px-3">Juan Perez</td>
                        <td className="text-success ps-3"><button className="btn btn-success fs-5 p-0 px-2">Reservar</button></td>
                    </tr>
                    <tr>
                        <td scope="row">
                            <div className={`${styles.circle_effort} bg-warning`}>
                                {effort}
                            </div>
                        </td>
                        <td className="text-nowrap px-3">Body pump</td>
                        <td className="text-nowrap px-3">10:30 - 11:30</td>
                        <td className="text-nowrap px-3">Sala Cicle</td>
                        <td className="text-nowrap px-3">Juan Perez</td>
                        <td className="text-success ps-3"><button className="btn btn-success fs-5 p-0 px-2">Reservar</button></td>
                    </tr>
                    <tr>
                        <td scope="row">
                            <div className={`${styles.circle_effort} bg-warning`}>
                                {effort}
                            </div>
                        </td>
                        <td className="text-nowrap px-3">Body pump</td>
                        <td className="text-nowrap px-3">10:30 - 11:30</td>
                        <td className="text-nowrap px-3">Sala Cicle</td>
                        <td className="text-nowrap px-3">Juan Perez</td>
                        <td className="text-success ps-3"><button className="btn btn-success fs-5 p-0 px-2">Reservar</button></td>
                    </tr>
                    <tr>
                        <td scope="row">
                            <div className={`${styles.circle_effort} bg-warning`}>
                                {effort}
                            </div>
                        </td>
                        <td className="text-nowrap px-3">Body pump</td>
                        <td className="text-nowrap px-3">10:30 - 11:30</td>
                        <td className="text-nowrap px-3">Sala Cicle</td>
                        <td className="text-nowrap px-3">Juan Perez</td>
                        <td className="text-success ps-3"><button className="btn btn-success fs-5 p-0 px-2">Reservar</button></td>
                    </tr>
                    <tr>
                        <td scope="row">
                            <div className={`${styles.circle_effort} bg-warning`}>
                                {effort}
                            </div>
                        </td>
                        <td className="text-nowrap px-3">Body pump</td>
                        <td className="text-nowrap px-3">10:30 - 11:30</td>
                        <td className="text-nowrap px-3">Sala Cicle</td>
                        <td className="text-nowrap px-3">Juan Perez</td>
                        <td className="text-success ps-3"><button className="btn btn-success fs-5 p-0 px-2">Reservar</button></td>
                    </tr>
                    <tr>
                        <td scope="row">
                            <div className={`${styles.circle_effort} bg-warning`}>
                                {effort}
                            </div>
                        </td>
                        <td className="text-nowrap px-3">Body pump</td>
                        <td className="text-nowrap px-3">10:30 - 11:30</td>
                        <td className="text-nowrap px-3">Sala Cicle</td>
                        <td className="text-nowrap px-3">Juan Perez</td>
                        <td className="text-success ps-3"><button className="btn btn-success fs-5 p-0 px-2">Reservar</button></td>
                    </tr>
                    <tr>
                        <td scope="row">
                            <div className={`${styles.circle_effort} bg-warning`}>
                                {effort}
                            </div>
                        </td>
                        <td className="text-nowrap px-3">Body pump</td>
                        <td className="text-nowrap px-3">10:30 - 11:30</td>
                        <td className="text-nowrap px-3">Sala Cicle</td>
                        <td className="text-nowrap px-3">Juan Perez</td>
                        <td className="text-success ps-3"><button className="btn btn-success fs-5 p-0 px-2">Reservar</button></td>
                    </tr>
                    <tr>
                        <td scope="row">
                            <div className={`${styles.circle_effort} bg-warning`}>
                                {effort}
                            </div>
                        </td>
                        <td className="text-nowrap px-3">Body pump</td>
                        <td className="text-nowrap px-3">10:30 - 11:30</td>
                        <td className="text-nowrap px-3">Sala Cicle</td>
                        <td className="text-nowrap px-3">Juan Perez</td>
                        <td className="text-success ps-3"><button className="btn btn-success fs-5 p-0 px-2">Reservar</button></td>
                    </tr>
                    <tr>
                        <td scope="row">
                            <div className={`${styles.circle_effort} bg-warning`}>
                                {effort}
                            </div>
                        </td>
                        <td className="text-nowrap px-3">Body pump</td>
                        <td className="text-nowrap px-3">10:30 - 11:30</td>
                        <td className="text-nowrap px-3">Sala Cicle</td>
                        <td className="text-nowrap px-3">Juan Perez</td>
                        <td className="text-success ps-3"><button className="btn btn-success fs-5 p-0 px-2">Reservar</button></td>
                    </tr>
                    <tr>
                        <td scope="row">
                            <div className={`${styles.circle_effort} bg-warning`}>
                                {effort}
                            </div>
                        </td>
                        <td className="text-nowrap px-3">Body pump</td>
                        <td className="text-nowrap px-3">10:30 - 11:30</td>
                        <td className="text-nowrap px-3">Sala Cicle</td>
                        <td className="text-nowrap px-3">Juan Perez</td>
                        <td className="text-success ps-3"><button className="btn btn-success fs-5 p-0 px-2">Reservar</button></td>
                    </tr>

                </tbody>
            </table>

        </div>
    )
}
