import {Component, OnInit} from "@angular/core";
import {FullScreenLoaderService} from "../../../core/services/interface/full-screen-loader/full-screen-loader.service";

@Component({
  selector: "app-full-screen-loader",
  templateUrl: "./full-screen-loader.component.html",
  styleUrls: ["./full-screen-loader.component.scss"]
})
export class FullScreenLoaderComponent implements OnInit {
  showLoader = false;
  loadersAppended: any = [];

  constructor(private fullScreenLoaderService: FullScreenLoaderService) { }

  ngOnInit(): void {
    this.fullScreenLoaderService.showFullscreenLoader.subscribe((val) => {
      this.showLoader = val.length;
    })
  }

}
