import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AuthRoutingModule} from "./auth-routing.module";
import {AuthenticateComponent} from './authenticate/authenticate.component';
import {TranslateModule} from "@ngx-translate/core";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzFormModule} from "ng-zorro-antd/form";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzTypographyModule} from "ng-zorro-antd/typography";
import {NzCardModule} from "ng-zorro-antd/card";
import {IconModule} from "../../components/icons/icon/icon.module";
import {WelcomeComponent} from './welcome/welcome.component';
import {NzSpinModule} from "ng-zorro-antd/spin";
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzAvatarModule} from "ng-zorro-antd/avatar";
import {NzSpaceModule} from "ng-zorro-antd/space";


@NgModule({
  declarations: [
    AuthenticateComponent,
    WelcomeComponent,
  ],
  entryComponents: [],
  imports: [
    CommonModule,
    AuthRoutingModule,
    TranslateModule,
    NzDividerModule,
    NzButtonModule,
    NzIconModule,
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    NzTypographyModule,
    NzCardModule,
    IconModule,
    FormsModule,
    NzSpinModule,
    TranslateModule,
    NzDropDownModule,
    NzSelectModule,
    NzAvatarModule,
    NzSpaceModule
  ],
  exports: []
})
export class AuthModule { }
