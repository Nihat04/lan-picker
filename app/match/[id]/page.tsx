import { MatchPreview } from "@/src/entities/match/ui/MatchPreview";
import { getMatch } from "@/src/features/mongoDB";
import { ObjectId } from "mongodb";
import React from "react";

export default async function MatchPage({
    params,
}: {
    params: { id: string };
}) {
    const { id } = await params;

    const match = await getMatch(new ObjectId(id));
    console.log(match);

    return (
        <>
            <main>
                <section>
                    <MatchPreview match={match} />
                </section>
            </main>
        </>
    );
}
