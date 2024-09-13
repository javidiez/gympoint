
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar";
import useAppContext from "../../store/AppContext";
import styles from "./myProfile.module.css"
import avatar from "../../assets/img/avatar.png"


export const MyProfile = () => {

    const { store, actions } = useAppContext();
    const { token, role, username, name, lastname, email, userImage, userPhone, birthdate, users, userId } = store;
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
    }, [username, name, lastname,userImage, userPhone, birthdate])

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

    const editUser = async (name, lastname, phone, image, birthdate) => {
        const finalImage = image || userImage;
        await actions.editUser(name, lastname, phone, finalImage, birthdate)
        actions.getUsers();
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return (
        <>
            <Navbar buttonAdmin={role == "admin" ? <button onClick={handleAdmin} className="btn btn-danger me-2">Administrador</button> : ''} />
            <div className="container">
                <div className="d-flex justify-content-between align-items-end">
                    <h1>Bienvenido {username}</h1>
                    <span className={`material-symbols-outlined fs-1 ${styles.pencil}`} data-bs-toggle="modal" data-bs-target="#exampleModal">
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
                                        <input type="date" className="form-control" id="birthdate" value={birthdate ? formatDate(birthdate) : ''} onChange={(e) => actions.setBirthdate(e.target.value)} />
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
                {Array.isArray(users) && users
                    .filter(user => user.id == storedUserId)
                    .map((user, index) => (
                        <div className="border rounded my-5 p-4">
                            <div className="row gap-4">
                                <div className="row gap-5 col-12 col-sm-10">
                                    <div className="row gap-4">
                                        <div className="col-12 col-sm-3">
                                            <label className="fs-5 pb-2 fw-bold">Nombre</label>
                                            <p>{user.name ? user.name : 'Sin especificar'}</p>
                                        </div>
                                        <div className="col-12 col-sm-3">
                                            <label className="fs-5 pb-2  fw-bold">Apellidos</label>
                                            <p>{user.lastname ? user.lastname : 'Sin especificar'}</p>
                                        </div>
                                        <div className="col-12 col-sm-3">
                                            <label className="fs-5 pb-2  fw-bold">Email</label>
                                            <p>{user.email}</p>
                                        </div>
                                    </div>
                                    <div className="row gap-4">
                                        <div className="col-12 col-sm-3">
                                            <label className="fs-5 pb-2 fw-bold">Fecha de nacimiento</label>
                                            <p>{new Date(user.birthdate).toLocaleDateString('es-ES', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric'
                                            })}</p>
                                        </div>
                                        <div className="col-12 col-sm-3">
                                            <label className="fs-5 pb-2  fw-bold">Teléfono</label>
                                            <p>{user.phone ? user.phone : 'Sin especificar'}</p>
                                        </div>
                                        <div className="col-12 col-sm-3">
                                            <button className="btn btn-secondary">Cambiar contraseña</button>
                                        </div>
                                    </div>

                                </div>
                                <div className="col-12 col-sm-2">
                                    {user.image && user.image !== '' ? (
                                        <img className={styles.avatar} src={user.image} alt="User Avatar" />
                                    ) : (
                                        <img className={styles.avatar} src={avatar} alt="Default Avatar" />
                                    )}
                                </div>
                            </div>
                        </div>
                    )

                    )}

            </div>
        </>
    )
}
