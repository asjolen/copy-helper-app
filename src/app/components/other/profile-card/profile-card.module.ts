import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {NzIconModule} from "ng-zorro-antd/icon";
import { ProfileCardComponent } from './profile-card.component';
import {NzToolTipModule} from "ng-zorro-antd/tooltip";

@NgModule({
  declarations: [
    ProfileCardComponent
  ],
  entryComponents: [],
  imports: [
    CommonModule,
    TranslateModule,
    NzIconModule,
    NzToolTipModule,
  ],
  exports: [
    ProfileCardComponent
  ]
})
export class ProfileCardModule { }
