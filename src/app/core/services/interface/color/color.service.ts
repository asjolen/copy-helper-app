import {Injectable} from "@angular/core";
import {parseInt} from "lodash";

@Injectable({
  providedIn: "root"
})
export class ColorService {
  constructor() {}

  isDark(hexColor: string) {
    hexColor = hexColor.includes("#") ? hexColor.replace("#", "") : hexColor;
    const rgb = parseInt(hexColor, 16);
    const red = (rgb >> 16) & 0xff;  // Extract red
    const green = (rgb >>  8) & 0xff;  // Extract green
    const blue = (rgb >>  0) & 0xff;  // Extract blue

    const luma = 0.2126 * red + 0.7152 * green + 0.0722 * blue; // Per ITU-R BT.709

    return luma < 140;
  }

  convertToRgba(hex: string, alpha?: boolean|any) {
    const red = parseInt(hex.slice(1, 3), 16);
    const green = parseInt(hex.slice(3, 5), 16);
    const blue = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
      return "rgba(" + red + ", " + green + ", " + blue + ", " + (alpha === true ? 0.1 : alpha) + ")";
    } else {
      return "rgb(" + red + ", " + green + ", " + blue + ")";
    }
  }
}
