import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import Link from "next/link";
import { IEvent} from "@/types/events";


const EventsPage = () => {
    const [events, setEvents] = useState<IEvent[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await fetch('http://localhost:3001/api/events');
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
                <h1>Events Listing</h1>
                {events.length > 0 ? (
                        <ul>
                            {events.map((event) => (
                                    <li key={event.id}>
                                        <h2>{event.title}</h2>
                                        <p>Date: {event.date}</p>
                                        <p>Time: {event.time}</p>
                                        <p>Location: {event.location}</p>
                                        <Link href={`/events/${event.id}`}>View Event</Link>
                                    </li>
                            ))}
                        </ul>
                ) : (
                        <p>No events to show</p>
                )}
            </Layout>
    );
};

export default EventsPage;