import {Message} from './message.model';

export class MessageToken {
  room: string;
  message: Message;

  constructor(room: string, message: Message) {
    this.room = room;
    this.message = message;

  }
}
