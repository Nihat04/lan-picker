import styles from './TeamPlayer.module.css';

import React from 'react';
import Image from 'next/image';

import { Player } from '../../model';
import classNames from 'classnames';
import CrownSVG from '@/src/shared/assets/svg/CrownSVG';

export function TeamPlayer({
    player,
    rightSide = false,
    isCap = false,
}: {
    player: Player;
    rightSide?: boolean;
    isCap?: boolean;
}) {
    return (
        <div
            className={classNames(styles['team-player'], {
                [styles['team-player--right']]: rightSide,
            })}
        >
            <div
                className={classNames(styles['cap-icon'], {
                    [styles['invisible']]: !isCap,
                    [styles['cap-icon--right']]: rightSide,
                })}
            >
                <CrownSVG />
            </div>
            <Image
                className={classNames(styles['player-img'], {
                    [styles['player-img--right']]: rightSide,
                })}
                src={player.avatarUrl}
                alt={`Аватарка игрока ${player.name}`}
                width={40}
                height={40}
            />
            <div>
                <p className={styles['player-name']}>{player.name}</p>
                <p className={styles['player-real-name']}>{player.realName}</p>
            </div>
        </div>
    );
}
