import { events, type Event } from "./data.ts";
import type { IncomingMessage, ServerResponse } from "node:http";
import { readJson, sendJson } from "./http.ts";
import { validateEvent, httpError } from "./validate.ts";

export async function handleRoutes(
  request: IncomingMessage,
  response: ServerResponse,
) {
  const url = new URL(request.url ?? "/", "http://localhost");

  // GET /
  if (request.method === "GET" && url.pathname === "/") {
    sendJson(response, 200, { message: "Events and reservations API" });
    return;
  }

  // GET /events
  if (request.method === "GET" && url.pathname === "/events") {
    const queryIds = url.searchParams.getAll("id");

    const ids = queryIds.map(Number);
    const result =
      ids.length === 0
        ? events
        : events.filter((event) => ids.includes(event.id));
    sendJson(response, 200, result);
    return;
  }

  // GET /events/:id
  if (request.method === "GET" && url.pathname.match(/^\/events\/([^/]+)$/)) {
    const id = Number(url.pathname.split("/")[2]);

    const event = events.find((event) => event.id === id);
    if (!event) {
      sendJson(response, 404, { error: "Event not found" });
      return;
    }
    sendJson(response, 200, event);
    return;
  }

  // POST /events
  if (request.method === "POST" && url.pathname === "/events") {
    const body: Event = await readJson<Event>(request);

    if (!body || typeof body !== "object") {
      response.writeHead(400, {
        "Content-Type": "application/json; charset=utf-8",
      });
      response.end(JSON.stringify({ error: "Invalid request body" }));
      return;
    }

    const validationResult = validateEvent(body);

    if (validationResult) {
      response.writeHead(400, {
        "Content-Type": "application/json; charset=utf-8",
      });
      response.end(JSON.stringify({ error: validationResult }));
      return;
    }

    const newEvent: Event = {
      id: events.length + 1,
      title: body.title,
      date: body.date,
      capacity: body.capacity,
      availableSeats: body.capacity,
    };

    events.push(newEvent);

    response.writeHead(201, {
      "Content-Type": "application/json; charset=utf-8",
    });
    response.end(JSON.stringify(newEvent));
    return;
  }

  // PUT /events/:id
  if (request.method === "PUT" && /^\/events\/[^/]+$/.test(url.pathname)) {
    const id = Number(url.pathname.split("/")[2]);
    const body = await readJson<Partial<Event>>(request);

    const event = events.find((event) => event.id === id);
    if (!event) throw httpError(404, "Event not found");

    const validationResult = validateEvent(body);
    if (validationResult) throw httpError(400, validationResult);

    if (body.title !== undefined) event.title = body.title;
    if (body.date !== undefined) event.date = body.date;
    if (body.capacity !== undefined) {
      const capacityDiff = body.capacity - event.capacity;
      event.capacity = body.capacity;
      event.availableSeats += capacityDiff;
    }

    sendJson(response, 200, event);
    return;
  }

  sendJson(response, 404, { error: "Route not found" });
}
