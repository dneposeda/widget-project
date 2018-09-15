import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router'  ;
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { MessageComponent } from './components/message/message.component';
import { ChatComponent } from './components/chat/chat.component';

const routes: Routes = [
  {path: 'users/:id', component: ChatComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    MessageComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
