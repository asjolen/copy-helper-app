import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {TipComponent} from "./tip.component";
import {NzIconModule} from "ng-zorro-antd/icon";

@NgModule({
  declarations: [

    TipComponent
  ],
  entryComponents: [],
  imports: [
    CommonModule,
    TranslateModule,
    NzIconModule,
  ],
  exports: [
    TipComponent
  ]
})
export class TipModule { }
