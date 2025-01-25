import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway({
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
    namespace: "group", 
})
export class ChannelGateway {
    @SubscribeMessage("list")
    handleList(client: any, data: any) {
        console.log("Group list message received");
        console.log("Data:", data);
        client.emit("list", { message: "Send group list message to client" });
    }
}
   