import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {FullScreenLoaderComponent} from "./full-screen-loader.component";
import {NzIconModule} from "ng-zorro-antd/icon";

@NgModule({
  declarations: [
    FullScreenLoaderComponent
  ],
  entryComponents: [],
  imports: [
    CommonModule,
    TranslateModule,
    NzIconModule,
  ],
  exports: [
    FullScreenLoaderComponent
  ]
})
export class FullScreenLoaderModule { }
