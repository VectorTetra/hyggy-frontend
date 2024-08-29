function MainPageFooterList(props) {
   
    return (
        <div className="footer-container">
            {props.text.map(item => (
                <div key={item.nameCategory}>
                    <div className="footer-item">{item.nameCategory}</div>
                    {item.listCategory.map(subItem => (
                        <div style={{paddingBottom:"10px"}}>
                        <a className="footer-itemA" href={subItem.urlcategory} key={subItem.name}>
                            {subItem.name}
                        </a>
                        </div>
                    ))}
                </div>
            ))}
			<div>
                <MainPageFooterAddress/>
			</div>
        </div>
    );
}