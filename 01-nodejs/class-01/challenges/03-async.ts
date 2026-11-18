async function getEvents() {
  return ["Concierto", "Taller", "Meetup"];
}

const events = getEvents();

console.log(events.length);
