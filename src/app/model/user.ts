import Timestamp = firebase.firestore.Timestamp;
import * as firebase from 'firebase';

export interface Progress {
  startWeight: number;
  currentWeight: number;
  targetWeight: number;
}

export interface User extends Progress {
  name: string;
}

export interface Weight {
  date: Timestamp,
  weight: number
}
