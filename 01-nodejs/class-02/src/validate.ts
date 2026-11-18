import { type Event } from "./data.ts";

export function httpError(statusCode: number, message: string) {
  return Object.assign(new Error(message), { statusCode });
}

function validateDate(date: string): boolean {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  return dateRegex.test(date);
}

export function validateEvent(
  event: Partial<Pick<Event, "title" | "date" | "capacity">>,
): string | null {
  if (!event || typeof event !== "object") {
    return "Invalid request body";
  }

  if (
    event.title === undefined ||
    typeof event.title !== "string" ||
    event.title.trim() === ""
  ) {
    return "Missing or invalid 'title' field";
  }

  if (
    event.date === undefined ||
    typeof event.date !== "string" ||
    event.date.trim() === "" ||
    !validateDate(event.date)
  ) {
    return "Missing or invalid 'date' field";
  }

  if (
    event.capacity === undefined ||
    typeof event.capacity !== "number" ||
    event.capacity < 0
  ) {
    return "Missing or invalid 'capacity' field";
  }

  return null;
}
