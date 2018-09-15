import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'manager-interface';
  public users = [
    {
      name: 'John',
      id: 13,
      online: true,
      lastMessage: new Date(),
      messages: [
        'Hello my name is John',
        'How are you?'
      ]
    },
    {
      name: 'Pete',
      id: 14,
      online: true,
      lastMessage: new Date(),
      messages: [
        'Hello my name is Pete'
      ]
    },
    {
      name: undefined,
      id: 15,
      online: true,
      lastMessage: new Date(),
      messages: [
        'Hello my name is '
      ]
    },
    {
      name: 'Jim',
      id: 16,
      online: true,
      lastMessage: new Date(),
      messages: [
        'Hello my name is '
      ]
    },
    {
      name: 'Linda',
      id: 17,
      online: false,
      lastMessage: new Date(),
      messages: [
        'Hello my name is '
      ]
    },
  ];
}
