function MainPageHeaderGeo(props) {
    return (
        <div id="mainPageHeaderLogoContainer"> 
			<img id="mainPageHeaderGeoPhoto" src={props.GeoPhotoUrl} alt="GeoPhoto" />
            <a className="geoText" href="../MainPage/index.html">
                Виберіть магазин Hyggy
            </a>
            <img id="mainPageHeaderGeoKursor" src={props.GeoKursorUrl} alt="GeoPhoto" />
        </div>
    );
}