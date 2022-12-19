import {Injectable} from "@angular/core";
import {AngularFireDatabase} from "@angular/fire/compat/database";

@Injectable({
  providedIn: "root"
})
export class FirebaseService {
  subscriptions: any = [];

  constructor(private firebaseDb: AngularFireDatabase) {}

  public buildUrl(urlArray: any) {
    let url: any = "";

    for (const single of urlArray) {
      url = url + "/" + single;
    }

    return url;
  }

  ref(urlArray: any, type: any = "child_changed") {
    urlArray = this.buildUrl(urlArray).substring(1);
    this.unsubscribe(urlArray, type);

    this.subscriptions[urlArray + ":" + type] = true;
    return this.firebaseDb.database.ref(urlArray);
  }

  checkIfSubscriptionExists(urlArray: any, type: any) {
    return !!this.subscriptions[urlArray + ":" + type];
  }

  unsubscribe(urlArray: any, type: any = "child_changed") {
    if (this.checkIfSubscriptionExists(urlArray, type)) {
      delete this.subscriptions[urlArray + ":" + type];
      this.firebaseDb.database.ref(urlArray).off(type);
    }
  }
}
