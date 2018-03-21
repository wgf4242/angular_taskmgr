import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  darkTheme = false;
  title = 'app';

  switchTheme(dark) {
    this.darkTheme = dark;
  }
}
