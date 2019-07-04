import {Component, ElementRef, OnInit} from '@angular/core';
import {ChatService} from '../../../services/chat.service';
import {ChatToken} from '../../../models/chat/chat-token.model';
import {Message} from '../../../models/chat/message.model';
import {MessageToken} from '../../../models/chat/message-token.model';
import {CustomerService} from '../../../services/customer.service';
import {Customer} from '../../../models/customer.model';
import {User} from '../../../models/user.model';
import {Subscription} from 'rxjs';
import {AuthenticationService} from '@customer//_services';
import {MatDialog, MatDialogRef} from '@angular/material';
import {CloseDialogComponent} from './close-dialog/close-dialog.component';
import {Employee} from '../../../models/employee.model';
import {Chat} from '../../../models/chat/chat.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  chatLabel = 'Klanten';
  content: string;
  chats = new Array<ChatToken>();
  currentChat = new ChatToken();
  isOnline: boolean;
  isHidden = true;
  status: string;
  user: User;
  currentUserSubscription: Subscription;
  customer = new Customer();
  appointments;
  equipment;
  confirmCloseDialog: MatDialogRef<CloseDialogComponent>;
  currentChatIndex: number;

  constructor(private chatService: ChatService,
              private el: ElementRef,
              private customerService: CustomerService,
              private authenticationService: AuthenticationService,
              private dialog: MatDialog) {
    this.authenticationService.checkIfLoggedIn();
    if (authenticationService.loggedIn === true) {
      this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
        this.user = user;
      });
    }
  }


  ngOnInit() {
    this.statusOnline();
    this.listenForRequests();
    this.getMessages();
  }

  sendMessage() {
    console.log('sending Message..');
    const msg = new Message(this.content, this.user);
    this.chatService.sendMessage(this.currentChat.chat.id, msg);
    this.content = '';
  }

  statusOnline() {
    if (!this.isOnline) {
      this.isOnline = true;
      this.status = 'online';
      this.chatService.checkIn(this.user);
    }
  }

  statusOffline() {
    if (this.isOnline) {
      this.isOnline = false;
      this.status = 'offline';
      this.chatService.checkOut(this.chats);
      this.chats = new Array<ChatToken>();
    }
  }

  openChat(index) {
    console.log('opening chat on index: ' + index);
    this.currentChat = this.chats[index];
    this.getCustomerInfo();
    this.getMechanicAppointments();
    this.getEquipment();
    this.chats[index].newMessages = false;
    this.isHidden = false;
    this.currentChatIndex = index;
  }

  listenForRequests() {
    this.chatService.listenForRequests().subscribe(token => {
      console.log('adding new chat...');
      this.chats.push(token);
      console.log('chat with id ' + token.chat.id);
      this.chatService.joinChat(token);
    });
  }

  getMessages() {
    this.chatService.getMessages().subscribe((token: MessageToken) => {
      console.log(this.currentChat);
      if (token.room === this.currentChat.chat.id) {
        this.currentChat.chat.messages.push(token.message);
        this.scrollToBottom();
      } else {
        for (const chatToken of this.chats) {
          if (chatToken.chat.id === token.room) {
            chatToken.chat.messages.push(token.message);
            chatToken.newMessages = true;
          }
        }
      }
    });
  }

  getCustomerInfo() {
    this.customerService.getCustomer(this.currentChat.client.idUser).subscribe(data => {
        this.customer = data;
        console.log('Customer Info...');
        console.log(this.customer);
      }
    );
  }

  getMechanicAppointments() {
    this.customerService.getMechanicAppointments(this.currentChat.client.idUser).subscribe(data => {
        this.appointments = data;
        console.log('Mechanic Appointments...');
        console.log(this.appointments);
      }
    );
  }

  getEquipment() {
    this.customerService.getEquipment(this.currentChat.client.idUser).subscribe(data => {
        this.equipment = data;
        console.log('Equipment...');
        console.log(this.equipment);
      }
    );
  }

  scrollToBottom(): void {
    const scrollPane: any = this.el
      .nativeElement.querySelector('.chat-messages');
    scrollPane.scrollTop = scrollPane.scrollHeight;
  }

  closeChat() {
    this.confirmCloseDialog = this.dialog.open(CloseDialogComponent);
    this.confirmCloseDialog.afterClosed().subscribe(result => {
      console.log('close Chat? ' + result);
      if (result) {
        this.chats.splice(this.currentChatIndex, 1);
        this.isHidden = true;
        console.log(this.currentChat.chat);
        this.chatService.endChat(this.currentChat.chat).subscribe(
          (data: Chat) => {
            console.log(data);
          },
          (error: any) => console.log(error)
        );
      }
    });
  }

}
