
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo_gym.png"
import styles from "./loggedHome.module.css"
import { Navbar } from "../../components/Navbar/Navbar";
import useAppContext from "../../store/AppContext";
import { ClassesList } from "../../components/ClassesList/ClassesList";
import { Shortcuts } from "../../components/Shortcuts/Shortcuts";
import { ChatBot } from "../../components/ChatBot/ChatBot";



export const LoggedHome = () => {

  const { store } = useAppContext();
  const { token, role } = store;
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
      <Navbar buttonAdmin={role == "admin" ? <button onClick={handleAdmin} className="btn btn-danger me-2">Administrador</button> : ''} />
      <div className="container">
        <div className="row pt-4 pb-5">
          <div className="col-12 col-sm-10 mb-4">
            <ClassesList />
          </div>
          <div className="col-12 col-sm-2">
            <div className="row mb-3 gap-3 justify-content-evenly">
              <div className="col-5 col-sm-12">
                <Shortcuts title={"Mis reservas"} icon={<span className="material-symbols-outlined fs-1">
                  event_available
                </span>} link={'/my-inscriptions'} />
              </div>
              <div className="col-5 col-sm-12">
                <Shortcuts title={"Reservar clase"} icon={<span className="material-symbols-outlined fs-1">
                  calendar_add_on
                </span>} link={''} />
              </div>
            </div>
            <div className="row gap-3 justify-content-evenly">
              <div className="col-5 col-sm-12">
                <Shortcuts title={"Mi gimnasio"} icon={<span className="material-symbols-outlined fs-1">
                  apartment
                </span>} link={''} />
              </div>
              <div className="col-5 col-sm-12">
                <Shortcuts title={"Mi perfil"} icon={<span className="material-symbols-outlined fs-1">
                  person
                </span>} link={''} />
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
