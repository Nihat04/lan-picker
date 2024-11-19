import { Match } from "@/src/entities/match/model";
import { db } from "./general";
import { ObjectId } from "mongodb";

const collectionName = "matches";

export async function getMatches(): Promise<Match[]> {
    const collection = db.collection<Match>(collectionName);

    const cursor = await collection.aggregate([
        {
            $lookup: {
                from: "teams",
                localField: "team1",
                foreignField: "_id",
                as: "team1",
            },
        },
        { $unwind: "$team1" },
        {
            $lookup: {
                from: "teams",
                localField: "team2",
                foreignField: "_id",
                as: "team2",
            },
        },
        { $unwind: "$team2" },
        {
            $lookup: {
                from: "players",
                localField: "team1.players",
                foreignField: "_id",
                as: "team1.players",
            },
        },
        {
            $lookup: {
                from: "players",
                localField: "team2.players",
                foreignField: "_id",
                as: "team2.players",
            },
        },
    ]);

    const matches = await cursor.toArray();

    if (!matches)
        throw new Error(`failed to get matches`);
    
    return matches as Match[];
}

export async function createMatch(match: Match) {
    const collection = db.collection<Match>(collectionName);

    const res = await collection.insertOne(match);

    return res;
}

export async function getMatch(id: ObjectId): Promise<Match> {
    "use server"
    
    const collection = db.collection<Match>(collectionName);

    const cursor = await collection.aggregate([
        { $match: { _id: id } },
        {
            $lookup: {
                from: "teams",
                localField: "team1",
                foreignField: "_id",
                as: "team1",
            },
        },
        { $unwind: "$team1" },
        {
            $lookup: {
                from: "teams",
                localField: "team2",
                foreignField: "_id",
                as: "team2",
            },
        },
        { $unwind: "$team2" },
        {
            $lookup: {
                from: "players",
                localField: "team1.players",
                foreignField: "_id",
                as: "team1.players",
            },
        },
        {
            $lookup: {
                from: "players",
                localField: "team2.players",
                foreignField: "_id",
                as: "team2.players",
            },
        },
    ]);

    const match = await cursor.toArray();

    if (!match)
        throw new Error(`failed to get match with id "${id.toString()}"`);
    
    return match[0] as Match;
}
