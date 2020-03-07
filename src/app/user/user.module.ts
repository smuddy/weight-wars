import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserComponent} from './user.component';
import {UserInfoModule} from '../shared/user-info/user-info.module';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {NgxChartsModule} from '@swimlane/ngx-charts';

@NgModule({
  declarations: [UserComponent],
  exports: [UserComponent],
  imports: [
    CommonModule,
    UserInfoModule,
    FormsModule,
    RouterModule,

    NgxChartsModule,
  ]
})
export class UserModule {
}
