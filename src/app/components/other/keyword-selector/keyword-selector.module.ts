import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {EvaIconModule} from "../eva-icon/eva-icon.module";
import {NzTypographyModule} from "ng-zorro-antd/typography";
import {KeywordSelectorComponent} from "./keyword-selector.component";
import {NzSelectModule} from "ng-zorro-antd/select";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [KeywordSelectorComponent],
  entryComponents: [],
  imports: [
    CommonModule,
    TranslateModule,
    EvaIconModule,
    NzTypographyModule,
    NzSelectModule,
    FormsModule,
  ],
  exports: [KeywordSelectorComponent]
})
export class KeywordSelectorModule { }
