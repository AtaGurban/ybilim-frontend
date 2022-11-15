import React from 'react';
import styles from './footer.module.css'
import whiteLogo from './white_logo.png'
import copy from './copy.png'

const Footer = () => {
    return (
        <footer className={`${styles.footer} mt-5`}>
            <div className={`${styles.container} ${styles.footer_container}`}>
                <div className={`${styles.footer_logo}`}><img src={whiteLogo} alt=""/></div>
                <ul className={`${styles.footer_menu}`}>
                    <a href="https://lomay.yonekey.com"><li>LomaýSöwda</li></a>
                    <a href="https://developers.yonekey.com"><li>Developers</li></a>
                    <a href="https://marketing.yonekey.com"><li>Marketing</li></a>
                    <a href="https://ybilim.yonekey.com"><li>Bilim</li></a>
                </ul>
                <p><img src={copy} alt=""/>2018-2022 ÝÖNEKEÝ H/K</p>
            </div>
        </footer>
    );
};

export default Footer;