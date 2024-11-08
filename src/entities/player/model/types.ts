import { ObjectId } from "mongodb";

export type player = {
    id?: ObjectId;
    name: string;
    realName: string | null;
    avatarUrl: string;
};