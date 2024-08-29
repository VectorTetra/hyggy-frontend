function MainPageHeaderBasket(props) {
    return (
        <div id="mainPageHeaderLogoContainer"> 
			<img id="mainPageHeaderBasketPhoto" src={props.basketPhotoUrl} alt="logo" />
            <a href="../MainPage/index.html">
                Кошик
            </a>
        </div>
    );
}