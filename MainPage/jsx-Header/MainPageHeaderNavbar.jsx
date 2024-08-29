function MainPageHeaderNavbar(props) {
    return (
			<div style={{ marginLeft: '500px' }} > 
				{
					props.navBar.map(item => (
					<a className="menuText"  href = {item.url}>
                    {item.nameMenu}
                    </a>
					))
				}		
            </div>
    );
}