import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard.component';
import {NgCircleProgressModule} from 'ng-circle-progress';
import {UserInfoModule} from '../shared/user-info/user-info.module';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [DashboardComponent],
  exports: [DashboardComponent],
  imports: [
    CommonModule,
    NgCircleProgressModule,
    UserInfoModule,
    RouterModule,
    FormsModule,
  ]
})
export class DashboardModule {
}
