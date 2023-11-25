import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { IEvent, IInterestArea } from "@/types/events";
import Link from "next/link";


const EventInterestAreasPage = () => {
    const [event, setEvent] = useState<IEvent | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        const fetchEvent = async () => {
            if (!router.isReady) return;

            try {
                const res = await fetch(`/api/events/${id}`);
                const data: IEvent = await res.json();
                setEvent(data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching event', err);
                setLoading(false);
            }
        };
        fetchEvent();
    }, [router.isReady]);

    if (!router.isReady || loading) return <div>Loading event...</div>;
    if (!event) return <div>Event not found</div>;

    return (
            <Layout>
                <h1>{event.title}</h1>
                <p>{event.description}</p>
                <div>
                    {event.interestAreas.map((area, index) => (
                            <div key={index}>
                                <h2>{area.area}</h2>
                                <p>{area.description}</p>
                                <Link href={`/events/${event.id}/area/${index}`}>
                                    <a>View Area</a>
                                </Link>
                            </div>
                    ))}
                </div>
            </Layout>
    );
};

export default EventInterestAreasPage;