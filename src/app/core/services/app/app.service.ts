import {Injectable} from "@angular/core";
import {FirebaseService} from "../firebase/firebase.service";
import {ApiService} from "../api/api.service";
import {RouteHelperService} from "./route-helper.service";
import {CacheService} from "../api/cache.service";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class AppService {
  storageKeys: any = {
    organization: environment.sessionKey + "organization",
    organizations: environment.sessionKey + "organizations",
    team: environment.sessionKey + "team",
    teams: environment.sessionKey + "teams",
    firebaseObjectUpdate: environment.sessionKey + "objectUpdate",
    user: environment.sessionKey + "user"
  }

  constructor(private firebaseService: FirebaseService, private cacheService: CacheService,
              private apiService: ApiService, private routeHelper: RouteHelperService) {}

  setStorage(storageKey: string, object: any) {
    window.localStorage.setItem(storageKey, JSON.stringify(object));
  }

  getStorage(storageKey: string): any {
    const object = window.localStorage.getItem(storageKey);
    return object ? JSON.parse(object) : false;
  }
}
