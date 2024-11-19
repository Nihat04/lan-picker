import styles from "../styles/index.module.css";

import React from "react";
import Image from "next/image";

import { Player } from "../model";
import classNames from "classnames";

export const MatchMini = ({
    player,
    rightSide = false,
}: {
    player: Player;
    rightSide?: boolean;
}) => {
    return (
        <div
            className={classNames(styles["match-mini"], {
                [styles["match-mini--right"]]: rightSide,
            })}
        >
            <Image
                className={classNames(styles["player__img"], {
                    [styles["player__img--right"]]: rightSide,
                })}
                src={player.avatarUrl}
                alt={`Аватарка игрока ${player.name}`}
                width={40}
                height={40}
            />
            <div>
                <p className={styles["player__name"]}>{player.name}</p>
                <p className={styles["player__real-name"]}>{player.realName}</p>
            </div>
        </div>
    );
};
