import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketGateway } from "@nestjs/websockets";

@WebSocketGateway({
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  })
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    afterInit(server: any) {
        console.log("socket initialized");
        
    }
    handleConnection(client: any, ...args: any[]) {

    }
    handleDisconnect(client: any) {

    }
}