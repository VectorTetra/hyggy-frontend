import styles from "./../../styles/MainPageBody-styles.module.css";

function MainPageBodyAboutUs(props) {
    return (
        <div className={styles["brand-container"]}>
            {props.aboutus.map((item, index) => (
                <div key={index} className={styles["brand-item"]}>
                    <a style={{ textDecoration: "none" }} href={item.urlpage}>
                        <img className={styles["imageaboutus"]} src={item.urlimage} alt={item.captoin} />
                        <div className={styles["aboutus-textcaption"]}>{item.captoin}</div>
                        <div className={styles["aboutus-text"]}>{item.text}</div>
                    </a>
                </div>
            ))}
        </div>
    );
}

export default MainPageBodyAboutUs;
