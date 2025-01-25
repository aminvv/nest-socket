import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway({
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
    namespace: "channel", 
})
export class GroupGateway {
    @SubscribeMessage("channel")
    handleList(client: any, data: any) {
        console.log("channel list message received");
        console.log("Data:", data);
        client.emit("channel", { message: "Send channel list message to client" });
    }
}
    