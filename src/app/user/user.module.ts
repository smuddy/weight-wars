import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserComponent} from './user.component';
import {UserInfoModule} from '../shared/user-info/user-info.module';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [UserComponent],
  exports: [UserComponent],
  imports: [
    CommonModule,
    UserInfoModule,
    FormsModule
  ]
})
export class UserModule {
}
