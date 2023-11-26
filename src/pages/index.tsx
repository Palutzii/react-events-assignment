import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import Link from "next/link";
import { IEvent } from "@/types/events";
import styles from '@/styles/Home.module.css';

const Home: React.FC = () => {
    const [events, setEvents] = useState<IEvent[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await fetch('http://localhost:3001/api/events');
                const data = await res.json();
                setEvents(data);
            } catch (err) {
                console.error('Error fetching events', err);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
            <Layout>
                <div className={styles.home}>
                    <h1 className={styles.title}>Welcome to the Event Booking Site</h1>
                    <p className={styles.title}>Find and book tickets for the best events around you.</p>
                    <div className={styles.eventGrid}>
                        {events.map((event) => (
                                <div key={event.id} className={styles.gridItem} >
                                    <h2>{event.title}</h2>
                                    <p>Date: {event.date}</p>
                                    <p>Time: {event.time}</p>
                                    <p>Location: {event.location}</p>
                                    <Link className={styles.link} href={`/events/${event.id}`} passHref>View Event</Link>
                                </div>
                        ))}
                    </div>
                </div>
            </Layout>
    );
};

export default Home;
