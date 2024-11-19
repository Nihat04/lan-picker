"use server"

import { Player } from "@/src/entities/player";
import { db } from "./general";

export async function getPlayers(): Promise<Player[]> {
    const collection = db.collection<Player>("players");

    const players = await collection
        .find()
        .toArray()

    if (!players) throw new Error("Error on getting players");

    return players;
}
