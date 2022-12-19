import {Component, OnInit} from "@angular/core";
import {FullScreenLoaderService} from "../../../core/services/interface/full-screen-loader/full-screen-loader.service";
import {AuthService} from '@auth0/auth0-angular';
import {AlertMessageService} from "../../../core/services/interface/alert-message/alert-message.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.scss']
})
export class AuthenticateComponent implements OnInit {
  constructor(private fullScreenLoaderService: FullScreenLoaderService, public authService: AuthService,
              private alertService: AlertMessageService, private router: Router) { }

  ngOnInit(): void {
    this.fullScreenLoaderService.emitLoader();
    this.authService.isAuthenticated$.subscribe((auth) => {
      if (!auth) {
        this.authenticate();
      } else {
        this.router.navigate(["welcome"]);
      }
    })
  }

  authenticate() {
    this.authService.loginWithRedirect({
      redirect_uri: window.location.origin + "/welcome"
    })
  }
}
