import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {AuthGuard} from "@auth0/auth0-angular";
import {GeneratorComponent} from "./generator/generator.component";
import {RecipeListComponent} from "./recipe-list/recipe-list.component";

const routes: Routes = [
  {path: "recipes", component: RecipeListComponent, canActivate: [AuthGuard]},
  {path: "recipe/:id", component: GeneratorComponent, canActivate: [AuthGuard]},
  {path: "recipe/:id/:projectId", component: GeneratorComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipeRoutingModule { }
