import React from "react";
import styles from "./cardTeacher.module.css";

export const CardTeacher = ({ image, name, lastname, job }) => {

    return (
        <div className="border rounded col-12 col-sm-5 p-3">
            <div className="d-flex align-items-center">
                <div>
                    <img src={image} className={styles.teacher_image} />
                </div>
                <div className="ps-4">
                    <p className="fs-4">{name} {lastname}</p>
                    <p className="fs-5 text-secondary">{job}</p>
                </div>
            </div>
        </div>
    )
}
