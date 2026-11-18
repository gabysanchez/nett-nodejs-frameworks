interface Event {
  id: number;
  name: string;
  available: boolean;
}

const events: Event[] = [
  { id: 1, name: "Concierto", available: true },
  { id: 2, name: "Taller", available: false },
  { id: 3, name: "Meetup", available: true },
];

const event = events.find(item => item.id === "2");

console.log(event);
