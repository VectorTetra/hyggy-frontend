function MainPageHeaderUser(props) {
    return (
        <div id="mainPageHeaderLogoContainer"> 
			<img id="mainPageHeaderUserPhoto" src={props.userPhotoUrl} alt="logo" />
            <a href="../PageAuthentication/authentication.html">
                Вхід
            </a>
        </div>
    );
}