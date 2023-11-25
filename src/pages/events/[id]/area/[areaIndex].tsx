import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { IEvent, IInterestArea } from "@/types/events";

const InterestAreaDetailPage = () => {
    const [interestArea, setInterestArea] = useState<IInterestArea | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { id, areaIndex } = router.query;

    useEffect(() => {
        const fetchInterestArea = async () => {
            if (!router.isReady) return;

            try {
                const res = await fetch(`/api/events/${id}`);
                const data: IEvent = await res.json();
                const area = data.interestAreas[Number(areaIndex)];
                setInterestArea(area);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching interest area', err);
                setLoading(false);
            }
        };
        fetchInterestArea();
    }, [router.isReady, areaIndex]);

    if (!router.isReady || loading) return <div>Loading area...</div>;
    if (!interestArea) return <div>Interest area not found</div>;

    // Add your form for purchasing tickets here
    // For now, I'm just showing a placeholder button
    return (
            <Layout>
                <h1>{interestArea.area}</h1>
                <p>{interestArea.description}</p>
                <button>Purchase Tickets</button>
            </Layout>
    );
};

export default InterestAreaDetailPage;