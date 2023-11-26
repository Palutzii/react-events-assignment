// pages/events/[id]/interestAreas.tsx
import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { IEvent, IInterestAreas } from "@/types/events";

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
                <h1>Interest Areas</h1>
                <ul>
                    {interestAreas.map((area) => (
                            <li key={area.id}>
                                <h2>{area.title}</h2>
                                <p>{area.description}</p>
                            </li>
                    ))}
                </ul>
            </Layout>
    );
};

export default InterestAreasPage;
