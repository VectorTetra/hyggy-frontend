import React from 'react';
import styles from '../../styles/MainPageHeader-styles.module.css';
function MainPageHeaderSearch(props) {
    return (
        <div className={styles.mainPageHeaderSearchContainer}>
            <input className={styles.inputSearch}
                type="text"
                placeholder={props.searchText}
            />
        </div>
    );
}
export default MainPageHeaderSearch;