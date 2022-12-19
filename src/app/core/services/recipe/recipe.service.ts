import { Injectable } from "@angular/core";
import * as _ from "lodash";

@Injectable({
  providedIn: "root"
})
export class RecipeService {

  constructor() {}

  recipeCodeToHTML(response: any) {
    const responseList: any = [];
    const regex = /<alt:start>(.*?)<alt:end>/;
    response = response.split(regex);

    _.forEach(response, (r) => {
      if (r && r !== "") {
        responseList.push(r);
      }
    });

    return responseList;
  }
}
