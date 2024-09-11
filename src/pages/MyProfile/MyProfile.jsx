
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar";
import useAppContext from "../../store/AppContext";
import styles from "./myProfile.module.css"
import avatar from "../../assets/img/avatar.png"


export const MyProfile = () => {

    const { store, actions } = useAppContext();
    const { token, role, username, name, lastname, email, userImage, userPhone, birthdate } = store;
    const navigate = useNavigate();
    const [isImageUploading, setIsImageUploading] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (!token) {
            navigate('/');
        }
    }, [token])

    useEffect(() => {
        actions.getUsers()
    }, [])

    useEffect(() => {
        const storedImage = localStorage.getItem('userImage');
        if (storedImage && storedImage !== '') {
            actions.setUserImage(storedImage);
        } else {
            actions.setUserImage(null); // Para que el condicional renderice el avatar por defecto
        }
    }, []);

    const handleAdmin = () => {
        navigate('/admin')
    }

    const storedUserId = parseInt(localStorage.getItem('userId'), 10);


    const addImages = async (photo) => {
        setIsImageUploading(true); // Indicar que la imagen se está cargando
        try {
            const formData = new FormData();
            formData.append("file", photo);
            const response = await actions.addImages(formData);

            if (response?.url) {
                actions.setUserImage(response.url);
            } else {
                console.error("Error al recibir la URL de la imagen.");
            }
        } catch (error) {
            console.error("Error al subir la imagen:", error);
        } finally {
            setIsImageUploading(false); // Finalizar la carga de la imagen
        }
    };

    const editUser = (name, lastname, phone, image, birthdate) => {
        actions.editUser(name, lastname, phone, image, birthdate)
    }

    return (
        <>
            <Navbar buttonAdmin={role == "admin" ? <button onClick={handleAdmin} className="btn btn-danger me-2">Administrador</button> : ''} />
            <div className="container">
                <div className="d-flex justify-content-between align-items-end">
                    <h1>Bienvenido {username}</h1>
                    <span className="material-symbols-outlined fs-1" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        edit
                    </span>
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content bg-dark p-4">
                                <div className="d-flex justify-content-between">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Editar perfil</h1>
                                    <button type="button" className="btn btn-dark text-light fw-bold fs-5" data-bs-dismiss="modal" aria-label="Close">X</button>
                                </div>
                                <div className="py-4 justify-content-between row gap-4">
                                <div className="col-12 col-sm-5">
                                        <label htmlFor="name" className="form-label fs-5">Nombre</label>
                                        <input type="text" className="form-control" id="name" value={name} onChange={(e) => actions.setName(e.target.value)} />
                                    </div>
                                    <div className="col-12 col-sm-5">
                                        <label htmlFor="lastname" className="form-label fs-5">Apellido</label>
                                        <input type="text" className="form-control" id="lastname" value={lastname} onChange={(e) => actions.setLastname(e.target.value)} />
                                    </div>
                                    <div className="col-12 col-sm-5">
                                        <label htmlFor="phone" className="form-label fs-5">Teléfono</label>
                                        <input type="text" className="form-control" id="phone" value={userPhone} onChange={(e) => actions.setUserPhone(e.target.value)} />
                                    </div>
                                    <div className="col-12 col-sm-5">
                                        <label htmlFor="birthdate" className="form-label fs-5">Fecha de nacimiento</label>
                                        <input type="date" className="form-control" id="birthdate" value={new Date(birthdate).toLocaleDateString('es-ES', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric'
                                    })} onChange={(e) => actions.setBirthdate(e.target.value)} />
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="image" className="form-label fs-5">Foto</label>
                                        <input type="file" className="form-control" id="image" onChange={(e) => addImages(e.target.files[0])} ref={fileInputRef} />
                                    </div>
                                </div>
                                <div className="d-flex justify-content-end gap-3">
                                        <button type="button" className="btn btn-secondary fs-5 " data-bs-dismiss="modal">Cerrar</button>
                                        <button onClick={() => editUser(name, lastname, userPhone, userImage, birthdate)} type="submit" className="btn btn-warning fs-5 me-3" data-bs-dismiss="modal" disabled={isImageUploading}>Guardar</button>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border rounded my-5 p-4">
                    <div className="row gap-4">
                        <div className="row gap-5 col-12 col-sm-10">
                            <div className="row gap-4">
                                <div className="col-12 col-sm-3">
                                    <label className="fs-5 pb-2 fw-bold">Nombre</label>
                                    <p>{name}</p>
                                </div>
                                <div className="col-12 col-sm-3">
                                    <label className="fs-5 pb-2  fw-bold">Apellidos</label>
                                    <p>{lastname}</p>
                                </div>
                                <div className="col-12 col-sm-3">
                                    <label className="fs-5 pb-2  fw-bold">Email</label>
                                    <p>{email}</p>
                                </div>
                            </div>
                            <div className="row gap-4">
                                <div className="col-12 col-sm-3">
                                    <label className="fs-5 pb-2 fw-bold">Fecha de nacimiento</label>
                                    <p>{new Date(birthdate).toLocaleDateString('es-ES', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric'
                                    })}</p>
                                </div>
                                <div className="col-12 col-sm-3">
                                    <label className="fs-5 pb-2  fw-bold">Teléfono</label>
                                    <p>{userPhone ? userPhone : 'Sin especificar'}</p>
                                </div>
                                <div className="col-12 col-sm-3">
                                    <button className="btn btn-secondary">Cambiar contraseña</button>
                                </div>
                            </div>

                        </div>
                        <div className="col-12 col-sm-2">
                            {userImage && userImage !== '' ? (
                                <img className={styles.avatar} src={userImage} alt="User Avatar" />
                            ) : (
                                <img className={styles.avatar} src={avatar} alt="Default Avatar" />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
