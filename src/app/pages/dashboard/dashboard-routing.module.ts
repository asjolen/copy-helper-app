import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {AuthGuard} from "@auth0/auth0-angular";
import {DashboardComponent} from "./dashboard/dashboard.component";

const routes: Routes = [
  {path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard], children: []},

  {path: "navigate", component: DashboardComponent, canActivate: [AuthGuard], children: [
    {path: "**", component: DashboardComponent, canActivate: [AuthGuard]},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
