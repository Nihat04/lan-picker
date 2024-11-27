'use server'

let inSearchPlayers = 0;

export async function addPlayerToQueue() {
    inSearchPlayers++;
}

export async function removePlayerFromQueue() {
    inSearchPlayers--;
}

export async function getPlayersInQueue() {
    return inSearchPlayers;
}
