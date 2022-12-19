import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {NzIconModule} from "ng-zorro-antd/icon";
import { RecipeCardComponent } from './recipe-card.component';
import {NzCardModule} from "ng-zorro-antd/card";
import {NzTypographyModule} from "ng-zorro-antd/typography";
import {NzButtonModule} from "ng-zorro-antd/button";
import {IconModule} from "../../icons/icon/icon.module";

@NgModule({
  declarations: [
    RecipeCardComponent
  ],
  entryComponents: [],
  imports: [
    CommonModule,
    TranslateModule,
    NzIconModule,
    NzCardModule,
    NzTypographyModule,
    NzButtonModule,
    IconModule,
  ],
  exports: [
    RecipeCardComponent
  ]
})
export class RecipeCardModule { }
