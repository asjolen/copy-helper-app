import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {NzIconModule} from "ng-zorro-antd/icon";
import { FolderSelectorComponent } from './folder-selector.component';
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {IconModule} from "../../icons/icon/eva-icon.module";

@NgModule({
  declarations: [
    FolderSelectorComponent
  ],
  entryComponents: [],
  imports: [
    CommonModule,
    TranslateModule,
    NzIconModule,
    NzButtonModule,
    NzDropDownModule,
    IconModule
  ],
  exports: [
    FolderSelectorComponent
  ]
})
export class FolderSelectorModule { }
