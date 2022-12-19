import { Injectable } from "@angular/core";
import * as _ from "lodash";

@Injectable({
  providedIn: "root"
})
export class OrderService {

  constructor() {}

  orderBy(items: any, keys: any, asc = true): any {
    return _.orderBy(items, keys, [asc ? 'asc' : 'desc']);
  }
}
