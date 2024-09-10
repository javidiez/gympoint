
import React, { useContext, useState, useEffect, useRef } from "react";
import useAppContext from "../../store/AppContext";
import { Link, useNavigate } from "react-router-dom";
import styles from "./teachersAdmin.module.css"

export const TeachersAdmin = () => {

    const { store, actions } = useAppContext();
    const { teacherName, teacherLastname, teacherJob, teacherImage, teachers } = store;
    const navigate = useNavigate();
    const [isImageUploading, setIsImageUploading] = useState(false);
    const fileInputRef = useRef(null);


    useEffect(() => {
        actions.getTeachers()
    }, [])

    const addTeacher = async (e) => {
        e.preventDefault();

        if (!teacherName || !teacherLastname || !teacherJob) {
            console.error("Name, lastname and job are required");
            return;
        }
        if (!teacherImage) {
            console.error("Image is required");
            return;
        }

        try {
            await actions.addTeacher();
            actions.setTeacherName('');
            actions.setTeacherLastname('');
            actions.setTeacherJob('');
            actions.setTeacherImage('');
            if (fileInputRef.current) {
                fileInputRef.current.value = ''; // Limpiar el input de archivo
            }
        } catch (error) {
            console.error("Error adding teacher:", error);
        }
    };

    const addImages = async (photo) => {
        setIsImageUploading(true); // Indicar que la imagen se está cargando
        try {
            const formData = new FormData();
            formData.append("file", photo);
            const response = await actions.addImages(formData);

            if (response?.url) {
                actions.setTeacherImage(response.url);
            } else {
                console.error("Error al recibir la URL de la imagen.");
            }
        } catch (error) {
            console.error("Error al subir la imagen:", error);
        } finally {
            setIsImageUploading(false); // Finalizar la carga de la imagen
        }
    };

    const deleteTeacher = async (id) => {
        await actions.deleteTeacher(id);
    };

    const editDiscipline = (id) => {
        actions.editDiscipline(id);
        navigate('/edit_discipline');
    };

    return (
        <div className="tab-pane fade" id="pills-teachers" role="tabpanel" aria-labelledby="pills-teachers-tab" tabIndex="0">
            <div className="d-flex align-items-center">
                <p className='text-light my-5 fs-1 fw-bold'>Equipo humano</p>
                <button className="btn btn-warning fs-5 ms-5 p-0 px-2 py-1" data-bs-toggle="modal" data-bs-target="#teachers" >Crear</button>

                <div className="modal fade" id="teachers" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className={`${styles.modal_shadow} modal-dialog modal-lg`}>
                        <div className="modal-content bg-dark">
                            <div className="d-flex justify-content-between p-3">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Crear persona</h1>
                                <button type="button" className="btn btn-dark text-light fw-bold fs-5" data-bs-dismiss="modal" aria-label="Close">X</button>
                            </div>
                            <div className="modal-body">
                                <form className="row g-3" onSubmit={addTeacher}>
                                    <div className="col-sm-6">
                                        <label htmlFor="name" className="form-label fs-5">Nombre</label>
                                        <input type="text" className="form-control" placeholder="Nombre" id="name" value={teacherName} onChange={(e) => actions.setTeacherName(e.target.value)} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label htmlFor="name" className="form-label fs-5">Apellido</label>
                                        <input type="text" className="form-control" placeholder="Apellido" id="lastname" value={teacherLastname} onChange={(e) => actions.setTeacherLastname(e.target.value)} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label htmlFor="name" className="form-label fs-5">Puesto</label>
                                        <input type="text" className="form-control" placeholder="Puesto/rol" id="name" value={teacherJob} onChange={(e) => actions.setTeacherJob(e.target.value)} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label htmlFor="image" className="form-label fs-5">Foto</label>
                                        <input type="file" className="form-control" id="image" onChange={(e) => addImages(e.target.files[0])} ref={fileInputRef} />
                                    </div>
                                    <div className="d-flex justify-content-end gap-3 pt-4">
                                        <button type="button" className="btn btn-secondary fs-5 " data-bs-dismiss="modal">Cerrar</button>
                                        <button type="submit" className="btn btn-warning fs-5 me-3" data-bs-dismiss="modal" disabled={isImageUploading}>Crear</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
            <div className="table-responsive pb-5">
                <table className='table table-striped table-hover table-dark align-middle'>
                    <thead>
                        <tr className="fs-5">
                            <th className='text-light'>#</th>
                            <th className='text-light'></th>
                            <th className='text-light'>Nombre</th>
                            <th className='text-light'>Puesto</th>
                            <th className='text-light'></th>

                        </tr>
                    </thead>
                    <tbody className="fs-5 ">
                        {teachers.map((teacher, index) => (
                            <tr key={teacher.id}>
                                <td>
                                    <span className='text-light'>{index + 1}</span>
                                </td>
                                <td>
                                    <img src={teacher.image} className={styles.teacher_image} />
                                </td>
                                <td className="text-nowrap">
                                    <span className='text-light'>{teacher.name} {teacher.lastname}</span>
                                </td>
                                <td className="text-nowrap">
                                    <span className='text-light'>{teacher.job}</span>
                                </td>
                                
                                <td className='text-end text-nowrap'>
                                    <span onClick={() => deleteTeacher(teacher.id)} className={`material-symbols-outlined text-light me-2 delete-icon ${styles.icons_edit_trash}`}>
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
        </div>

    )
}
