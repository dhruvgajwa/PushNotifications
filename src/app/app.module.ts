import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireDatabaseModule} from '@angular/fire/database';
import { AngularFireAuthModule} from '@angular/fire/auth';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

const firebaseConfig = {
  apiKey: 'AIzaSyC4z3NOANzrcOAm827YxAP3llXDt8fr-WM',
  authDomain: 'pushnotification-4f41a.firebaseapp.com',
  databaseURL: 'https://pushnotification-4f41a.firebaseio.com',
  projectId: 'pushnotification-4f41a',
  storageBucket: 'pushnotification-4f41a.appspot.com',
  messagingSenderId: '980001533855',
  appId: '1:980001533855:web:e0f444e6274cc99e3697aa',
  measurementId: 'G-W5EMTE0M1V'
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [AngularFireModule.initializeApp(firebaseConfig),
    BrowserModule,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    ServiceWorkerModule.register('../firebase-messaging-sw.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
