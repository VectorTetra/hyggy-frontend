function EmailInput({ passwordResetData, onSwitchComponent }) {
    const [email, setEmail] = React.useState('');
    const [message, setMessage] = React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = passwordResetData.Users.find(user => user.email === email);

        if (user) {
            // Генерація ссилки скидання паролю
            const resetLink = `${window.location.href}?reset=${user.userId}`;
            user.resetLink = resetLink;

            setMessage('');
            alert("Посилання для скидання паролю відправлено на ваш e-mail.");
        } else {
            setMessage('');
            alert("Користувача з таким e-mail не знайдено");
        }
    };

    return (
        <div className="maincontainer">
            <div className="formcontainer">
                <form onSubmit={handleSubmit}>
                    <div className="caption">Забули пароль?</div>
                    <div>
                        <input
                            type="email" 
                            placeholder="Введіть e-mail" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <button type="submit" className="submitbutton">Надіслати</button>
                    </div>
                    <button type="button" className="submitbutton2" onClick={() => setEmail('')}>Скасувати</button>
                </form>
            </div>
        </div>
    );
}
