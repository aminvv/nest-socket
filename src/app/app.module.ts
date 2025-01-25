import { Module } from '@nestjs/common';
import { GroupGateway } from 'src/channel/channel.gateway';
import { ChatGateway } from 'src/chat/chat gateway';
import { ChannelGateway } from 'src/group/group.gateway';


@Module({
  imports: [],
  controllers: [],
  providers: [ChatGateway,GroupGateway,ChannelGateway],
})
export class AppModule {}
