import { Component } from '@angular/core';
import {MessagingService} from './services/messaging.service';
import {AngularFireAuth} from '@angular/fire/auth';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PushNotification';
  message;
  constructor(private msgService: MessagingService,
              private afAuth: AngularFireAuth){


    this.afAuth.auth.signInWithEmailAndPassword('dhruvgajwa0081@gmail.com', '12345678').then(
      _ => {
        console.log('signed In');
        this.msgService.getPermission();
        this.msgService.receiveMessage();
        this.message = this.msgService.currentMessage;
      }
    );

  }
}
