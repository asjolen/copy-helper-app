import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {MainNavigationComponent} from "./main-navigation/main-navigation.component";
import {ObjectNavigationComponent} from "./object-navigation/object-navigation.component";
import {SideNavigationComponent} from "./side-navigation/side-navigation.component";
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import {NzSpaceModule} from "ng-zorro-antd/space";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {RouterModule} from "@angular/router";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzEmptyModule} from "ng-zorro-antd/empty";
import {NzToolTipModule} from "ng-zorro-antd/tooltip";
import {NzPopconfirmModule} from "ng-zorro-antd/popconfirm";
import {DragAndDropModule} from "angular-draggable-droppable";
import {NzSkeletonModule} from "ng-zorro-antd/skeleton";
import {NzSpinModule} from "ng-zorro-antd/spin";
import {NzTagModule} from "ng-zorro-antd/tag";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzTreeViewModule} from "ng-zorro-antd/tree-view";
import {ProfileCardModule} from "../other/profile-card/profile-card.module";
import {IconModule} from "../icons/icon/icon.module";
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzTypographyModule} from "ng-zorro-antd/typography";
import {DropDownModule} from "../dropdown/dropdown.module";
import {LanguageSelectorModule} from "../other/language-selector/language-selector.module";
import {TipModule} from "../other/tip/tip.module";
import {ModalsModule} from "../../modals/modals.module";


@NgModule({
  declarations: [
    MainNavigationComponent,
    ObjectNavigationComponent,
    SideNavigationComponent,
  ],
  entryComponents: [],
  imports: [
    CommonModule,
    TranslateModule,
    NzPageHeaderModule,
    NzSpaceModule,
    NzButtonModule,
    NzDropDownModule,
    NzIconModule,
    NzDividerModule,
    RouterModule,
    NzGridModule,
    NzCardModule,
    NzEmptyModule,
    NzToolTipModule,
    NzPopconfirmModule,
    DragAndDropModule,
    NzSkeletonModule,
    NzSpinModule,
    NzTagModule,
    ProfileCardModule,
    NzInputModule,
    NzTreeViewModule,
    ProfileCardModule,
    IconModule,
    NzLayoutModule,
    NzTypographyModule,
    DropDownModule,
    LanguageSelectorModule,
    TipModule,
    ModalsModule,
  ],
  exports: [
    MainNavigationComponent,
    SideNavigationComponent,
    ObjectNavigationComponent
  ]
})
export class NavigationModule { }
