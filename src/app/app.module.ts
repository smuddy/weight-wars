import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {NgCircleProgressModule} from 'ng-circle-progress';
import {DashboardModule} from './dashboard/dashboard.module';
import {UserModule} from './user/user.module';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence({synchronizeTabs: true}),

    NgCircleProgressModule.forRoot(),

    DashboardModule,
    UserModule,

    NgxChartsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
