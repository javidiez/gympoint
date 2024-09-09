

import React, { useContext, useState, useEffect, useRef } from "react";
import useAppContext from "../../store/AppContext";
import { Link, useNavigate } from "react-router-dom";
import styles from "./disciplinesAdmin.module.css"

export const DisciplineAdmin = () => {

    const { store, actions } = useAppContext();
    const { disciplineName, disciplineDescription, disciplineEffort, disciplineImage, disciplines } = store;
    const navigate = useNavigate();
    const [isImageUploading, setIsImageUploading] = useState(false);
    const fileInputRef = useRef(null);


    useEffect(() => {
        actions.getDisciplines()
    }, [])

    const addDisciplines = async (e) => {
        e.preventDefault();

        if (!disciplineName || !disciplineEffort) {
            console.error("Name and effort are required");
            return;
        }
        if (!disciplineImage) {
            console.error("Image is required");
            return;
        }

        try {
            await actions.addDisciplines();
            actions.setDisciplineName('');
            actions.setDisciplineDescription('');
            actions.setDisciplineEffort('');
            actions.setDisciplineImage('');
            if (fileInputRef.current) {
                fileInputRef.current.value = ''; // Limpiar el input de archivo
            }
            navigate('/admin');
        } catch (error) {
            console.error("Error adding discipline:", error);
        }
    };

    const addImages = async (photo) => {
        setIsImageUploading(true); // Indicar que la imagen se está cargando
        try {
            const formData = new FormData();
            formData.append("file", photo);
            const response = await actions.addImages(formData);

            if (response?.url) {
                actions.setDisciplineImage(response.url);
            } else {
                console.error("Error al recibir la URL de la imagen.");
            }
        } catch (error) {
            console.error("Error al subir la imagen:", error);
        } finally {
            setIsImageUploading(false); // Finalizar la carga de la imagen
        }
    };

    const deleteDiscipline = async (id) => {
        await actions.deleteDiscipline(id);
    };

    const editDiscipline = (id) => {
        actions.editDiscipline(id);
        navigate('/edit_discipline');
    };

    return (
        <div className="tab-pane fade" id="pills-disciplines" role="tabpanel" aria-labelledby="pills-disciplines-tab" tabIndex="0">
            <div className="d-flex align-items-center" id="discipline">
                <p className='text-light my-5 fs-1 fw-bold'>Disciplinas</p>
                <button className="btn btn-warning fs-5 ms-5 p-0 px-2 py-1" data-bs-toggle="modal" data-bs-target="#exampleModal">Crear</button>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className={`${styles.modal_shadow} modal-dialog modal-lg`}>
                        <div className="modal-content bg-dark">
                            <div className="d-flex justify-content-between p-3">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Crear disciplina</h1>
                                <button type="button" className="btn btn-dark text-light fw-bold fs-5" data-bs-dismiss="modal" aria-label="Close">X</button>
                            </div>
                            <div className="modal-body">
                                <form className="row g-3" onSubmit={addDisciplines}>
                                    <div className="col-sm-6">
                                        <label htmlFor="name" className="form-label fs-5">Nombre</label>
                                        <input type="text" className="form-control" placeholder="Nombre de la disciplina" id="name" value={disciplineName} onChange={(e) => actions.setDisciplineName(e.target.value)} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label htmlFor="effort" className="form-label fs-5">Esfuerzo</label>
                                        <select id="effort" className="form-select" defaultValue={"Seleccionar tipo de esfuerzo"} value={disciplineEffort} onChange={(e) => actions.setDisciplineEffort(e.target.value)}>
                                            <option hidden>Seleccionar tipo de esfuerzo</option>
                                            <option value="low">Leve</option>
                                            <option value="moderate">Moderado</option>
                                            <option value="hight">Alto</option>
                                        </select>
                                    </div>
                                    <div className="col-sm-6">
                                        <label htmlFor="description" className="form-label fs-5">Descripción</label>
                                        <textarea className="form-control" placeholder="Descripción de la disciplina" id="description" style={{ height: "120px" }} value={disciplineDescription} onChange={(e) => actions.setDisciplineDescription(e.target.value)} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label htmlFor="image" className="form-label fs-5">Imagen</label>
                                        <input type="file" className="form-control" id="image" onChange={(e) => addImages(e.target.files[0])} ref={fileInputRef} />
                                    </div>
                                    <div className="d-flex justify-content-end gap-3">
                                        <button type="button" className="btn btn-secondary fs-5 " data-bs-dismiss="modal">Cerrar</button>
                                        <button type="submit" className="btn btn-warning fs-5 me-3" data-bs-dismiss="modal" disabled={isImageUploading}>Crear</button>
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
                            <th className='text-light'></th>
                            <th className='text-light'>Nombre</th>
                            <th className='text-light'>Esfuerzo</th>
                            <th className='text-light'></th>

                        </tr>
                    </thead>
                    <tbody className="fs-4 ">
                        {disciplines.map((discipline, index) => (
                            <tr key={discipline.id}>
                                <td>
                                    <span className='text-light'>{index + 1}</span>
                                </td>
                                <td>
                                    <img src={discipline.image} className={styles.discipline_image} />
                                </td>
                                <td className="text-nowrap">
                                    <span className='text-light'>{discipline.name}</span>
                                </td>
                                <td className="text-nowrap">
                                    {discipline.effort && discipline.effort == "low" ?
                                        <div className="d-flex gap-3 align-items-center"><span className='text-light'>Leve</span><div className={styles.low}></div> </div> : discipline.effort == "moderate"
                                            ? <div className="d-flex gap-3 align-items-center"><span className='text-light'>Moderado</span><div className={styles.moderate}></div></div>
                                            : <div className="d-flex gap-3 align-items-center"><span className='text-light'>Alto</span><div className={styles.high}></div></div>}
                                </td>
                                <td className='text-end text-nowrap'>
                                    <span onClick={() => deleteDiscipline(discipline.id)} className={`material-symbols-outlined text-light me-2 delete-icon ${styles.icons_edit_trash}`}>
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
        </div>

    )
}
