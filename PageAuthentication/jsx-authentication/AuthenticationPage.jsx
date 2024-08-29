function AuthenticationPage(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Ищем пользователя с введенным email
        const user = props.AuthenticationPage.AuthenticationInfo.find(user => user.email === email);
        console.log('user', user);
        // Проверяем, совпадают ли введенный пароль и email
        if (user && user.password === password) {
            setErrorMessage(''); 
            alert("Вхід здійснено успішно")
        } else {
            setErrorMessage('');
            alert("E-mail або пароль не вірні")
        }
    };

    return (
        <div className="maincontainer">
            <div className="formcontainer">
                <form onSubmit={handleSubmit}>
                    <div className="caption">Вхід</div>
                    <div>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            pattern="^[A-Za-z.-_]{3,}@[A-Za-z]+\.[A-Za-z]+$"
                            placeholder="E-mail"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="пароль"
                        />
                    </div>
                    {errorMessage && <div className="errormessage">{errorMessage}</div>}
                    
                    <button type="submit" className="submitbutton">Увійти</button>
                    
                </form>

                <div className="forgotpasswordlink">
                    <a href="../PagePasswordReset/PasswordReset.html">Забули пароль?</a>
                </div>
                <div>
                    <h2 className="h2">Створити новий обліковий запис</h2>
                    <div className="features">
                        <ul className="featuresul">
                            <li className="featuresil">Відстежуйте ваші посилки від замовлення до доставки</li>
                            <li className="featuresil">Зберігайте історію замовлень</li>
                            <li className="featuresil">Додавайте товари до списку бажань</li>
                            <li>Зберігайте інформацію для майбутніх покупок</li>
                        </ul>
                    </div>
                </div>
                <div>
                    <button
                        className="submitbutton2"
                        onClick={() => window.location.href = '../PageRegistration/Registration.html'}>
                        Створити новий обліковий запис
                    </button>
                </div>
            </div>
        </div>
    );
}
