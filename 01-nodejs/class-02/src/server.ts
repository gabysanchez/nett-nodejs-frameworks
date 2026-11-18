import { createServer } from "node:http";
import { handleRoutes } from "./routes.ts";
import { sendJson } from "./http.ts";


export function createAppServer() {
    return createServer(async (request, response) => {
        try {
            await handleRoutes(request, response);
        } catch (error) {
            console.error(error);
            sendJson(response, 500, { error: "Internal server error" });
        }
    });
}

