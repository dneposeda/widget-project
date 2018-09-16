import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnChanges {
  public id: number;
  public users;
  public messages: any[];

  constructor(
    private activateRoute: ActivatedRoute,
    private _websocketService: WebsocketService) {
  }

  ngOnChanges (changes: SimpleChanges) {
    console.log(changes);
  }
  ngOnInit() {
    this.users = this._websocketService.users;
    this.activateRoute.params.subscribe(params => {
      this.id = params.id;
      this.messages = this._websocketService.users[this.getMessages()].messages;
    });
  }

  getMessages () {
    for (let i = 0; i < this.users.length; i++) {
      if (+this.id === +this.users[i].id) {
        return i;
      }
    }
  }
}
