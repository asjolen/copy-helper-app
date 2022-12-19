import {Component, OnInit, Input} from "@angular/core";
import {RouteHelperService} from "../../../core/services/app/route-helper.service";
import {ObjectService} from "../../../core/services/interface/object/object.service";

@Component({
  selector: "app-new-object-dropdown",
  templateUrl: "./new-object-dropdown.component.html",
  styleUrls: ["./new-object-dropdown.component.scss"]
})
export class NewObjectDropdownComponent implements OnInit {
  @Input() visibleItems: any = ["folder", "project"];
  @Input() appendToUrl: any = false;
  createFolderVisible = false;

  constructor(public routeHelper: RouteHelperService, public objectService: ObjectService) {}

  ngOnInit(): void {}

}
