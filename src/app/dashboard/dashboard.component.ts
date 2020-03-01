import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {Progress, User} from '../model/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
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

}
