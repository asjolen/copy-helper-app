import {Component, Input, OnInit} from "@angular/core";
import {ColorService} from "../../../core/services/interface/color/color.service";

@Component({
  selector: "app-profile-card",
  templateUrl: "./profile-card.component.html",
  styleUrls: ["./profile-card.component.scss"]
})
export class ProfileCardComponent implements OnInit {
  @Input() users: any = [];
  @Input() displayCount = 3;
  @Input() flex: boolean = true;

  constructor(public colorService: ColorService) { }

  ngOnInit(): void {}
}
