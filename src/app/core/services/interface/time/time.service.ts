import { Injectable } from '@angular/core';
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  constructor() {}

  readableDate(date: any, format = "DD/MM-YY") {
    return moment.utc(date).format(format);
  }

  humanizedDate(date: any) {
    const diff = moment().diff(date, 'days');
    if (diff < 3) {
      return moment.utc(date).fromNow();
    } else {
      return this.readableDate(date);
    }
  }
}
