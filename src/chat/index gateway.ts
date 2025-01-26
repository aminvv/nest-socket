import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { Client } from "socket.io/dist/client";
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

@WebSocketGateway({ cors: { origin: "*", methods: ["GET", "POST"], } })
export class IndexGateway {
    @WebSocketServer() server: Server
    @SubscribeMessage("join_room")
    async joinRoom(@ConnectedSocket() client: Socket, @MessageBody() data: IJoinPayload) {
        if (client.id && data.roomName){
            if(client.rooms.has(data.roomName)){
                console.log("already joined in:"+ data.roomName);
            }else{
                client.join(data.roomName)
            }
        }else{
            client.emit("exception","not connected")
        }
    }
    @SubscribeMessage("server-chat")
    async serverChat(@ConnectedSocket()client:Socket, @MessageBody() data:IMessage){
        if(data.roomName){
            return this.server.to(data.roomName).emit("client-chat",)
        }
        return client.emit("exception","room not found")
    }
}