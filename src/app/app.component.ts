import {Component} from '@angular/core';
import {fader} from './animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  animations: [fader]
})
export class AppComponent {

}
