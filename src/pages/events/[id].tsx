import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { IEvent } from "@/types/events";


const EventDetailPage = () => {
    const [event, setEvent] = useState<IEvent | null>(null);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [ticketQuantity, setTicketQuantity] = useState(1);
    const [purchaseStatus, setPurchaseStatus] = useState({ status: 'idle', message: ''});
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        const fetchEvent = async () => {
            if (!router.isReady) return;

            try {
                const res = await fetch(`http://localhost:3001/api/events/${id}`);
                const data: IEvent = await res.json();
                setEvent(data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching event', err);
                setLoading(false);
            }
        };
        fetchEvent();
    }, [router.isReady, id]);

    if (!router.isReady || loading) return <div>Loading event...</div>;

    if (!event) return <div>Event not found</div>;

    const handlePurchase = async  (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = {
            name: name,
            email: email,
            tickets: ticketQuantity,
            eventId: event ? event.id : null,
        };

        try {
            const res = await fetch(`http://localhost:3001/api/tickets`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                // throw new Error('Problem purchasing ticket');
            }

            const result = await res.json();
            setPurchaseStatus({ status: 'success', message: 'Tickets purchased successfully!' });
            setName('');
            setEmail('');
            setTicketQuantity(1);
        } catch (err) {
            console.error('Error purchasing ticket', err);
            setPurchaseStatus({ status: 'error', message: 'Failed to purchase ticket.'});
        }
    };

    if (!event) {
        return <p>Loading...</p>;
    }

    return (
            <Layout>
                <h1>{event.title}</h1>
                <p>Date: {event.date}</p>
                <p>Location: {event.location}</p>
                <p>{event.description}</p>

                <form onSubmit={handlePurchase}>
                    <h2>Purchase Tickets</h2>
                    <label htmlFor="name">Name</label>
                    <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Full Name"
                            required
                    />
                    <label htmlFor="email">Email</label>
                    <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email Address"
                            required
                    />
                    <label htmlFor="tickets">Ticket Quantity</label>
                    <input
                            type="number"
                            id="tickets"
                            name="tickets"
                            value={ticketQuantity}
                            onChange={ (e) => setTicketQuantity(Number(e.target.value))}
                            min="1"
                            required
                    />
                    <button type="submit">Purchase</button>
                </form>

                {purchaseStatus.status !== 'idle' && (
                        <div className={purchaseStatus.status === 'error' ? 'error' : 'success'}>
                            {purchaseStatus.message}
                        </div>
                )}
            </Layout>
    );
};

export default EventDetailPage;