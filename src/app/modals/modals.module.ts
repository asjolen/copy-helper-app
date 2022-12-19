import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzTypographyModule} from "ng-zorro-antd/typography";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzFormModule} from "ng-zorro-antd/form";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzProgressModule} from "ng-zorro-antd/progress";
import {NzAlertModule} from "ng-zorro-antd/alert";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {TipModule} from "../components/other/tip/tip.module";
import {HandleObjectModalComponent} from "./handle-object-modal/handle-object-modal.component";
import {FolderSelectorModule} from "../components/other/folder-selector/folder-selector.module";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzToolTipModule} from "ng-zorro-antd/tooltip";
import {NzSegmentedModule} from "ng-zorro-antd/segmented";
import {NzSelectModule} from "ng-zorro-antd/select";

@NgModule({
  declarations: [
    HandleObjectModalComponent,
  ],
  entryComponents: [],
  imports: [
    CommonModule,
    NzModalModule,
    NzTypographyModule,
    NzDividerModule,
    TranslateModule,
    NzButtonModule,
    NzIconModule,
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    NzProgressModule,
    NzAlertModule,
    NzCheckboxModule,
    FormsModule,
    TipModule,
    FolderSelectorModule,
    FormsModule,
    NzDropDownModule,
    NzToolTipModule,
    NzSegmentedModule,
    NzSelectModule,
  ],
  exports: [
    HandleObjectModalComponent,
  ]
})
export class ModalsModule { }
