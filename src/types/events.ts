export interface IEvent {
    id: string;
    title: string;
    description: string;
    date: string;
    location: string;
    image: string;
    isFeatured: boolean;
    interestAreas: IInterestArea[];
}

export interface IInterestArea {
    area: string;
    description: string;
}