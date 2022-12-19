import {Component, OnInit} from "@angular/core";
import {ApiService} from "../../../core/services/api/api.service";
import {AppService} from "../../../core/services/app/app.service";
import {FullScreenLoaderService} from "../../../core/services/interface/full-screen-loader/full-screen-loader.service";
import {RecipeService} from "../../../core/services/recipe/recipe.service";
import {Router} from "@angular/router";
import {FirebaseService} from "../../../core/services/firebase/firebase.service";
import {CacheService} from "../../../core/services/api/cache.service";

@Component({
  selector: "app-side-navigation",
  templateUrl: "./side-navigation.component.html",
  styleUrls: ["./side-navigation.component.scss"]
})
export class SideNavigationComponent implements OnInit {
  currentTeam: any;
  teams: any = [];
  favorites: any = [];

  constructor(private apiService: ApiService, private appService: AppService,
              private fullScreenLoader: FullScreenLoaderService, public recipeService: RecipeService,
              private router: Router, private firebaseService: FirebaseService, private cacheService: CacheService) {}

  ngOnInit() {
    this.subscribeFirebase();
    this.getTeams();
    this.currentTeam = this.appService.getStorage(this.appService.storageKeys.team);
  }

  goToRecipe(magic: any) {
    this.router.navigate(['recipe/' + magic]);
  }

  getTeams() {
    if (this.appService.getStorage(this.appService.storageKeys.team)) {
      this.apiService.get("team", ["team"]).subscribe({
        next: (res) => {
          if (res.data) {
            this.teams = res.data;
          }
        }
      })
    }
  }

  switchTeam(team: any) {
    this.fullScreenLoader.emitLoader(true);
    this.appService.setStorage(this.appService.storageKeys.team, team);
    window.location.reload();
  }

  subscribeFirebase() {
    const url = ["user", this.appService.getStorage(this.appService.storageKeys.user).id];

    this.firebaseService.ref(url, "child_changed").on("child_changed", (snapshot: any) => {
      if (snapshot.key === "updated") {
        this.cacheService.deleteRelatedCache("recipe/favorite");
        this.fetchFavorites()
      }
    })

    this.firebaseService.ref(url, "child_added").on("child_added", (snapshot: any) => {
      if (snapshot.key === "updated") {
        this.cacheService.deleteRelatedCache("recipe/favorite");
        this.fetchFavorites();
      }
    })
  }

  fetchFavorites() {
    this.apiService.get("recipe", ["favorite"]).subscribe({
      next: (res) => {
        this.favorites = res.data;
        this.favorites.slice(0, 4);
      }
    })
  }
}
