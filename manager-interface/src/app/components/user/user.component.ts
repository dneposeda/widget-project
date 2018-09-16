import { Component, OnInit, Input } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @Input() public user;

  constructor(private _websocketService: WebsocketService) { }

  ngOnInit() {
  }

  onClick () {
    this._websocketService.setUserInTouch(this.user.id);
  }

}
