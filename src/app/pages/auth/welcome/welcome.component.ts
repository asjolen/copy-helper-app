import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "@auth0/auth0-angular";
import {ApiService} from "../../../core/services/api/api.service";
import {FullScreenLoaderService} from "../../../core/services/interface/full-screen-loader/full-screen-loader.service";
import {AppService} from "../../../core/services/app/app.service";
import {UserService} from "../../../core/services/user/user.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CacheService} from "../../../core/services/api/cache.service";
import {TranslateService} from "@ngx-translate/core";
// @ts-ignore
import {findFlagUrlByCountryName} from "country-flags-svg";
import * as _ from "lodash";
import * as countries from "world-countries";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  user: any;
  loading: boolean = false;
  fetching: boolean = false;
  interval: any;
  checkComplete = false;
  hasDetails = {
    user: false,
    organization: false,
    team: false,
  }
  @Input() floating = false;
  languages = ["SE", "EN"];
  flagUrl = null;
  countriesList: any = countries.default;


  userForm: FormGroup = new FormGroup({
    givenName: new FormControl("", [Validators.required]),
    familyName: new FormControl("", [Validators.required]),
  });

  organizationForm: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required]),
    website: new FormControl(null, []),
  });

  teamForm: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required]),
  });

  constructor(private apiService: ApiService, private userService: UserService,
              private authService: AuthService, private fullScreenLoaderService: FullScreenLoaderService,
              private appService: AppService, private router: Router, private cacheService: CacheService,
              private translate: TranslateService) {
    translate.setDefaultLang(this.languages[0]);
    translate.use(this.languages[0]);
  }


  ngOnInit() {
    this.checkDetails();
    this.fetchOrganization();

    this.flagUrl = findFlagUrlByCountryName("Sweden");

    this.authService.user$.subscribe((user) => {
      this.user = user;
      if (this.user.given_name) {
        this.hasDetails.user = true;
        this.apiService.post("user", ["user"]).subscribe();
      }
    })
  }

  logout() {
    this.userService.logout();
  }

  checkDetails() {
    this.interval = setInterval(() => {
      if ((this.hasDetails.user && this.hasDetails.organization && this.hasDetails.team) && !this.checkComplete) {
        this.checkComplete = true;
        this.fullScreenLoaderService.emitLoader(true);
        this.router.navigate(["dashboard"]);
        clearInterval(this.interval);
        setTimeout(() => {
          window.location.reload();
        }, 300);
      }
    }, 500);
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
    // console.log(this.languages);
    console.log(this.findByKey(key).languages);
    return Object.values(this.findByKey(key).languages);
  }

  saveUserDetails() {
    this.loading = true;
    this.apiService.post("user", ["user"], {
      skipAuth0Fetch: true,
      given_name: this.userForm.controls['givenName'].value,
      family_name: this.userForm.controls['familyName'].value,
    }).subscribe({
      next: () => {
        this.loading = false;
        this.hasDetails.user = true;
      },
      error: () => {
        this.loading = false;
      }
    })
  }

  saveOrganizationDetails() {
    if (!this.loading) {
      this.loading = true;
      this.apiService.post("organization", ["organization"], {
        name: this.organizationForm.controls["name"].value,
        website: this.organizationForm.controls["website"].value ? this.organizationForm.controls["website"].value : null
      }).subscribe({
        next: () => {
          this.loading = false;
          this.fetchOrganization();
        },
        error: () => {
          this.loading = false;
        }
      })
    }
  }

  saveTeamDetails() {
    if (!this.loading) {
      this.loading = true;
      this.apiService.post("team", ["team"], {
        name: this.teamForm.controls["name"].value,
      }).subscribe({
        next: () => {
          this.loading = false;
          this.fetchTeam();
        },
        error: () => {
          this.loading = false;
        }
      })
    }
  }

  fetchOrganization() {
    this.fetching = true;
    this.cacheService.deleteCacheByUrl("organization/organization");
    this.apiService.get("organization", ["organization"]).subscribe({
      next: (res) => {
        if (res.data && res.data.length) {
          this.hasDetails.organization = true;
          this.appService.setStorage(this.appService.storageKeys.organization, res.data[0]);
          this.fetchTeam();
        }

        this.fetching = false;
      }
    })
  }

  fetchTeam() {
    this.fetching = true;
    this.cacheService.deleteCacheByUrl("team/team");
    this.apiService.get("team", ["team"]).subscribe({
      next: (res) => {
        if (res.data && res.data.length) {
          this.hasDetails.team = true;
          this.appService.setStorage(this.appService.storageKeys.team, res.data[0]);
        }

        this.fetching = false;
      }
    })
  }
}
