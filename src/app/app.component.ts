import {Component, OnDestroy, OnInit} from '@angular/core';
import {environment} from "../environments/environment";
import {HttpService} from "./services/http.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public title!: string;
  public year!: string;
  public error!: boolean;
  public nav!: Array<{ link: string; title: string }>;

  private interval: any;
  private serverTestSubscription!: Subscription;

  public constructor(private httpService: HttpService) {
  }

  ngOnInit() {
    const date = new Date();
    this.year = date.getFullYear().toString();

    if (environment.title) {
      this.title = `Airtime | Artificial Horizon (${environment.title})`;
    }

    this.refreshData();
    this.interval = setInterval(() => {
      this.refreshData();
    }, 300000);

    this.nav = [
      {
        title: 'Home', link: '/'
      },
      {
        title: 'Flights', link: '/flights'
      },
      {
        title: 'Airports', link: '/airports'
      },
      {
        title: 'Aircraft', link: '/aircraft'
      },
      {
        title: 'Aircraft types', link: '/aircraft-types'
      },
      {
        title: 'People', link: '/people'
      }
    ];
  }

  refreshData() {
    this.serverTestSubscription = this.httpService.getData(`${environment.apiServer}${environment.app}/actuator/health/`).subscribe({
      next: (v) => {
        this.error = false;
        this.checkAppVersion();
        this.setLogin();
      },
      error: (e) => {
        this.error = true;
        console.error(e)
      },
      complete: () => {
        this.error = false;
      }
    });
  }

  checkAppVersion() {
    /*this.versionCheckSubscription = this.httpService
      .getData(`${environment.apiServer}${environment.app}/version`).subscribe(data => {
        this.utility = data;

        const apiVersion = this.utility.api.replace(/[ ,.]/g, '');
        const dbVersion = this.utility.database.replace(/[ ,.]/g, '');

        if (parseFloat(apiVersion) < parseFloat(dbVersion)) {
          this.updateNotification.show();
        }
      }, () => {
        console.log('Could not get version from API');
      });*/
  }

  setLogin() {
    /*this.httpService.getLogin().then(login => {

      this.currentLogin = login;

      if (this.currentLogin) {
        localStorage.setItem('login', JSON.stringify(this.currentLogin));
      }
      this.error = false;
    }, err => {
      console.log(err);
    });*/
  }

  setBeforeUnload(ignore: boolean) {
    // this.localStorageService.setItem('ignoreBeforeUnload', ignore);
  }

  ngOnDestroy() {
    if (typeof this.serverTestSubscription !== 'undefined') {
      this.serverTestSubscription.unsubscribe();
    }
  }
}
