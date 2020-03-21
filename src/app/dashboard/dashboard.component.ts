import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {Progress, User} from '../model/user';
import {cardAnimation} from '../animation';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less'],
  animations: [cardAnimation]
})
export class DashboardComponent {


  public progress$: Observable<Progress>;
  public users$: Observable<User[]>;

  constructor(private afs: AngularFirestore) {
    this.users$ = this.afs.collection<User>('/user').valueChanges().pipe(
      map(_ => _.sort((a, b) => (b.startWeight - b.currentWeight) - (a.startWeight - a.currentWeight)))
    );

    this.progress$ = this.users$.pipe(
      map(users => {
        return {
          targetWeight: users.reduce((a, b) => a + b.targetWeight, 0),
          currentWeight: users.reduce((a, b) => a + b.currentWeight, 0),
          startWeight: users.reduce((a, b) => a + b.startWeight, 0)
        }
      })
    );
  }

  public user = () => localStorage.getItem('user');
  public userInput: string = null;

  public round(input: number): number {
    return Math.floor(input);
  }

  public percent = (progress: Progress) =>
    this.round(
      ((progress.startWeight - progress.currentWeight) /
        (progress.startWeight - progress.targetWeight)) * 100
    );
  public difference = (progress: Progress) =>
    this.round(
      (progress.startWeight - progress.targetWeight) - (progress.startWeight - progress.currentWeight)
    );

}
