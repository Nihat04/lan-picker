import Link from 'next/link';
import styles from './styles/page.module.css';

import { getMatches } from '@/src/features/mongoDB';

export default async function Home() {
    const matches = await getMatches();

    return (
        <>
            <main>
                <section className={styles['matches']}>
                    <div className={styles['matches__controller']}>
                        <Link href="/match/new">Создать новый матч</Link>
                    </div>
                    <ul className={styles['matches__list']}>
                        {matches.map((match) => (
                            <li
                                className={styles['matches__list-item']}
                                key={match._id?.toString()}
                            >
                                <Link href={`/match/${match._id}`}>
                                    <p className={styles['match__name']}>
                                        <b>{match.teamA.name}</b> vs{' '}
                                        <b>{match.teamB.name}</b>
                                    </p>
                                    <p className={styles['match__date']}>
                                        {match.date.toLocaleString('ru-RU')}
                                    </p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            </main>
        </>
    );
}
