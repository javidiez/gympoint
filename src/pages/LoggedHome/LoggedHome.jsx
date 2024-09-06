
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo_gym.png"
import styles from "./loggedHome.module.css"
import { Navbar } from "../../components/Navbar/Navbar";
import useAppContext from "../../store/AppContext";
import { ClassesList } from "../../components/ClassesList/ClassesList";
import { Shortcuts } from "../../components/Shortcuts/Shortcuts";



export const LoggedHome = () => {

  const { store } = useAppContext();
  const { token } = store;
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [token])

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-12 col-7">
            <ClassesList />
          </div>
          <div className="col-12 col-5">
            <Shortcuts/>
          </div>
        </div>
      </div>
    </>
  )
}
