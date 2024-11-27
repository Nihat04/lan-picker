import { MatchPreview } from '@/src/entities/match/ui/MatchPreview/MatchPreview';
import { convertObjectIdToString, getMatch } from '@/src/features/mongoDB';
import { ObjectId } from 'mongodb';
import React from 'react';

export default async function MatchPage({
    params,
}: {
    params: { id: string };
}) {
    const { id } = await params;
    const match = await getMatch(new ObjectId(id));

    return (
        <>
            <main>
                <section>
                    <MatchPreview match={convertObjectIdToString(match)} />
                </section>
            </main>
        </>
    );
}
