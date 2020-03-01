import {Component, Input} from '@angular/core';
import {User} from '../../model/user';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.less']
})
export class UserInfoComponent {
  @Input() public user: User;

  public round(input: number): number {
    return Math.floor(input);
  }

  public percent = () =>
    this.round(
      ((this.user.startWeight - this.user.currentWeight) /
        (this.user.startWeight - this.user.targetWeight)) * 100
    );
}
