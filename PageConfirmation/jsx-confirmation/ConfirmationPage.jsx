function ConfirmationPage(props) {
    const [code, setCode] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Шукаємо користувача по email
        const user = props.confirmation.ConfirmationUser.find(user => user.email === props.email);

        console.log('user', user)
        console.log('email', user.email)
        console.log('confirmationCode', user.confirmationCode)
        console.log('code', code)


        if (user && user.confirmationCode === code) {
            alert('Обліковий запис успішно створено!');
            user.confirmationStatus = true;
            window.location.href = '../MainPage/index.html'; // Перехід поки що на головну, але згодом у особистий кабінет
        } else {
            setErrorMessage('');
            alert('Ви ввели невірний код');
        }
    };

    return (
        <div className="maincontainer">
            <div className="formcontainer">
                <form onSubmit={handleSubmit}>
                    <div className="caption">Підтвердження облікового запису</div>
                    <div>
                        <input
                            type="text"
                            name="Code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="Введіть код"
                        />
                    </div>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <div>
                        <button type="submit" className="submitbutton">Підтвердити</button>
                    </div>
                    <button type="button" className="submitbutton2" onClick={() => setCode('')}>Скасувати</button>
                </form>
            </div>
        </div>
    );
}
