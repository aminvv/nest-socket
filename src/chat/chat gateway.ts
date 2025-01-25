import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway({
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server
    afterInit(server: any) {
        console.log("socket initialized");

    }
    handleConnection(client: any, ...args: any[]) {
        const { sockets } = this.server.sockets
        console.log("clientId:" + client.id + "connected")
        console.log("Online User" + sockets.size);

    }
    handleDisconnect(client: any) {
        const { sockets } = this.server.sockets
        console.log("clientId:" + client.id + "disconnected")
        console.log("Online User" + sockets.size);
    }
}