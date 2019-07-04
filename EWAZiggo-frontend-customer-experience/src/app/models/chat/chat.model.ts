import {Message} from './message.model';

export class Chat {
  id: string;
  created = Date.now();
  rating: number;
  messages: Message[];

  constructor() {
    this.messages = [];
  }
}
