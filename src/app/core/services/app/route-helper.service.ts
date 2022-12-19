import {Injectable} from "@angular/core";
import {Router} from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class RouteHelperService {

  constructor(private router: Router) {}

  navigate(path: string, params?: any) {
    this.router.navigate([path], {
      queryParams: params
    }).then(() => {}).catch((e) => {
      console.log("Navigation error", e);
    });
  }
}
