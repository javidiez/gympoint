import React, { useContext, useState, useEffect } from "react";
import useAppContext from "../../store/AppContext";
import styles from "./classes_.module.css";
import { Navbar } from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";

export const Classes_ = () => {
    const { store, actions } = useAppContext();
    const { classes, userId, inscriptions, disciplines } = store;
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        actions.getClasses();
        actions.getInscriptions();
        actions.getDisciplines();
    }, []);

    const now = new Date();
    const todayDate = now.toISOString().split('T')[0];
    const currentTime = now.toTimeString().split(' ')[0].substring(0, 5);

    const addInscription = (class_id, user_id) => {
        actions.addInscription(class_id, user_id);
    }

    const deleteInscription = async (id) => {
        await actions.deleteInscription(id);
    };

    const storedUserId = parseInt(localStorage.getItem('userId'), 10);

    const handleAdmin = () => {
        navigate('/admin')
    }

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const abailableClasses = classes.filter(class_ => {
        const classDate = class_.date;
        const classStartTime = class_.start_time;
        return classDate > todayDate || (classDate === todayDate && classStartTime >= currentTime);
    })

    const filteredClasses = abailableClasses.filter(class_ =>
        searchTerm === "" || class_.discipline.id === parseInt(searchTerm, 10)
    );

    return (
        <>
            <Navbar buttonAdmin={<button onClick={handleAdmin} className="btn btn-danger me-2">Administrador</button>} />
            <div className={`container`}>
                <div className="d-flex justify-content-between align-items-end">
                    <h1>Reserva clase</h1>
                    <div className="d-flex align-items-center gap-1">
                        <span className="material-symbols-outlined">
                            filter_alt
                        </span>
                        <select className={styles.search} value={searchTerm} onChange={handleSearch}>
                            <option value={''}>Todas las disciplinas</option>
                            {disciplines?.map((discipline) => (
                                <option key={discipline.id} value={discipline.id}>
                                    {discipline.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="table-responsive">
                    <table className={`table align-middle table-sm text-center table-hover table-dark mt-5 fs-5`}>
                        <thead>
                            <tr className={styles.tableHeader}>
                                <th scope="col">Disciplina</th>
                                <th scope="col">Horario</th>
                                <th scope="col">Fecha</th>
                                <th scope="col">Sala</th>
                                <th scope="col">Profesor</th>
                                <th scope="col">Modalidad</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody className={styles.tbody_table}>
                            {filteredClasses.length > 0 ? (
                                filteredClasses
                                    .filter(class_ => {
                                        const classDate = class_.date;
                                        const classStartTime = class_.start_time;
                                        return classDate > todayDate || (classDate === todayDate && classStartTime >= currentTime);
                                    })
                                    .sort((a, b) => {
                                        const dateA = new Date(`${a.date}T${a.start_time}`);
                                        const dateB = new Date(`${b.date}T${b.start_time}`);
                                        return dateA - dateB;
                                    })
                                    .map(class_ => {
                                        const userInscription = inscriptions.find(inscription =>
                                            inscription.class.class_id === class_.id && inscription.user.user_id === storedUserId
                                        );

                                        return (
                                            <tr key={class_.id}>
                                                <td className="text-nowrap pe-2">
                                                    <span className='text-light'>
                                                        <div className="d-flex gap-3">
                                                            {class_.discipline && class_.discipline.effort === "low" ?
                                                                <div className="d-flex gap-3 align-items-center"><div className={styles.low}></div> </div> : class_.discipline.effort === "moderate"
                                                                    ? <div className="d-flex gap-3 align-items-center"><div className={styles.moderate}></div></div>
                                                                    : <div className="d-flex gap-3 align-items-center"><div className={styles.high}></div></div>}
                                                            {class_.discipline.name.charAt(0).toUpperCase() + class_.discipline.name.slice(1)}
                                                        </div>
                                                    </span>
                                                </td>
                                                <td className="text-nowrap pe-2">
                                                    <span className='text-light'>{class_.start_time} - {class_.end_time}</span>
                                                </td>
                                                <td className="text-nowrap pe-2">
                                                    <span className='text-light'>{new Date(class_.date).toLocaleDateString('es-ES', {
                                                        day: '2-digit',
                                                        month: '2-digit',
                                                        year: 'numeric'
                                                    })}</span>
                                                </td>
                                                <td className="text-nowrap pe-2">
                                                    <span className='text-light'>{class_.room.name.charAt(0).toUpperCase() + class_.room.name.slice(1)}</span>
                                                </td>
                                                <td className="text-nowrap pe-2">
                                                    <span className='text-light pe-1'>
                                                        {class_.teacher.name.charAt(0).toUpperCase() + class_.teacher.name.slice(1)}
                                                    </span>
                                                    <span className='text-light'>
                                                        {class_.teacher.lastname.charAt(0).toUpperCase() + class_.teacher.lastname.slice(1)}
                                                    </span>
                                                </td>
                                                <td className="text-nowrap">
                                                    <span className='text-light'> {class_.type.charAt(0).toUpperCase() + class_.type.slice(1)} </span>
                                                </td>
                                                <td>
                                                    {!userInscription ? (
                                                        <button
                                                            onClick={() => addInscription(class_.id, storedUserId)}
                                                            className="btn btn-success p-0 fs-5 px-2"
                                                        >
                                                            Reservar
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={() => deleteInscription(userInscription.id)}
                                                            className="btn btn-danger p-0 fs-5 px-2"
                                                        >
                                                            Cancelar
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })
                            ) : (
                                <tr>

                                    <td className="text-start">No se encontraron clases</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
