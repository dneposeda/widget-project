import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  public id: number;
  public messages: any[];

  constructor(private activateRoute: ActivatedRoute) {
    this.activateRoute.params.subscribe(params => this.id = params.id);
  }

  ngOnInit() {
  }

}
