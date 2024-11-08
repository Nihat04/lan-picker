import classNames from "classnames";
import styles from "./page.module.css";

import { MatchMini } from "@/src/entities/player";
import { getPlayers } from "@/src/features/mongoDB";
import CreateMatchBtn from "@/src/shared/ui/CreateMatchBtn/CreateMatchBtn";

export default async function Home() {
    const players = await getPlayers();

    return (
        <>
            <main>
                <section className={styles["match-section"]}>
                    <div className={styles["match"]}>
                        <div
                            className={classNames(
                                styles["left-team"],
                                styles["team"]
                            )}
                        >
                            <ul className={styles["team-players"]}>
                                {players.map((player, index) => (
                                    <li key={index}>
                                        <MatchMini player={player} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={styles["match__info"]}></div>
                        <div
                            className={classNames(
                                styles["right-team"],
                                styles["team"]
                            )}
                        >
                            <ul className={styles["team-players"]}>
                                {players.map((player, index) => (
                                    <li key={index}>
                                        <MatchMini
                                            player={player}
                                            rightSide={true}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>
            </main>
            <CreateMatchBtn players={players} />
        </>
    );
}
