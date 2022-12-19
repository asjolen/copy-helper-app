import {Component, Input, OnInit} from "@angular/core";
// @ts-ignore
import {findFlagUrlByCountryName} from "country-flags-svg";
import {TranslateService} from "@ngx-translate/core";
import * as countries from "world-countries";
import * as _ from "lodash";

@Component({
  selector: "app-language-selector",
  templateUrl: "./language-selector.component.html",
  styleUrls: ["./language-selector.component.scss"]
})
export class LanguageSelectorComponent implements OnInit {
  @Input() floating = false;
  flagUrl = null;
  languages = ["SE"];
  countriesList: any = countries.default;

  constructor(private translate: TranslateService) {
    translate.setDefaultLang(this.languages[0]);
    translate.use(this.languages[0]);
  }

  ngOnInit(): void {
    this.flagUrl = findFlagUrlByCountryName("Sweden");
  }

  getCountryFlag(countryName: string) {
    return findFlagUrlByCountryName(countryName);
  }

  findByKey(key: string) {
    return _.find(this.countriesList, (country) => {
      return country.cca2 === key;
    })
  }

  getLanguageName(key: string) {
    return Object.values(this.findByKey(key).languages)[0];
  }
}
