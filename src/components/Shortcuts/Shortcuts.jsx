
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./shortcuts.module.css"
import useAppContext from "../../store/AppContext";


export const Shortcuts = ({ title, icon, link }) => {

    const { store, actions } = useAppContext();
    const navigate = useNavigate();



    return (
        <div className="d-flex flex-column align-items-center">
            <Link to={link} className={styles.link}>
                <div className={`${styles.shortcuts} fs-4`}>
                    <p className="fs-4 pb-2">{title}</p>
                    {icon}
                </div>
            </Link>
        </div>
    )
}
