
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar";
import useAppContext from "../../store/AppContext";
import { CardTeacher } from "../../components/CardTeacher/CardTeacher.jsx";


export const Teachers = () => {

    const { store, actions } = useAppContext();
    const { token, teachers } = store;
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/');
        }
    }, [token])

    useEffect(() => {
        if (teachers.length === 0) {
            actions.getTeachers();
        }
    }, [teachers, actions]);

    const handleAdmin = () => {
        navigate('/admin')
    }

    return (
        <>
            <Navbar buttonAdmin={<button onClick={handleAdmin} className="btn btn-danger me-2">Administrador</button>} />
            <div className="container pb-5">
            <h1 className="mb-5">Equipo humano</h1>
                <div className="row gap-4 justify-content-center">
            {teachers?.map((teacher, index) => (
                    <CardTeacher key={index} name={teacher.name} lastname={teacher.lastname} image={teacher.image} job={teacher.job} />
                ))}
                </div>
            </div>

        </>
    )
}
