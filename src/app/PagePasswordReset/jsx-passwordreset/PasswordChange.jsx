"use client";
import React from "react";
import styles from '../css/passwordResetStyle.module.css';

export default function PasswordChange({ passwordResetData }) {
    const [newPassword, setNewPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [message, setMessage] = React.useState('');

    // Получаем userId из параметра запроса
    const userId = new URLSearchParams(window.location.search).get('reset');
    const user = passwordResetData.Users.find(user => user.userId === userId);

    // Проверка на корректность пароля
    const isPasswordValid = (password) => {
        // Минимум 8 символов, хотя бы одна заглавная буква и хотя бы одна цифра
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return passwordRegex.test(password);
    };

    // Обработка отправки формы
    const handleSubmit = (e) => {
        e.preventDefault();

        // Проверка на заполненность обоих полей
        if (!newPassword || !confirmPassword) {
            setMessage('');
            alert("Всі поля повинні бути заповнені");;
            return;
        }

        // Проверка совпадения паролей
        if (newPassword !== confirmPassword) {
            setMessage('');
            alert("Паролі не збігаються");
            return;
        }

        // Проверка валидности нового пароля
        if (!isPasswordValid(newPassword)) {
            setMessage('');
            alert("Пароль повинен містити мінімум 8 символів, включати хоча б одну заглавну букву і одну цифру.");
            return;
        }

        // Проверка наличия пользователя и обновление пароля
        if (user) {
            user.newPassword = newPassword;
            setMessage('');
            alert("Ваш пароль успішно оновлено!");
        } else {
            setMessage('');
            alert("Неправильне посилання для скидання паролю.");
        }
    };

    // Обработка отмены
    const handleCancel = () => {
        setNewPassword('');
        setConfirmPassword('');
        setMessage('');
    };

    return (
        <div className={styles.maincontainer}>
            <div className={styles.formcontainer}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.caption}>Введіть новий пароль</div>

                    <input className={styles.formInput}
                        type="password"
                        placeholder="Введіть новий пароль"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />


                    <input className={styles.formInput}
                        type="password"
                        placeholder="Повторіть новий пароль"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <div>
                        <button type="submit" className={styles.submitbutton}>Підтвердити</button>
                    </div>
                    <button type="button" className={styles.submitbutton2} onClick={handleCancel}>Скасувати</button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
}
