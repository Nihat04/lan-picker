import { createStore } from "redux";
import data from "../db/main.json";
import { writeJSON } from "fs-extra/esm";

const defaultState = { ...data };

export const MOVE_PLAYER = "movePlayer";

function reducer(state = defaultState, action) {
    switch (action.type) {
        case MOVE_PLAYER:
            state.teams[action.payload.team.id].players.push(
                action.payload.player
            );
            saveChanges(state);
            return state;
        default:
            return state;
    }
}

function saveChanges(state) {
    writeJSON("../db/main.json", state);
}

export const store = createStore(reducer);
