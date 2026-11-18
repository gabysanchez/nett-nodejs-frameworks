export interface Event {
    id: number;
    title: string;
    date: string;
    capacity: number;
    availableSeats: number;
}

// Los cambios se pierden al reiniciar el servidor.

const nextYear = new Date().getUTCFullYear() + 1;

export const events: Event[] = [
    { id: 1, title: "Conferencia de Node.js", date: nextYear + "-03-10", capacity: 30, availableSeats: 30 },
    { id: 2, title: "Workshop de TypeScript", date: nextYear + "-04-15", capacity: 12, availableSeats: 12 },
    { id: 3, title: "Introducción a NestJS", date: nextYear + "-05-20", capacity: 20, availableSeats: 20 },
];

