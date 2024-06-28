import { createStore } from "redux";
import data from "../db/main.json";

const defaultState = { ...data };

export const MOVE_PLAYER = "movePlayer";

function reducer(state = defaultState, action) {
    switch (action.type) {
        case MOVE_PLAYER:
            state.teams[action.payload.team.id].players.push(
                action.payload.player
            );
            return state;
        default:
            return state;
    }
}

export const store = createStore(reducer);
