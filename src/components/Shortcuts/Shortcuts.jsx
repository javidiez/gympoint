
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./shortcuts.module.css"
import useAppContext from "../../store/AppContext";


export const Shortcuts = () => {

    const { store, actions } = useAppContext();
    const { username } = store;
    const navigate = useNavigate();

    

    return (
        <></>
    )
}
