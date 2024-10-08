"use client";
import styles from "../css/FAQStyles.module.css";
import CommonQuestions from "./CommonQuestions";
import ContactSection from "./ContactSection";
import FAQSection from "./FAQSection";

export default function FAQPage(props) {
    return (
        <div className={styles.pagecontainer}>
            <div className={styles.leftcontainer}>
                <div className={styles.faqcontainer}>
                    <h2>{props.faqPage.caption.textcaption}</h2>
                    {props.faqPage.paragraph.map(item => (
                        <div key={item.textparagraph} className={styles.faqcontainertext}>{item.textparagraph}</div>
                    ))}

                    <div>
                        <FAQSection faqPage={props.faqPage} />
                    </div>
                    <div>
                        <CommonQuestions faqPage={props.faqPage} />
                    </div>
                </div>
            </div>
            <div className={styles.rightcontainer}>
                <ContactSection faqPage={props.faqPage} />
            </div>
        </div>
    );
}
