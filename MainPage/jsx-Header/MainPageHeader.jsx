function MainPageHeader(props) {
	
	return (
	 	<div id="mainPageHeader">
	 		<MainPageSale infoSales = {props.headerData.info}/>
			<div id="mainPageHeaderLogoContainer">			 
				<MainPageHeaderLogo logoHeight={props.headerData.hyggyLogo.height}
				logoWidth={props.headerData.hyggyLogo.width}
				logoUrl={props.headerData.hyggyLogo.url} />
				<MainPageHeaderMenu photoHeight={props.headerData.menuPhoto.height}
				photoWidth={props.headerData.menuPhoto.width}
				photoUrl={props.headerData.menuPhoto.url} />
				<MainPageHeaderSearch searchText={props.headerData.menuSearch.text} />
				<MainPageHeaderUser userPhotoHeight={props.headerData.userPhoto.height}
				userPhotoWidth={props.headerData.userPhoto.width}
				userPhotoUrl={props.headerData.userPhoto.url}/>
				<MainPageHeaderBasket basketPhotoHeight={props.headerData.basketPhoto.height}
				basketPhotoWidth={props.headerData.basketPhoto.width}
				basketPhotoUrl={props.headerData.basketPhoto.url}/>
			</div>
				<hr id="horizontalBar" />
			<div id="mainPageHeaderLogoContainer">
				<MainPageHeaderGeo GeoPhotoHeight={props.headerData.GeoPhoto.height}
				GeoPhotoWidth={props.headerData.GeoPhoto.width}
				GeoPhotoUrl={props.headerData.GeoPhoto.url}
				GeoKursorHeight={props.headerData.GeoKursor.height}
				GeoKursorWidth={props.headerData.GeoKursor.width}
				GeoKursorUrl={props.headerData.GeoKursor.url}/>
				<MainPageHeaderNavbar navBar={props.headerData.navBar}/>
			</div>
				<hr id="horizontalBar2" />
		</div>			
	)
}
