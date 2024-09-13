
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar";
import useAppContext from "../../store/AppContext";
import bodyPump from "../../assets/img/body-pump.jpg"
import styles from "./disciplines.module.css"




export const Disciplines = () => {

  const { store, actions } = useAppContext();
  const { token, disciplines } = store;
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [token])

  useEffect(() => {
    actions.getDisciplines()
  }, [])

  const handleAdmin = () => {
    navigate('/admin')
  }

  const disciplineInfo = (discipline_id) => {
    navigate(`/discipline/${discipline_id}`)
  }

  return (
    <>
      <Navbar buttonAdmin={<button onClick={handleAdmin} className="btn btn-danger me-2">Administrador</button>} />
      <div className={`container ${styles.container}`}>
        <h1 className="mb-5">Disciplinas</h1>
        <div className="row">
          {disciplines.map(discipline =>
            <div className="col-12 col-sm-3 mb-5 fs-2 text-center">
              <p className="pb-2">{discipline.name}</p>
              <div onClick={() => disciplineInfo(discipline.id)}>
                <img className={styles.img_disciplines} src={discipline.image} />
            </div>
            </div>
          )}

        </div>

      </div>
    </>
  )
}
