import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {AuthenticateComponent} from "./authenticate/authenticate.component";
import {WelcomeComponent} from "./welcome/welcome.component";
import {AuthGuard} from "@auth0/auth0-angular";

const routes: Routes = [
  {path: "auth/authenticate", component: AuthenticateComponent},
  {path: "welcome", component: WelcomeComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
