
import React, { useContext, useState, useEffect, useRef } from "react";
import useAppContext from "../../store/AppContext";
import { Link, useNavigate } from "react-router-dom";
import styles from "./roomsAdmin.module.css"

export const RoomsAdmin = () => {

    const { store, actions } = useAppContext();
    const { roomName, roomCapacity, rooms } = store;
    const navigate = useNavigate();


    useEffect(() => {
        actions.getRooms()
    }, [])

    const addRoom = async (e) => {
        e.preventDefault();

        if (!roomName) {
            console.error("Name is required");
            return;
        }

        try {
            await actions.addRoom();
            actions.setRoomName('');
            actions.setRoomCapacity('');
        } catch (error) {
            console.error("Error adding room:", error);
        }
    };


    const deleteRoom = async (id) => {
        await actions.deleteRoom(id);
    };

    const editDiscipline = (id) => {
        actions.editDiscipline(id);
        navigate('/edit_discipline');
    };

    return (
        <div className="tab-pane fade" id="pills-rooms" role="tabpanel" aria-labelledby="pills-rooms-tab" tabIndex="0">
            <div className="d-flex align-items-center">
                <p className='text-light my-5 fs-1 fw-bold'>Salas</p>
                <button className="btn btn-warning fs-5 ms-5 p-0 px-2 py-1" data-bs-toggle="modal" data-bs-target="#rooms" >Crear</button>

                <div className="modal fade" id="rooms" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className={`${styles.modal_shadow} modal-dialog modal-lg`}>
                        <div className="modal-content bg-dark">
                            <div className="d-flex justify-content-between p-3">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Crear persona</h1>
                                <button type="button" className="btn btn-dark text-light fw-bold fs-5" data-bs-dismiss="modal" aria-label="Close">X</button>
                            </div>
                            <div className="modal-body">
                                <form className="row g-3" onSubmit={addRoom}>
                                    <div className="col-sm-6">
                                        <label htmlFor="name" className="form-label fs-5">Nombre</label>
                                        <input type="text" className="form-control" placeholder="Nombre" id="name" value={roomName} onChange={(e) => actions.setRoomName(e.target.value)} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label htmlFor="name" className="form-label fs-5">Capacidad</label>
                                        <input type="number" className="form-control" placeholder="Personas que entran" id="lastname" value={roomCapacity} onChange={(e) => actions.setRoomCapacity(e.target.value)} />
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
                            <th className='text-light'>Nombre</th>
                            <th className='text-light'>Capacidad</th>
                            <th className='text-light'></th>

                        </tr>
                    </thead>
                    <tbody className="fs-4 ">
                        {rooms.map((room, index) => (
                            <tr key={room.id}>
                                <td>
                                    <span className='text-light'>{index + 1}</span>
                                </td>
                                <td>
                                    <span className='text-light'>{room.name} </span>
                                </td>
                                <td>
                                    <span className='text-light'>{room.capacity}</span>
                                </td>
                                
                                <td className='text-end'>
                                    <span onClick={() => deleteRoom(room.id)} className={`material-symbols-outlined text-light me-2 delete-icon ${styles.icons_edit_trash}`}>
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
        </div>

    )
}
