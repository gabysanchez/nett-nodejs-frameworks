import { createAppServer } from "./server.ts";

const port = Number(process.env.PORT ?? 3000);


if (!Number.isInteger(port) || port < 0 || port > 65535) throw new Error("Invalid PORT");

const server = createAppServer();

server.listen(port, () => {
    const address = server.address();
    if (address && typeof address !== "string") {
        console.log("Server running at http://localhost:" + address.port);
    }
});
