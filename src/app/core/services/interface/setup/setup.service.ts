import {Injectable} from "@angular/core";
import {environment} from "../../../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class SetupService {
  setupKey = environment.sessionKey + "setup";

  constructor() {}

  setSetup(setup: any) {
    window.sessionStorage.setItem(this.setupKey, JSON.stringify(setup));
  }

  getSetup(): any {
    const setup = window.sessionStorage.getItem(this.setupKey);
    return setup ? JSON.parse(setup) : false;
  }

  clearSetup() {
    window.sessionStorage.removeItem(this.setupKey);
  }

  getDomainPath(): any {
    const domainList = /:\/\/([^\/]+)/.exec(window.location.href);
    if (domainList && domainList.length && domainList[1]) {
      return domainList[1];
    }

    return false;
  }
}
