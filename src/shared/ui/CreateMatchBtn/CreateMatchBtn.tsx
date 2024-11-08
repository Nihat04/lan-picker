import { player } from "@/src/entities/player";
import { createMatch } from "@/src/features/mongoDB";
import { match } from "@/src/entities/match/model";
import React from "react";

const CreateMatchBtn = ({ players }: { players: player[] }) => {
    return (
        <button
            onClick={() => {
                const match: match = {
                    date: new Date(),
                    team1: {
                        captain: players[0],
                        name: "Дабдуди",
                        players: [
                            players[0],
                            players[1],
                            players[2],
                            players[3],
                            players[4],
                        ],
                    },
                    team2: {
                        captain: players[5],
                        name: "Геи",
                        players: [
                            players[5],
                            players[6],
                            players[7],
                            players[8],
                            players[9],
                        ],
                    },
                };

                createMatch(match).then(console.log);
            }}
        >
            Create Match
        </button>
    );
};

export default CreateMatchBtn;
