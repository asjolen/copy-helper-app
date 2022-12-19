import {Injectable} from "@angular/core";
import {NzMessageService, NzMessageType} from "ng-zorro-antd/message";
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: "root"
})
export class AlertMessageService {

  constructor(private message: NzMessageService, private translate: TranslateService) {}

  displayStrMessage(str: string, type: NzMessageType = "info", skipTranslate = false) {
    if (!skipTranslate) {
      this.translate.get(str).subscribe((translation) => {
        this.message.create(type, translation ? translation : str, {nzPauseOnHover: true, nzDuration: 5000});
      });
    } else {
      this.message.create(type, str, {nzPauseOnHover: true, nzDuration: 5000});
    }

  }

  displayErrorMessage(object: any, type: NzMessageType = "error") {
    let message = object.error && object.error.error ? object.error.error : "string.general_error";

    if (message.includes("api")) {
      this.translate.get(message).subscribe((translation) => {
        this.message.create(type, translation, {nzPauseOnHover: true});
      });
    } else {
      this.translate.get("api.general_error").subscribe((translation) => {
        this.message.create(type, translation, {nzPauseOnHover: true, nzDuration: 5000});
      });
    }

  }
}
