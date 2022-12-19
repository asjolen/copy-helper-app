import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {TranslateModule} from "@ngx-translate/core";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzTypographyModule} from "ng-zorro-antd/typography";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzEmptyModule} from "ng-zorro-antd/empty";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzButtonModule} from "ng-zorro-antd/button";
import {IconModule} from "../../components/icons/icon/icon.module";
import {NavigationModule} from "../../components/navigation/navigation.module";
import {RecipeCardModule} from "../../components/other/recipe-card/recipe-card.module";
import {NzSpinModule} from "ng-zorro-antd/spin";
import {NzIconModule} from "ng-zorro-antd/icon";

@NgModule({
  declarations: [
    DashboardComponent
  ],
  entryComponents: [],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    TranslateModule,
    NzGridModule,
    NzCardModule,
    NzTypographyModule,
    IconModule,
    NzDividerModule,
    NzEmptyModule,
    NzTableModule,
    NzButtonModule,
    NavigationModule,
    RecipeCardModule,
    NzSpinModule,
    NzIconModule
  ],
  exports: []
})
export class DashboardModule { }
