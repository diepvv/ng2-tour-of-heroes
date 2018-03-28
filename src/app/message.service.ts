import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {
  messages: string[] = [];
  //add a message when have event
  add(messages: string) {
    this.messages.push(messages);
  }
  //clear message to []
  clear() {
    this.messages = [];
  }
  constructor() { }

}
