import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as Rx from 'rxjs';
import { environment } from '../../environments/environment';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  public userInTouch: number;
  public subject: Rx.Subject<MessageEvent>;
  public messages: Subject<any>;

  public users = [
    {
      id: 13,
      online: true,
      messages: [
         {
          type: 'user',
          date: new Date(),
          text: 'Hello my name is John'
         },
         {
          type: 'manager',
          date: new Date(),
          text: 'How are you?'
         }
      ]
    },
    {
      id: 14,
      online: true,
      messages: [
        {
          type: 'user',
          date: new Date(),
          text: 'Hello my name is Pete'
        },
        {
          type: 'manager',
          date: new Date(),
          text: 'Fuck you!'
        }
      ]
    },
    {
      id: 15,
      online: true,
      messages: [
        {
          type: 'user',
          date: new Date(),
          text: 'Hello my name is Elmo'
        },
        {
          type: 'manager',
          date: new Date(),
          text: 'Where are you?'
        }
      ]
    },
    {
      id: 16,
      online: true,
      messages: [
        {
          type: 'user',
          date: new Date(),
          text: 'Hello my name is Erica'
        },
        {
          type: 'manager',
          date: new Date(),
          text: 'Who are you?'
        }
      ]
    },
    {
      id: 17,
      online: false,
      messages: [
        {
          type: 'user',
          date: new Date(),
          text: 'Hello my name is '
        },
        {
          type: 'manager',
          date: new Date(),
          text: 'You are offline'
        }
      ]
    },
  ];

  constructor() {
    this.messages = this.connect(environment.PROD_CHAT_URL);
    this.messages.subscribe(res => {
      console.log(res);
      const data = JSON.parse(res.data);

      const newMessage = {
        type: data.messages[0].type,
        date: data.messages[0].time,
        text: data.messages[0].message
      };

      this.pushMessage(newMessage);
    });
  }

  public connect(url): Rx.Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
      console.log('Successfully connected: ' + url);
    }
    return this.subject;
  }

  public create (url): Rx.Subject<MessageEvent> {
    const ws = new WebSocket(url);

    const observable = Rx.Observable.create(
      (obs: Rx.Observer<MessageEvent>) => {
        ws.onmessage = obs.next.bind(obs);
        ws.onerror = obs.error.bind(obs);
        ws.onclose = obs.complete.bind(obs);
        return ws.close.bind(ws);
      });

      const observer = {
        next: (data: Object) => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(data));
          }
        }
      };

      return Rx.Subject.create(observer, observable);
  }

  setUserInTouch (id: number) {
    this.userInTouch = id;
  }

  sendMessage (text: string) {
    const message = {
      id: this.userInTouch,
      messages: new Message(text)
    };

    this.messages.next(message);
    console.log(JSON.stringify(message) );
    console.log(JSON.stringify(this.userInTouch) );
  }

  pushMessage (data): void {
    this.users[0].messages.push(data);
  }
}
