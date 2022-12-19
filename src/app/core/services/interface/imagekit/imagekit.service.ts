import {Injectable} from "@angular/core";
import ImageKit from "imagekit-javascript"
import {environment} from "../../../../../environments/environment";
import {v4 as uuidv4} from "uuid";
import {AppService} from "../../app/app.service";


@Injectable({
  providedIn: "root"
})
export class ImagekitService {
  private publicKey = environment.imageKitPublicKey;
  private urlEndpoint = "https://ik.imagekit.io/flimapp";
  private authenticationEndpoint = environment.api + "/helpers/imagekit/";

  constructor(private appService: AppService) {}

  upload(file: any) {
    return this.getImageKit().upload({
      file: file,
      fileName: uuidv4(),
      folder: this.appService.getStorage(this.appService.storageKeys.organization).id,
    });
  }

  url(path: string) {
    return this.getImageKit().url({
      path: this.appService.getStorage(this.appService.storageKeys.organization).id + '/' + path,
      urlEndpoint: this.urlEndpoint,
    })
  }

  private getImageKit() {
    return new ImageKit({
      publicKey: this.publicKey,
      urlEndpoint: this.urlEndpoint,
      authenticationEndpoint: this.authenticationEndpoint
    })
  }
}
