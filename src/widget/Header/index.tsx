import styles from "./styles/index.module.css";

import React from "react";
import Link from "next/link";
import Image from "next/image";

import { NavLink } from "./model";

const NAV_LINKS: NavLink[] = [
    { label: "Главная", path: "/" },
    { label: "Матчи", path: "/matches" },
];

const Header = () => {
    return (
        <header className={styles["header"]}>
            <nav className={styles["header__nav"]}>
                <ul className={styles["header__nav-list"]}>
                    {NAV_LINKS.map((link, index) => (
                        <li className={styles["header__nav-item"]} key={index}>
                            <Link
                                className={styles["header__nav-link"]}
                                href={link.path}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className={styles["header__profile"]}>
                <p className={styles["header__profile-name"]}>Nihat</p>
                <Image
                    className={styles["header__profile-img"]}
                    width="30"
                    height="30"
                    src="https://avatars.fastly.steamstatic.com/c284c1bc130bf5b2e2b2ca725b913df69959776c_full.jpg"
                    alt="Фото профиля"
                />
            </div>
        </header>
    );
};

export default Header;
