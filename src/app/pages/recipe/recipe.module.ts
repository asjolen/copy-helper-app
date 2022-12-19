import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RecipeRoutingModule} from "./recipe-routing.module";
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
import { GeneratorComponent } from './generator/generator.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzInputNumberModule} from "ng-zorro-antd/input-number";
import {NzFormModule} from "ng-zorro-antd/form";
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import {RecipeCardModule} from "../../components/other/recipe-card/recipe-card.module";
import {NzSpinModule} from "ng-zorro-antd/spin";
import {NzIconModule} from "ng-zorro-antd/icon";
import {FolderSelectorModule} from "../../components/other/folder-selector/folder-selector.module";

@NgModule({
  declarations: [
    GeneratorComponent,
    RecipeListComponent
  ],
  entryComponents: [],
  imports: [
    CommonModule,
    RecipeRoutingModule,
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
    FormsModule,
    NzInputModule,
    NzSelectModule,
    NzInputNumberModule,
    NzFormModule,
    ReactiveFormsModule,
    RecipeCardModule,
    NzSpinModule,
    NzIconModule,
    FolderSelectorModule
  ],
  exports: []
})
export class RecipeModule { }
