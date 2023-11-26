// pages/events/[id]/interestAreas.tsx
import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { IEvent, IInterestAreas } from "@/types/events";
import styles from '@/styles/interestArea.module.css';
import Link from "next/link";

const InterestAreasPage: React.FC = () => {
    const [interestAreas, setInterestAreas] = useState<IInterestAreas[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (!router.isReady) return;

        const fetchInterestAreas = async () => {
            try {
                const res = await fetch(`http://localhost:3001/api/events/${id}`);
                const { interestAreas } = await res.json();
                setInterestAreas(interestAreas);
            } catch (err) {
                console.error('Error fetching interest areas', err);
            } finally {
                setLoading(false);
            }
        };

        fetchInterestAreas();
    }, [router.isReady, id]);

    if (loading) return <div>Loading...</div>;
    if (!interestAreas.length) return <div>No interest areas found for this event.</div>;

    return (
            <Layout>
                <div className={styles.interestAreaContainer}>
                    <Link className={styles.link} href={`/events/${id}`} passHref>Back to event</Link>
                    <h1 className={styles.title}>Interest Areas</h1>
                    <ul className={styles.list}>
                        {interestAreas.map((area) => (
                                <li className={styles.listItem} key={area.id}>
                                    <h2 className={styles.itemTitle}>{area.title}</h2>
                                    <p className={styles.para}>{area.description}</p>
                                    <p>Section: {area.section}</p>
                                    <p>Starts: {area.time}</p>
                                </li>
                        ))}
                    </ul>
                </div>
            </Layout>
    );
};

export default InterestAreasPage;
