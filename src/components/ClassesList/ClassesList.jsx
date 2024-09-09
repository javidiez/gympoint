
import React, { useContext, useState } from "react";
import useAppContext from "../../store/AppContext";
import { Link, useNavigate } from "react-router-dom";
import styles from "./classesList.module.css"
import { Class_ } from "../Class_/Class_";


export const ClassesList = () => {

	const { store, actions } = useAppContext();
	const { email, password } = store;
    const navigate = useNavigate();

    return(
        <div>
            <Class_/>
        </div>
    )
}
