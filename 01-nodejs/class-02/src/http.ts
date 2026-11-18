import type { IncomingMessage, ServerResponse } from "node:http";

export function sendJson(response: ServerResponse, statusCode: number, data?: unknown) {
    if (statusCode === 204) {
        response.writeHead(204);
        response.end();
        return;
    }
    response.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
    response.end(JSON.stringify(data));
}


export async function readJson<T>(request: IncomingMessage): Promise<T> {
    return new Promise((resolve, reject) => {
        let body = "";
        request.on("data", (chunk) => {
            body += chunk;
        });
        request.on("end", () => {
            try {
                const json = JSON.parse(body);
                resolve(json);
            } catch (error) {
                reject(error);
            }
        });
        request.on("error", (error) => {
            reject(error);
        });
    });
}

