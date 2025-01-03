"use client";
import React from "react";
import styles from "./../../styles/MainPageBody-styles.module.css";
import { Checkbox } from "@mui/material";

export default function MainPageBodySubscriptionForm(props) {
    const [isChecked, setIsChecked] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
        if (e.target.checked) {
            setErrorMessage('');
        }
    };

    const handleSubmit = (e) => {
        if (!isChecked) {
            e.preventDefault();
            setErrorMessage('Щоб відправити форму, необхідно погодитися з умовами.');
        }
    };

    return (
        <div className={styles["form-container"]}>
            <form method="post" id={styles.subscForm} onSubmit={handleSubmit}>
                <div className={styles["form-containerin"]}>
                    <div><h3 className={styles.h3}>{props.caption}</h3></div>
                    <div className={styles["form-containerInput"]}>
                        <input
                            type="text"
                            name="subscrUserName"
                            placeholder="Ваше ім'я"
                            required
                        />
                        <input
                            type="email"
                            name="subscrUserEmail"
                            placeholder="Введіть email"
                            pattern="^[A-Za-z.-_]{3,}@[A-Za-z]+.[A-Za-z]+$"
                            required
                        />
                        <input type="submit" className={styles.inputSubmit} name="subscrSubmit" value="Підписатися на розсилку" />
                    </div>
                    <div style={{ display: 'flex', alignItems: "center", justifyContent: 'center' }}>
                        <Checkbox
                            sx={{
                            color: '#00AAAD',
                            '&.Mui-checked': {
                                color: '#00AAAD',
                            },
                            }}
                            size="small"
                            id={styles.termsCheckbox}
                            onChange={handleCheckboxChange}
                        />
                        <label className={styles["label"]} htmlFor="termsCheckbox">
                            {props.forminfo}
                        </label>
                    </div>
                    {errorMessage && (
                        <div style={{ color: 'red', marginTop: '10px' }}>
                            {errorMessage}
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
}
