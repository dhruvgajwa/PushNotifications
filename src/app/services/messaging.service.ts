import { Injectable } from '@angular/core';
import { AngularFireDatabase} from '@angular/fire/database';
import { AngularFireAuth} from '@angular/fire/auth';

import * as firebase from 'firebase';

import { take } from 'rxjs/operators';

import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  messaging =  firebase.messaging();
  currentMessage = new BehaviorSubject(null);

  

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
   
   }

   private updateToken(token) {
     this.afAuth.authState.pipe(take(1)).subscribe(user => {
       if (!user) {
         return;
       } else {
         const data = {[user.uid] : token }
         this.db.object('fcmTokens/').update(data).catch(err => {
           console.log('Cant update sho', err);
         });
       }
     });
   }

   getPermission() {
    this.messaging.requestPermission()
    .then(() => {
      console.log(' Notification Permission granted');
     // this.messaging.useServiceWorker('../../firebase-messaging-sw.js');
      console.log(this.messaging.getToken());
      return this.messaging.getToken();

    }).then( token => {
      console.log(token);
      this.updateToken(token);
    }).catch( (err) => {
      console.log('Unable to get Permission to notify', err);
    });


   
   }
   receiveMessage() {
     this.messaging.onMessage((payload) => {
       console.log('Message Received', payload);
       this.currentMessage.next(payload);
     });
   }
}
