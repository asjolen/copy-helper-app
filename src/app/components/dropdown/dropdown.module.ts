import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NewObjectDropdownComponent} from './new-object-dropdown/new-object-dropdown.component';
import {NzMenuModule} from "ng-zorro-antd/menu";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {IconModule} from "../icons/icon/icon.module";
import {ModalsModule} from "../../modals/modals.module";

@NgModule({
  declarations: [
    NewObjectDropdownComponent,
  ],
  entryComponents: [],
  imports: [
    CommonModule,
    TranslateModule,
    NzIconModule,
    NzMenuModule,
    NzDividerModule,
    NzButtonModule,
    NzDropDownModule,
    IconModule,
    ModalsModule,
  ],
  exports: [
    NewObjectDropdownComponent,
  ]
})
export class DropDownModule { }
