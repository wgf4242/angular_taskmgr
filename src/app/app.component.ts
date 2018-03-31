import {Component} from '@angular/core';
import {OverlayContainer} from '@angular/cdk/overlay';
import {trigger, state, transition, style, animate} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('square', [
        state('green', style({backgroundColor: 'green', height: '100px', transform: 'translateX(0)' })),
        state('red', style({backgroundColor: 'red', height: '50px', transform: 'translateX(100%)' })),
        transition('green => red', animate('.2s 1s')),
        transition('red => green', animate(1000)),
      ]
    )
  ]
})
export class AppComponent {
  darkTheme = false;
  squareState: string;

  constructor(private oc: OverlayContainer) { }

  switchTheme(dark) {
    this.darkTheme = dark;
    // this.oc.themeClass = this.data.dark ? 'myapp-dark-theme' : null;
  }

  onClick() {
    this.squareState = this.squareState === 'red' ? 'green' : 'red';
  }
}
