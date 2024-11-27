import { Maps, Match, MatchStatus } from '@/src/entities/match/model';
import { Player, PlayerRole } from '@/src/entities/player';
import { getPlayer, getPlayers, postMatch } from '@/src/features/mongoDB';
import React from 'react';
import { convertObjectIdToString } from '@/src/features/mongoDB';

const PLAYERS_COUNT = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default async function CreateMatch() {
    const playersList = convertObjectIdToString(await getPlayers()) as Player[];

    const getMatchPlayers = async (data: FormData, captainsNames: string[]) => {
        'use server'

        const matchPlayersNames = data.getAll('players');
        const matchPlayers = [];

        for (const player of matchPlayersNames) {
            if (typeof player !== 'string') throw new Error();
            if(captainsNames.includes(player)) continue;

            matchPlayers.push(await getPlayer(player));
        }

        return matchPlayers;
    };

    const getFormString = async (data: FormData, propName: string): Promise<string> => {
        'use server'

        const value = data.get(propName)?.valueOf();

        if (typeof value === 'object')
            throw new Error(`${propName} is object`);
        if (!value)
            throw new Error(`${propName} is invalid`);

        return value;
    };

    const randomiseCaptains = async (type: string) => {
        'use server'

        let captainPlayers = playersList;

        if (type === 'randomCaptain') {
            captainPlayers = captainPlayers.filter((player) =>
                player.roles.includes(PlayerRole.captain)
            );
        }

        const captainA =
            captainPlayers[Math.floor(Math.random() * captainPlayers.length)]
                .name;

        captainPlayers = captainPlayers.filter(
            (player) => player.name !== captainA
        );

        const captainB =
            captainPlayers[Math.floor(Math.random() * captainPlayers.length)]
                .name;

        return [
            captainA,
            captainB
        ]
    };

    const createMatch = async (data: FormData) => {
        'use server';

        const captainType = await getFormString(data, 'captainType').catch(() => null);
        let captainA = await getFormString(data, 'teamACaptain');
        let captainB = await getFormString(data, 'teamBCaptain');

        if (captainType) {
            [ captainA, captainB ] = await randomiseCaptains(captainType);
        }

        const matchPlayers = await getMatchPlayers(data, [captainA, captainB]);

        const newMatch: Match = {
            date: new Date(),
            teamA: {
                name: 'Team A',
                captain: await getPlayer(captainA),
                players: [],
            },
            teamB: {
                name: 'Team B',
                captain: await getPlayer(captainB),
                players: [],
            },
            status: {
                action: MatchStatus.playerPick,
                side: 'teamA',
            },
            players: [...matchPlayers],
            map: Maps.NaN,
        };

        postMatch(newMatch);
    };

    const renderSelectPlayer = (name?: string) => {
        return (
            <select name={name || 'players'} id="players-select">
                {playersList.map((player, index) => (
                    <option key={index}>{player.name}</option>
                ))}
            </select>
        );
    };

    return (
        <main>
            <form action={createMatch}>
                <fieldset>
                    <legend>Новый матч</legend>
                    <fieldset>
                        <legend>Капитаны</legend>
                        {renderSelectPlayer('teamACaptain')}
                        {renderSelectPlayer('teamBCaptain')}
                        <div className="">
                            <input
                                type="radio"
                                name="captainType"
                                value="randomCaptain"
                            />
                            <label>Случайный капитан</label>
                        </div>
                        <div className="">
                            <input
                                type="radio"
                                name="captainType"
                                value="randomPlayer"
                            />
                            <label>Случайный игрок</label>
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>Игроки</legend>
                        {PLAYERS_COUNT.map((playerIndex) => (
                            <div key={playerIndex}>
                                <label>Игрок {playerIndex}</label>
                                {renderSelectPlayer()}
                            </div>
                        ))}
                    </fieldset>
                </fieldset>
                <button type="submit">Создать</button>
            </form>
        </main>
    );
}
