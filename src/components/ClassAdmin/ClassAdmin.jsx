
import React, { useContext, useState, useEffect, useRef } from "react";
import useAppContext from "../../store/AppContext";
import { Link, useNavigate } from "react-router-dom";
import styles from "./classAdmin.module.css"

export const ClassAdmin = () => {

    const { store, actions } = useAppContext();
    const { effort, classDate, classTeacher, classStartTime, classEndTime, classRoom, classDiscipline, classKal, classes } = store;
    const navigate = useNavigate();


    useEffect(() => {
        actions.getClasses()
    }, [])

    const addClass = async (e) => {
        e.preventDefault();

        if (!classDiscipline || !classStartTime || !classEndTime || !classTeacher || !classDate) {
            console.error("All the fields are required");
            return;
        }

        try {
            await actions.addClass();
            actions.setDisciplineName('');
            actions.setEffort('');
            actions.setStartTime('');
            actions.setEndTime('');
            actions.setRoomName('');
            actions.setTeacherName('');
            actions.setClassRoom('');
            actions.setTeacherName('');
        } catch (error) {
            console.error("Error adding class:", error);
        }
    };


    const deleteClass = async (id) => {
        await actions.deleteClass(id);
    };

    const editDiscipline = (id) => {
        actions.editDiscipline(id);
        navigate('/edit_discipline');
    };

    return (
        <div className="tab-pane fade" id="pills-classes" role="tabpanel" aria-labelledby="pills-classes-tab" tabIndex="0">
            <div className="d-flex align-items-center">
                <p className='text-light my-5 fs-1 fw-bold'>Salas</p>
                <button className="btn btn-warning fs-5 ms-5 p-0 px-2 py-1" data-bs-toggle="modal" data-bs-target="#classes" >Crear</button>

                <div className="modal fade" id="classes" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className={`${styles.modal_shadow} modal-dialog modal-lg`}>
                        <div className="modal-content bg-dark">
                            <div className="d-flex justify-content-between p-3">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Crear persona</h1>
                                <button type="button" className="btn btn-dark text-light fw-bold fs-5" data-bs-dismiss="modal" aria-label="Close">X</button>
                            </div>
                            <div className="modal-body">
                                <form className="row g-3" onSubmit={addClass}>
                                    <div className="col-sm-6">
                                        <label htmlFor="name" className="form-label fs-5">Disciplina</label>
                                        <input type="text" className="form-control" placeholder="Nombre" id="name" value={disciplineName} onChange={(e) => actions.setRoomName(e.target.value)} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label htmlFor="name" className="form-label fs-5">Hora de inicio</label>
                                        <input type="number" className="form-control" placeholder="Personas que entran" id="lastname" value={startTime} onChange={(e) => actions.setRoomCapacity(e.target.value)} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label htmlFor="name" className="form-label fs-5">Hora de fin</label>
                                        <input type="number" className="form-control" placeholder="Personas que entran" id="lastname" value={endTime} onChange={(e) => actions.setRoomCapacity(e.target.value)} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label htmlFor="name" className="form-label fs-5">Sala</label>
                                        <input type="number" className="form-control" placeholder="Personas que entran" id="lastname" value={roomName} onChange={(e) => actions.setRoomCapacity(e.target.value)} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label htmlFor="name" className="form-label fs-5">Profesor</label>
                                        <input type="number" className="form-control" placeholder="Personas que entran" id="lastname" value={teacherName} onChange={(e) => actions.setRoomCapacity(e.target.value)} />
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
                            <th className='text-light'>Esfuerzo</th>
                            <th className='text-light'>Disciplina</th>
                            <th className='text-light'>Horario</th>
                            <th className='text-light'>Sala</th>
                            <th className='text-light'>Profesor</th>
                            <th className='text-light'></th>

                        </tr>
                    </thead>
                    <tbody className="fs-4 ">
                        {classes.map((class_, index) => (
                            <tr key={class_.id}>
                                <td>
                                    <span className='text-light'>{index + 1}</span>
                                </td>
                                <td>
                                    <span className='text-light'>{class_.name} </span>
                                </td>
                                <td>
                                    <span className='text-light'>{class_.capacity}</span>
                                </td>
                                
                                <td className='text-end'>
                                    <span onClick={() => deleteClass(class_.id)} className={`material-symbols-outlined text-light me-2 delete-icon ${styles.icons_edit_trash}`}>
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
        </div>

    )
}
