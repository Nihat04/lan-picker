"use server"

import { Player } from "@/src/entities/player";
import { connectToDb } from "./general";

export async function getPlayers(): Promise<Player[]> {
    const db = await connectToDb()
    const collection = db.collection<Player>("players");

    const players = await collection
        .find()
        .toArray()

    if (!players) throw new Error("Error on getting players");

    return players;
}

export async function getPlayer(name: string): Promise<Player> {
    const db = await connectToDb()
    const collection = db.collection<Player>("players");

    const player = await collection
        .findOne({name: name})

    if (!player) throw new Error("Player does not exist");

    return player;
}