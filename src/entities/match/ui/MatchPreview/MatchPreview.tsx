'use client';

import styles from './MatchPreview.module.css';

import classNames from 'classnames';

import { TeamPlayer } from '../../../player';
import { Match, MatchStatus } from '../../model';
import { Team } from '@/src/entities/team';

export function MatchPreview({ match }: { match: Match }) {
    const renderInfo = () => {
        switch (match.status.action) {
            case MatchStatus.playerPick:
                return (
                    <ul className={styles['info-list']}>
                        {match.players?.map((player, index) => (
                            <div
                                key={index}
                                className={styles['player-pick-info']}
                            >
                                <TeamPlayer player={player} />
                                <div className={styles['btns-wrapper']}>
                                    <button className={styles['pick-btn']}>
                                        Выбрать
                                    </button>
                                </div>
                            </div>
                        ))}
                    </ul>
                );
        }
    };

    const renderTeam = (team: Team, rightSide: boolean = false) => {
        return (
            <>
                <p className={styles['team-name']}>{team.name}</p>
                <div className={styles['team-captain']}>
                    <TeamPlayer
                        player={team.captain}
                        rightSide={rightSide}
                        isCap={true}
                    />
                </div>
                <ul className={styles['team-players']}>
                    {team.players.map((player, index) => (
                        <li key={index}>
                            {player && (
                                <TeamPlayer
                                    player={player}
                                    rightSide={rightSide}
                                />
                            )}
                        </li>
                    ))}
                </ul>
            </>
        );
    };

    return (
        <div className={styles['match']}>
            <div className={classNames(styles['left-team'], styles['team'])}>
                {renderTeam(match.teamA)}
            </div>
            <div className={styles['info']}>{renderInfo()}</div>
            <div className={classNames(styles['right-team'], styles['team'])}>
                {renderTeam(match.teamB, true)}
            </div>
        </div>
    );
}
