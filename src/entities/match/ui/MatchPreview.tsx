import styles from "../styles/MatchPreview.module.css";

import classNames from "classnames";
import React from "react";

import { MatchMini } from "../../player";
import { Match } from "../model";

export function MatchPreview({match}: {match: Match}) {

    return (
        <div className={styles["match"]}>
            <div className={classNames(styles["left-team"], styles["team"])}>
                <ul className={styles["team-players"]}>
                    {match.team1.players.map((player, index) => (
                        <li key={index}>
                            <MatchMini player={player} />
                        </li>
                    ))}
                </ul>
            </div>
            <div className={styles["match__info"]}></div>
            <div className={classNames(styles["right-team"], styles["team"])}>
                <ul className={styles["team-players"]}>
                    {match.team2.players.map((player, index) => (
                        <li key={index}>
                            <MatchMini player={player} rightSide={true} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
