import {EventEmitter, Injectable, Output} from "@angular/core";
import {environment} from "../../../../environments/environment";
import {AuthService} from "@auth0/auth0-angular";
import {Observable} from "rxjs";
import {AppService} from "../app/app.service";
import {FullScreenLoaderService} from "../interface/full-screen-loader/full-screen-loader.service";

@Injectable({
  providedIn: "root"
})
export class UserService {
  @Output() authenticated: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  userKey = environment.sessionKey + "user";
  userTemporarySettingsKey = environment.sessionKey + "temp";
  organizationManager = 20;
  workspaceManager = 10;

  constructor(private authService: AuthService, private appService: AppService,
              private fullScreenLoader: FullScreenLoaderService) {}

  setUser(user: any) {
    window.localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  getUser(): Observable<any> {
    return this.authService.user$;
  }

  formatUserName(name: any) {
    if (name.includes("@")) {
      return ""
    }

    return name.split(" ")[0];
  }

  isOrganizationManager() {
    const storage = this.appService.getStorage(this.appService.storageKeys.organization);
    return !!(storage && storage.role === this.organizationManager);
  }

  isWorkspaceManager() {
    const storage = this.appService.getStorage(this.appService.storageKeys.workspace);
    return !!(storage && storage.role === this.workspaceManager);
  }

  setTemporarySettings(key: string, value: any) {
    const settingsObject: any = this.getTemporarySettings() ? this.getTemporarySettings() : {};
    settingsObject[key] = value;
    window.localStorage.setItem(this.userTemporarySettingsKey, JSON.stringify(settingsObject));
  }

  getTemporarySettings() {
    const settings: any = window.localStorage.getItem(this.userTemporarySettingsKey);
    return settings ? JSON.parse(settings) : false;
  }

  logout() {
    this.fullScreenLoader.emitLoader();
    window.localStorage.clear();
    this.authService.logout();
  }
}
