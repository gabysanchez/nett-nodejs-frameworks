import { createServer, type ServerResponse } from "node:http";
import { events } from "./events.ts";

const PORT = 3000;

const sendJsonResponse = (response: ServerResponse, statusCode: number, data: unknown) => {
    response.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
    // Convertimos los datos a texto JSON y cerramos la respuesta.
    response.end(JSON.stringify(data));
};

const server = createServer((request, response) => {
    const requestUrl = new URL(request.url || "", `http://${request.headers.host}`);

    response.setHeader("Content-Type", "application/json; charset=utf-8");

    if (request.method === "GET" && requestUrl.pathname === "/") {
        sendJsonResponse(response, 200, { status: "ok" });
        return;
    }

    if (request.method === "GET" && requestUrl.pathname === "/events") {
        // getAll recoge todos los valores: ?id=1&id=2 devuelve ["1", "2"].
        const requestedIds = requestUrl.searchParams.getAll("id");

        if (requestedIds.length === 0) {
            sendJsonResponse(response, 200, events);
            return;
        }

        // Los parámetros llegan como texto; convertimos el ID para compararlos.
        const filteredEvents = events.filter((event) => requestedIds.includes(event.id.toString()));
        sendJsonResponse(response, 200, filteredEvents);
        return;
    }

    if (request.method === "DELETE" && requestUrl.pathname === "/events") {
        const requestedIds = requestUrl.searchParams.getAll("id");

        if (requestedIds.length === 0) {
            sendJsonResponse(response, 400, { status: "bad request" });
            return;
        }

        const eventsToDelete = events.filter((event) => requestedIds.includes(event.id.toString()));

        if (eventsToDelete.length === 0) {
            sendJsonResponse(response, 404, { status: "not found" });
            return;
        }

        // Buscamos la posición en cada vuelta porque splice modifica el array original.
        eventsToDelete.forEach((eventToDelete) => {
            const eventIndex = events.findIndex((event) => event.id === eventToDelete.id);
            if (eventIndex !== -1) {
                events.splice(eventIndex, 1);
            }
        });

        sendJsonResponse(response, 200, { status: "ok" });
        return;
    }

    sendJsonResponse(response, 404, { status: "not found" });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
