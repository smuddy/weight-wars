import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserInfoComponent} from './user-info.component';
import {NgCircleProgressModule} from 'ng-circle-progress';


@NgModule({
  declarations: [UserInfoComponent],
  exports: [UserInfoComponent],
  imports: [
    CommonModule,
    NgCircleProgressModule,
  ]
})
export class UserInfoModule {
}
