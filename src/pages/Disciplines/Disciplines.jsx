
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar";
import useAppContext from "../../store/AppContext";
import bodyPump from "../../assets/img/body-pump.jpg"
import styles from "./disciplines.module.css"




export const Disciplines = () => {

  const { store } = useAppContext();
  const { token } = store;
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [token])

  const handleAdmin = () => {
    navigate('/admin')
}

  return (
    <>
      <Navbar button={<button onClick={handleAdmin} className="btn btn-danger">Administrador</button>} />
      <div className="container">
        <h1 className="mb-5">Disciplinas</h1>
        <div className="row">
            <div className="col-12 col-sm-3 mb-5 fs-2 text-center">
                <p className="pb-2">Body Pump</p>
                <img className={styles.img_disciplines} src={bodyPump}/>
            </div>
            <div className="col-12 col-sm-3 mb-5 fs-2 text-center">
                <p className="pb-2">Body Pump</p>
                <img className={styles.img_disciplines} src={bodyPump}/>
            </div>
            <div className="col-12 col-sm-3 mb-5 fs-2 text-center">
                <p className="pb-2">Body Pump</p>
                <img className={styles.img_disciplines} src={bodyPump}/>
            </div>
            <div className="col-12 col-sm-3 mb-5 fs-2 text-center">
                <p className="pb-2">Body Pump</p>
                <img className={styles.img_disciplines} src={bodyPump}/>
            </div>
            <div className="col-12 col-sm-3 mb-5 fs-2 text-center">
                <p className="pb-2">Body Pump</p>
                <img className={styles.img_disciplines} src={bodyPump}/>
            </div>
            <div className="col-12 col-sm-3 mb-5 fs-2 text-center">
                <p className="pb-2">Body Pump</p>
                <img className={styles.img_disciplines} src={bodyPump}/>
            </div>
        </div>
        
      </div>
    </>
  )
}
