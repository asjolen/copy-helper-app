import {Component, OnInit, Input} from "@angular/core";

@Component({
  selector: "app-tip",
  templateUrl: "./tip.component.html",
  styleUrls: ["./tip.component.scss"]
})
export class TipComponent implements OnInit {
  @Input() string: string = "";
  @Input() classes: string = "";
  @Input() hideIcon = false;

  constructor() { }

  ngOnInit(): void {
  }

}
