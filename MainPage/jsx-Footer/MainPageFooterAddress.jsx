function MainPageFooterAddress(props) {
  
  return (
      <div className="footer-address"> 
        <div>{props.caption1}</div>
        <br></br>
        <div>{props.city1}</div>
        <div>{props.address1}</div>
      </div>			
  );
}