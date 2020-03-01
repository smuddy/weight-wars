import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {User, Weight} from '../model/user';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import * as firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})
export class UserComponent implements OnInit {
  public user$: Observable<User>;
  public weights$: Observable<Weight[]>;
  public weight: number;
  private id: string;

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
    });

  }

  public async addWeight() {
    const weight = this.weight;
    this.weight = null;

    await this.afs.collection<Weight>('/user/' + this.id + '/weight').add({
      weight: weight,
      date: Timestamp.now()
    });
    await this.afs.doc<User>('/user/' + this.id).update({
      currentWeight: weight
    });

  }
}
