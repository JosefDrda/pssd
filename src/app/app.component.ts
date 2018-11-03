import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'password-of-day';
  public code: number = null;
  public progress;
  public init: boolean = null;
  public percent: number = null;
  protected coderoot = 7849000;

  start() {
    this.init = true;
    this.code = this.getCode();
    this.getProgress();
    this.progress = setInterval(() => {
      this.getProgress();
    }, 500);
  }

  getCode() {
    const date = this.prepareDate();
    const minutes = Math.floor(parseInt(date.minute) / 10);

    const code = this.coderoot +
      (parseInt(date.day.slice(1)) * 100) +
      (parseInt(date.hour.slice(1)) * 10) +
      (minutes);

    return code;
  }

  refreshCode() {
    this.code = this.getCode();
  }

  getProgress() {
    const now = new Date();
    const seconds = now.getSeconds();
    const percent = 100 - Math.ceil((( seconds / 60 ) * 100));

    this.percent = percent;

    if (percent <= 100 && percent >= 99) {
      this.refreshCode();
    }
  }

  prepareDate() {
    const now = new Date();
    const day = ('0' + now.getDate()).slice(-2);
    const hour = ('0' + (now.getHours())).slice(-2);
    const minute = ('0' + (now.getMinutes())).slice(-2);
    const date = {'day': day, 'hour': hour, 'minute': minute};
    return date;

  }
}
