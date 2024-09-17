
import React, { useContext, useState, useEffect, useRef } from "react";
import useAppContext from "../../store/AppContext";
import { Link, useNavigate } from "react-router-dom";
import styles from "./classAdmin.module.css"

export const ClassAdmin = () => {

    const { store, actions } = useAppContext();
    const { effort, classType, classDate, classTeacher, classStartTime, classEndTime, classRoom, classDiscipline, classes, disciplines, rooms, teachers } = store;
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
            actions.setClassDiscipline('');
            actions.setClassStartTime('');
            actions.setClassEndTime('');
            actions.setClassTeacher('');
            actions.setClassRoom('');
            actions.setClassDate('');
            actions.setClassType('');
        } catch (error) {
            console.error("Error adding class:", error);
        }
    };


    const deleteClass = async (id) => {
        await actions.deleteClass(id);
    };

    const editClass = async (id, discipline, start_time, end_time, room, teacher, date, type) => {
        await actions.editClass(id, discipline, start_time, end_time, room, teacher, date, type);
        actions.getClasses();
    };

    const today = new Date().toISOString().split('T')[0];

    const openEditModal = (class_) => {
        actions.setClassDiscipline(class_.discipline.id);
        actions.setClassStartTime(class_.start_time);
        actions.setClassEndTime(class_.end_time);
        actions.setClassRoom(class_.room.id);
        actions.setClassDate(class_.date);
        actions.setClassTeacher(class_.teacher.id);
        actions.setClassType(class_.type);
    };

    return (
        <div className="tab-pane fade show active" id="pills-classes" role="tabpanel" aria-labelledby="pills-classes-tab" tabIndex="0">
            <div className="d-flex align-items-center">
                <p className='text-light my-5 fs-1 fw-bold'>Clases</p>
                <button className="btn btn-warning fs-5 ms-5 p-0 px-2 py-1" data-bs-toggle="modal" data-bs-target="#classes" >Crear</button>

                <div className="modal fade" id="classes" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className={`${styles.modal_shadow} modal-dialog modal-lg`}>
                        <div className="modal-content bg-dark">
                            <div className="d-flex justify-content-between p-3">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Crear clase</h1>
                                <button type="button" className="btn btn-dark text-light fw-bold fs-5" data-bs-dismiss="modal" aria-label="Close">X</button>
                            </div>
                            <div className="modal-body">
                                <form className="row g-3" onSubmit={addClass}>
                                    <div className="col-sm-6">
                                        <label htmlFor="discipline" className="form-label fs-5">Disciplina</label>
                                        <select className="form-select" value={classDiscipline} onChange={(e) => actions.setClassDiscipline(e.target.value)}>
                                            <option disable hidden>Selecciona una disciplina</option>
                                            {disciplines?.map((discipline) => (
                                                <option key={discipline.id} value={discipline.id}>
                                                    {discipline.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-sm-6">
                                        <label htmlFor="date" className="form-label fs-5">Fecha</label>
                                        <input type="date" className="form-control" min={today} id="date" value={classDate} onChange={(e) => actions.setClassDate(e.target.value)} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label htmlFor="start_time" className="form-label fs-5">Hora de inicio</label>
                                        <input type="time" min="07:00" max="22:00" step="900" className="form-control" id="start_time" value={classStartTime} onChange={(e) => actions.setClassStartTime(e.target.value)} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label htmlFor="end_time" className="form-label fs-5">Hora de fin</label>
                                        <input type="time" min="08:00" max="22:00" step="900" className="form-control" placeholder="Personas que entran" id="end_time" value={classEndTime} onChange={(e) => actions.setClassEndTime(e.target.value)} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label htmlFor="room" className="form-label fs-5">Sala</label>
                                        <select className="form-select" id="room" value={classRoom} onChange={(e) => actions.setClassRoom(e.target.value)}>
                                            <option disable hidden>Selecciona una sala</option>
                                            {rooms?.map((room) => (
                                                <option key={room.id} value={room.id}>
                                                    {room.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-sm-6">
                                        <label htmlFor="teacher" className="form-label fs-5">Profesor</label>
                                        <select className="form-select" id="teacher" value={classTeacher} onChange={(e) => actions.setClassTeacher(e.target.value)}>
                                            <option disable hidden>Selecciona un profesor</option>
                                            {teachers?.map((teacher) => (
                                                <option key={teacher.id} value={teacher.id}>
                                                    {teacher.name} {teacher.lastname}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-sm-6">
                                        <label htmlFor="type" className="form-label fs-5">Tipo de clase</label>
                                        <select className="form-select" id="type" value={classType} onChange={(e) => actions.setClassType(e.target.value)}>
                                            <option disable hidden>Selecciona una modalidad</option>
                                            <option value="presencial">
                                                Presencial
                                            </option>
                                            <option value="virtual">
                                                Virtual
                                            </option>
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
                            <th className='text-light'>Disciplina</th>
                            <th className='text-light'>Horario</th>
                            <th className='text-light'>Sala</th>
                            <th className='text-light'>Profesor</th>
                            <th className='text-light'>Fecha</th>
                            <th className='text-light'>Modalidad</th>
                            <th className='text-light'></th>

                        </tr>
                    </thead>
                    <tbody className="fs-5">
                        {classes.map((class_, index) => (
                            <tr key={class_.id}>
                                <td>
                                    <span className='text-light'>{index + 1}</span>
                                </td>
                                <td className="text-nowrap">
                                    <span className='text-light'>
                                        <div className="d-flex gap-3">
                                            {class_.discipline && class_.discipline.effort === "low" ?
                                                <div className="d-flex gap-3 align-items-center"><div className={styles.low}></div> </div> : class_.discipline && class_.discipline.effort == "moderate"
                                                    ? <div className="d-flex gap-3 align-items-center"><div className={styles.moderate}></div></div>
                                                    : <div className="d-flex gap-3 align-items-center"><div className={styles.high}></div></div>}
                                            {class_.discipline ? (class_.discipline.name) : ""}</div></span>
                                </td>
                                <td className="text-nowrap">
                                    <span className='text-light'>{class_.start_time} - {class_.end_time}</span>
                                </td>
                                <td className="text-nowrap">
                                    <span className='text-light'>{class_.room ? (class_.room.name) : "Sala no especificada"}</span>
                                </td>
                                <td className="text-nowrap">
                                    <span className='text-light pe-1'>
                                        {class_.teacher ? (class_.teacher.name) : "Sin profesor"}
                                    </span>
                                    <span className='text-light'>
                                        {class_.teacher ? (class_.teacher.lastname) : ""}
                                    </span>
                                </td>
                                <td className="text-nowrap">
                                    <span className='text-light'>{new Date(class_.date).toLocaleDateString('es-ES', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric'
                                    })}</span>
                                </td>
                                <td className="text-nowrap">
                                    <span className='text-light'> {class_.type}  </span>
                                </td>
                                <td className='text-end text-nowrap'>
                                    <span onClick={() => deleteClass(class_.id)} className={`material-symbols-outlined text-light me-2 delete-icon ${styles.icons_edit_trash}`}>
                                        delete
                                    </span>
                                    <span data-bs-toggle="modal" data-bs-target={`#modal${class_.id}`} className={`material-symbols-outlined text-light delete-icon ${styles.icons_edit_trash}`} onClick={() => openEditModal(class_)}>
                                        edit
                                    </span>

                                    <div className="modal fade" id={`modal${class_.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog modal-lg">
                                            <div className="modal-content bg-dark p-4">
                                                <div className="d-flex justify-content-between">
                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Editar disciplina</h1>
                                                    <button type="button" className="btn btn-dark text-light fw-bold fs-5" data-bs-dismiss="modal" aria-label="Close">X</button>
                                                </div>
                                                <div className="modal-body row">
                                                    <div className="col-sm-6">
                                                        <label htmlFor="discipline" className="form-label fs-5">Disciplina</label>
                                                        <select className="form-select" value={classDiscipline} onChange={(e) => actions.setClassDiscipline(parseInt(e.target.value))}>
                                                            <option disable hidden>Selecciona una disciplina</option>
                                                            {disciplines?.map((discipline) => (
                                                                <option key={discipline.id} value={discipline.id}>
                                                                    {discipline.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <label htmlFor="date" className="form-label fs-5">Fecha</label>
                                                        <input type="date" className="form-control" min={today} id="date" value={classDate} onChange={(e) => actions.setClassDate(e.target.value)} />
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <label htmlFor="start_time" className="form-label fs-5">Hora de inicio</label>
                                                        <input type="time" min="07:00" max="22:00" step="900" className="form-control" id="start_time" value={classStartTime} onChange={(e) => actions.setClassStartTime(e.target.value)} />
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <label htmlFor="end_time" className="form-label fs-5">Hora de fin</label>
                                                        <input type="time" min="08:00" max="22:00" step="900" className="form-control" placeholder="Personas que entran" id="end_time" value={classEndTime} onChange={(e) => actions.setClassEndTime(e.target.value)} />
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <label htmlFor="room" className="form-label fs-5">Sala</label>
                                                        <select className="form-select" id="room" value={classRoom} onChange={(e) => actions.setClassRoom(parseInt(e.target.value))}>
                                                            <option disable hidden>Selecciona una sala</option>
                                                            {rooms?.map((room) => (
                                                                <option key={room.id} value={room.id}>
                                                                    {room.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <label htmlFor="teacher" className="form-label fs-5">Profesor</label>
                                                        <select className="form-select" id="teacher" value={classTeacher} onChange={(e) => actions.setClassTeacher(parseInt(e.target.value))}>
                                                            <option disable hidden>Selecciona un profesor</option>
                                                            {teachers?.map((teacher) => (
                                                                <option key={teacher.id} value={teacher.id}>
                                                                    {teacher.name} {teacher.lastname}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <label htmlFor="type" className="form-label fs-5">Tipo de clase</label>
                                                        <select className="form-select" id="type" value={classType} onChange={(e) => actions.setClassType(e.target.value)}>
                                                            <option disable hidden>Selecciona una modalidad</option>
                                                            <option value="presencial">
                                                                Presencial
                                                            </option>
                                                            <option value="virtual">
                                                                Virtual
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="d-flex justify-content-end gap-3">
                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                                    <button data-bs-dismiss="modal" onClick={() => editClass(class_.id, classDiscipline, classStartTime, classEndTime, classRoom, classTeacher, classDate, classType)} type="button" className="btn btn-warning">Guardar</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    )
}
