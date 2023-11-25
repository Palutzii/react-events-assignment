import fs from 'fs';
import path from 'path';

const __dirname = path.resolve();
const DATA_DIR = path.join(__dirname, 'data');
const EVENTS_FILE = path.join(DATA_DIR, 'events.json');

export const getAllEvents = (req, res) => {
    try {
        const eventsData = fs.readFileSync(EVENTS_FILE, 'utf8');
        const events = JSON.parse(eventsData);
        res.json(events);
    } catch (err) {
        console.error('Error reading events:', err);
        res.status(500).json({ message: 'Internal Server Error'});
    }
};

export const getEventById = (req, res) => {
    try {
        const eventsData = fs.readFileSync(EVENTS_FILE, 'utf8');
        const events = JSON.parse(eventsData);
        const event = events.find(e => e.id === Number(req.params.id));
        if (event) {
            res.json(event);
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (err) {
        console.error('Error reading events:', err);
        res.status(500).json({ message: 'Internal Server Error'});
    }
};