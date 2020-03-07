import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {User, Weight} from '../model/user';
import {AngularFirestore} from '@angular/fire/firestore';
import {combineLatest, Observable} from 'rxjs';
import * as firebase from 'firebase';
import {map} from 'rxjs/operators';
import {cardAnimation} from '../animation';
import Timestamp = firebase.firestore.Timestamp;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less'],
  animations: [cardAnimation]
})
export class UserComponent implements OnInit {
  public user$: Observable<User>;
  public weights$: Observable<Weight[]>;
  public chart$: Observable<any>;
  public weight: number;
  private id: string;
  @ViewChild('chart') public chartContainer: any;

  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  view: any[] = [10, 10];

  constructor(
    private afs: AngularFirestore,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(_ => {
      localStorage.setItem('user', _.id);
      this.id = _.id;
      this.user$ = this.afs.doc<User>('/user/' + _.id).valueChanges();
      this.weights$ = this.afs.collection<Weight>('/user/' + _.id + '/weight').valueChanges();

      this.chart$ = combineLatest([this.user$, this.weights$]).pipe(map(_ => {
        const user = _[0];
        const weight = _[1];
        setTimeout(() => this.onResize(), 100);

        return [
          {
            name: "Gewicht",
            series: weight.map(x => ({name: x.date.toDate(), value: x.weight}))
          }, {
            name: 'Ideallinie',
            series: [
              {name: new Date(2020, 2, 0), value: user.startWeight},
              {name: new Date(2020, 8, 0), value: user.targetWeight},
            ]
          }
        ]
      }));
    });
    setTimeout(() => this.onResize(), 100);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (!this.chartContainer) return;
    const width = this.chartContainer.nativeElement.clientWidth;
    this.view = [width - 20, width / 3];
  }

  public async addWeight() {
    const weight = this.weight;
    this.weight = null;

    await this.afs.collection<Weight>('/user/' + this.id + '/weight').add({
      weight: weight,
      date: Timestamp.now()
    });
    await this.afs.doc<User>('/user/' + this.id).update({
      currentWeight: weight,
      lastUpdate: Timestamp.now()
    });
  }
}
