function MainPageHeaderMenu(props) {
    return (
        <div id="mainPageHeaderLogoContainer"> 
			<img id="mainPageHeaderMenu" src={props.photoUrl} alt="logo" />
            <a href="../MainPage/index.html">
                Меню
            </a>
        </div>
    );
}