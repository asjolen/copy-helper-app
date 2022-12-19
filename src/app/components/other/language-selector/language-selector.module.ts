import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {LanguageSelectorComponent} from "./language-selector.component";
import {TranslateModule} from "@ngx-translate/core";
import {NzToolTipModule} from "ng-zorro-antd/tooltip";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzAvatarModule} from "ng-zorro-antd/avatar";
import {NzSpaceModule} from "ng-zorro-antd/space";

@NgModule({
  declarations: [
    LanguageSelectorComponent
  ],
  entryComponents: [],
  imports: [
    CommonModule,
    TranslateModule,
    NzToolTipModule,
    NzDropDownModule,
    NzAvatarModule,
    NzSpaceModule,
  ],
  exports: [
    LanguageSelectorComponent
  ]
})
export class LanguageSelectorModule { }
