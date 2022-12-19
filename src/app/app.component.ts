import { Component } from '@angular/core';
import {HeaderService} from "./core/services/interface/header/header.service";
import {AuthService} from "@auth0/auth0-angular";
import {ApiService} from "./core/services/api/api.service";
import {AppService} from "./core/services/app/app.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private headerService: HeaderService, private authService: AuthService,
              private apiService: ApiService, private appService: AppService) {
    this.headerService.checkEvents();
    this.getUser();
  }

  getUser() {
    this.authService.user$.subscribe(() => {
      this.apiService.get("user", ["user"]).subscribe({
        next: (res) => {
          this.appService.setStorage(this.appService.storageKeys.user, res.data[0]);
        }
      })
    })
  }
}
