import Link from "next/link";
import styles from "./styles/page.module.css";

import { getMatches } from "@/src/features/mongoDB";

export default async function Home() {
    const matches = await getMatches();
    console.log(matches);

    return (
        <>
            <main>
                <section className={styles["matches"]}>
                    <ul className={styles["matches__list"]}>
                        {matches.map((match) => (
                            <li
                                className={styles["matches__item"]}
                                key={match._id?.toString()}
                            >
                                <Link href={`/match/${match._id}`}>
                                    <p className={styles['match__name']}>
                                        <b>{match.team1.name}</b> vs{" "}
                                        <b>{match.team2.name}</b>
                                    </p>
                                    <p className={styles["match__date"]}>
                                        {match.date.toLocaleString("ru-RU")}
                                    </p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            </main>
        </>
    );
}
