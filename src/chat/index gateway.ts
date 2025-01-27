import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
interface IUser {
    id: number,
    username: string,
    socketId: number
}
interface IJoinPayload {
    roomName: string,
    user: IUser
}
interface IMessage {
    message: string,
    user: IUser,
    time: string,
    roomName: string
}

@WebSocketGateway({ cors: { origin: "*", method: ["post", "get"] } })


export class IndexGateway {
    @WebSocketServer() server: Server
    @SubscribeMessage("join-room")
    async joinRoom(@ConnectedSocket() client: Socket, @MessageBody() data: IJoinPayload) {
        console.log(client.id, data);
        
        if (client.id && data.roomName) {
            if (client.rooms.has(data.roomName)) {
                console.log("already  join in:" + data.roomName);
            } else {
                client.join(data.roomName)
            }
        } else {
            client.emit("exception", "you are disconnect")
        }

    }

    @SubscribeMessage("server-chat")
    async serverChat(@ConnectedSocket() client: Socket, @MessageBody() data: IMessage) {
        if(data.roomName){
            return this.server.to(data.roomName).emit("client-chat",data)
        }
        return client.emit("exception","room not found")
    }
}