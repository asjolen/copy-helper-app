import {EventEmitter, Injectable, Output} from "@angular/core";
import {v4 as uuidv4} from "uuid";
import * as _ from "lodash";

@Injectable({
  providedIn: 'root'
})
export class FullScreenLoaderService {
  @Output() showFullscreenLoader: EventEmitter<any> = new EventEmitter<any>();
  currentLoaders: any = [];

  constructor() {}

  emitLoader(disallowClear = false) {
    const uuid = String(uuidv4()) + (disallowClear ? "_PERSISTENT" : "");
    this.currentLoaders.push(uuid);
    console.log("Pushed emitter queue", this.currentLoaders);

    this.emit();
  }

  deEmitLoader() {
    const latest = this.currentLoaders.pop();
    if (latest && latest.includes("PERSISTENT")) {
      this.currentLoaders.shift();
      this.currentLoaders.push(latest);
    }

    console.log("Remove from emitter queue, remaining:", this.currentLoaders);

    this.emit();
  }

  clearEmitters() {
    _.forEach(this.currentLoaders, (loader) => {
      if (!loader.includes("PERSISTENT")) {
        _.remove(this.currentLoaders, (l) => {
          return l === loader;
        })
      }
    })

    this.emit();
  }

  forceClear() {
    this.currentLoaders = [];
    this.emit();
  }

  private emit() {
    this.showFullscreenLoader.emit(this.currentLoaders);
  }
}
