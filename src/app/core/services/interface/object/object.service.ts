import {Injectable} from "@angular/core";
import {ApiService} from "../../api/api.service";
import {NumberService} from "../../utils/number.service";
import * as _ from "lodash";

@Injectable({
  providedIn: "root"
})
export class ObjectService {
  types: any = {
    "folder": {id: 1, name: "folder", string: "string.folder", icon: "folder", color: "#FE774F"},
    "project": {id: 10, name: "project", string: "string.project", icon: "document-text", color: "#FE774F"},
  }

  constructor(private apiService: ApiService) {}

  /**
   * Destination must be of folder type for move to be successful.
   * @param object
   * @param destination
   */
  moveObject(object: any, destination: any) {
    object.hidden = true;
    if (destination.id) {
      destination.loading = true;
    }

    this.apiService.post("object", ["move"], {
      move_object: object.id,
      move_to: destination.id ? destination.id : destination}).subscribe({
      next: () => {},
      error: () => {
        object.hidden = false;
        if (destination.id) {
          destination.loading = false;
        }
      }
    });
  }

  /**
   * Delete object
   * @param object
   */
  deleteObject(object: any) {
    object.hidden = true;
    this.apiService.delete("object", ["object"], {id: object.id}).subscribe({});
  }


  /**
   * Find id by type
   * @param id
   */
  findObjectType(id: number): any {
    return _.find(this.types, (typeObj: any) => {
      if (id === typeObj.id) {
        return typeObj
      }
    });
  }
}
