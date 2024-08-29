function MainPageFooterMessenger(props) {
	return (
        <div className="footer-messenger"> 
            {props.messenger.map(item => (
                <div>
                    <a href={item.urlpage}>
                        <img src={item.urlimages} />
                    </a>
                </div>
            ))}
        </div>
    );
}