// pages/index.tsx

import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { IEvent } from "@/types/events";
import Link from "next/link";
import Image from "next/image";

const Home = () => {
    const [events, setEvents] = useState<IEvent[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await fetch('/api/events');
                const data: IEvent[] = await res.json();
                setEvents(data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching events', err);
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    if (loading) return <div>Loading events...</div>;

    return (
            <Layout>
                <h1>Welcome to the Event Booking Site</h1>
                <p>Find and book tickets for the best events around you.</p>
                <div>
                    {events.map((event) => (
                            <div key={event.id}>
                                <Image src={`/images/${event.image}`} alt={event.title} width={200} height={200} />
                                <h2>{event.title}</h2>
                                <p>{event.description}</p>
                                <p>Date: {event.date}</p>
                                <p>Location: {event.location}</p>
                                <Link href={`/events/${event.id}`}>
                                    <a>Learn More</a>
                                </Link>
                            </div>
                    ))}
                </div>
            </Layout>
    );
};

export default Home;
