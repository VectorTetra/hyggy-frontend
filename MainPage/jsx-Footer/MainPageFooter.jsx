function MainPageFooter(props) {
	return (
		<div className="footer">
			<div className="footer-container">
			<MainPageFooterList text={props.footerData.category}/>
			<MainPageFooterAddress 
			caption1={props.footerData.address.caption}
			city1 = {props.footerData.address.city}
			address1 = {props.footerData.address.address}/>
			</div>

			<div className="footer-messenger">
            <MainPageFooterMessenger messenger={props.footerData.messenger}/>
			</div>
		</div>		
	)
}
  