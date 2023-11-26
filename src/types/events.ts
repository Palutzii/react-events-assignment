export interface IEvent {
    id: number;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    image: string;
    isFeatured: boolean;
}

export interface IInterestAreas {
    id: number;
    title: string;
    description: string;
    section: string;
    time: string;
}