function MainPageHeaderLogo(props){
	return(
		<div id="mainPageHeaderLogoContainer">
			<a href="../MainPage/index.html">
				<img id="mainPageHeaderLogo" src={props.logoUrl} alt="logo"/>
			</a>
		</div>
	)
}