function MainPageHeaderSearch(props) {
    return (
        <div id="mainPageHeaderLogoContainer">
            <input
                type="text"
                placeholder={props.searchText}
                //value={searchTerm}
                // onChange={handleInputChange}
            />
            {/* <ul>
                {filteredItems.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul> */}
        </div>
    );
}