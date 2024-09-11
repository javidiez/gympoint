
import React, { useContext, useState, useEffect, useRef } from "react";
import useAppContext from "../../store/AppContext";
import { Link, useNavigate } from "react-router-dom";
import styles from "./gymAdmin.module.css"

export const GymsAdmin = () => {

    const { store, actions } = useAppContext();
    const { gyms, gymName, gymDescription, gymLocation, gymPhone, gymStreet, gymImage } = store;
    const navigate = useNavigate();
    const [isImageUploading, setIsImageUploading] = useState(false);
    const fileInputRef = useRef(null);


    useEffect(() => {
        actions.getGyms()
    }, [])

    const addGym = async (e) => {
        e.preventDefault();

        if (!gymName || !gymStreet || !gymLocation) {
            console.error("Name, street and location are required");
            return;
        }
        if (!gymImage) {
            console.error("Image is required");
            return;
        }

        try {
            await actions.addGym();
            actions.setGymName('');
            actions.setGymDescription('');
            actions.setGymLocation('');
            actions.setGymPhone('');
            actions.setGymStreet('');
            actions.setGymImage('');
            if (fileInputRef.current) {
                fileInputRef.current.value = ''; // Limpiar el input de archivo
            }
        } catch (error) {
            console.error("Error adding gym:", error);
        }
    };

    const addImages = async (photo) => {
        setIsImageUploading(true); // Indicar que la imagen se está cargando
        try {
            const formData = new FormData();
            formData.append("file", photo);
            const response = await actions.addImages(formData);

            if (response?.url) {
                actions.setGymImage(response.url);
            } else {
                console.error("Error al recibir la URL de la imagen.");
            }
        } catch (error) {
            console.error("Error al subir la imagen:", error);
        } finally {
            setIsImageUploading(false); // Finalizar la carga de la imagen
        }
    };

    const deleteGym = async (id) => {
        await actions.deleteGym(id);
    };

    const editDiscipline = (id) => {
        actions.editDiscipline(id);
        navigate('/edit_discipline');
    };

    return (
        <div className="tab-pane fade" id="pills-gyms" role="tabpanel" aria-labelledby="pills-gyms-tab" tabIndex="0">
            <div className="d-flex align-items-center">
                <p className='text-light my-5 fs-1 fw-bold'>Centros</p>
                <button className="btn btn-warning fs-5 ms-5 p-0 px-2 py-1" data-bs-toggle="modal" data-bs-target="#gyms" >Crear</button>

                <div className="modal fade" id="gyms" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className={`${styles.modal_shadow} modal-dialog modal-lg`}>
                        <div className="modal-content bg-dark">
                            <div className="d-flex justify-content-between p-3">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Crear centro</h1>
                                <button type="button" className="btn btn-dark text-light fw-bold fs-5" data-bs-dismiss="modal" aria-label="Close">X</button>
                            </div>
                            <div className="modal-body">
                                <form className="row g-3" onSubmit={addGym}>
                                    <div className="col-sm-6">
                                        <label htmlFor="name" className="form-label fs-5">Nombre</label>
                                        <input type="text" className="form-control" placeholder="Nombre" id="name" value={gymName} onChange={(e) => actions.setGymName(e.target.value)} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label htmlFor="street" className="form-label fs-5">Calle</label>
                                        <input type="text" className="form-control" placeholder="Calle 1234" id="street" value={gymStreet} onChange={(e) => actions.setGymStreet(e.target.value)} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label htmlFor="location" className="form-label fs-5">Provincia</label>
                                        <input type="text" className="form-control" placeholder="Provincia" id="location" value={gymLocation} onChange={(e) => actions.setGymLocation(e.target.value)} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label htmlFor="phone" className="form-label fs-5">Teléfono</label>
                                        <input type="phone" className="form-control" placeholder="+34 123 456 78" id="phone" value={gymPhone} onChange={(e) => actions.setGymPhone(e.target.value)} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label htmlFor="description" className="form-label fs-5">Descripción</label>
                                        <textarea style={{ height: "120px" }} type="text" className="form-control" placeholder="Puesto/rol" id="description" value={gymDescription} onChange={(e) => actions.setGymDescription(e.target.value)} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label htmlFor="image" className="form-label fs-5">Logo</label>
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
            <div className="table-responsive">
                <table className='table table-striped table-hover table-dark align-middle'>
                    <thead>
                        <tr className="fs-5">
                            <th className='text-light'>#</th>
                            <th className='text-light'></th>
                            <th className='text-light'>Nombre</th>
                            <th className='text-light'>Dirección</th>
                            <th className='text-light'>Provincia</th>
                            <th className='text-light'>Teléfono</th>
                            <th className='text-light'></th>

                        </tr>
                    </thead>
                    <tbody className="fs-5">
                        {gyms.map((gym, index) => (
                            <tr key={gym.id}>
                                <td>
                                    <span className='text-light'>{index + 1}</span>
                                </td>
                                <td>
                                    <img src={gym.logo} className={styles.gym_image} />
                                </td>
                                <td className="text-nowrap">
                                    <span className='text-light'>{gym.name}</span>
                                </td>
                                <td className="text-nowrap">
                                    <span className='text-light'>{gym.street}</span>
                                </td>
                                <td className="text-nowrap">
                                    <span className='text-light'>{gym.location}</span>
                                </td>
                                <td className="text-nowrap">
                                    <span className='text-light'>{gym.phone}</span>
                                </td>
                                
                                <td className='text-end text-nowrap'>
                                    <span onClick={() => deleteGym(gym.id)} className={`material-symbols-outlined text-light me-2 delete-icon ${styles.icons_edit_trash}`}>
                                        delete
                                    </span>
                                    <span onClick={() => editDiscipline(gym.id)} className="material-symbols-outlined text-light delete-icon">
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
