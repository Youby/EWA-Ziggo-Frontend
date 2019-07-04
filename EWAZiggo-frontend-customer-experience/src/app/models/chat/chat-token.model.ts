import {User} from '../user.model';
import {Chat} from './chat.model';

export class ChatToken {
  client = new User();
  employee = new User();
  newMessages = false;
  timestamp = Date.now();
  chat = new Chat();
}
