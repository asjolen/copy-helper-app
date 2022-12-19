import {Component, OnInit} from "@angular/core";
import {AuthService} from "@auth0/auth0-angular";
import {UserService} from "../../../core/services/user/user.service";
import {ApiService} from "../../../core/services/api/api.service";
import {AppService} from "../../../core/services/app/app.service";
import {FullScreenLoaderService} from "../../../core/services/interface/full-screen-loader/full-screen-loader.service";

@Component({
  selector: "app-main-navigation",
  templateUrl: "./main-navigation.component.html",
  styleUrls: ["./main-navigation.component.scss"]
})
export class MainNavigationComponent implements OnInit {
  user: any;

  constructor(private authService: AuthService, public userService: UserService,
              private apiService: ApiService, private appService: AppService,
              private fullScreenLoader: FullScreenLoaderService) { }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
    })
  }
}
