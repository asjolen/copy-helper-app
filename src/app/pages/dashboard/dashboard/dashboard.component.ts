import {Component, OnInit} from "@angular/core";
import {ApiService} from "../../../core/services/api/api.service";
import {ObjectService} from "../../../core/services/interface/object/object.service";
import {ColorService} from "../../../core/services/interface/color/color.service";
import {FirebaseService} from "../../../core/services/firebase/firebase.service";
import {AppService} from "../../../core/services/app/app.service";
import {CacheService} from "../../../core/services/api/cache.service";
import {FlattenService} from "../../../core/services/utils/flatten.service";
import {UserService} from "../../../core/services/user/user.service";
import {Router} from "@angular/router";
import {OrderService} from "../../../core/services/utils/order.service";
import * as _ from "lodash";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  teamObjects: any = [];
  teamObjectsExtra: any = [];
  favorites: any = [];
  objectsLoading = false;
  initialLoaded = false;
  contextValues: any = [this.objectService.types.folder.name, this.objectService.types.project.name];
  isOnObjectNavigation = false;
  recipes: any = [];
  recipesLoading = false;

  constructor(private apiService: ApiService, public objectService: ObjectService,
              public colorService: ColorService, private firebaseService: FirebaseService,
              public appService: AppService, private cacheService: CacheService, private flattenService: FlattenService,
              public userService: UserService, private router: Router, public orderService: OrderService) { }

  ngOnInit(): void {
    this.contextValues = [this.objectService.types.folder.name, this.objectService.types.project.name];
    this.subscribeFirebase();
    this.getRecipes();
  }

  subscribeFirebase() {
    const url = ["team", this.appService.getStorage(this.appService.storageKeys.team).id, "objects"];

    this.firebaseService.ref(url, "child_changed").on("child_changed", (snapshot: any) => {
      if (snapshot.key === "updated") {
        this.fetchObjects(snapshot.val())
      }
    })

    this.firebaseService.ref(url, "child_added").on("child_added", (snapshot: any) => {
      if (snapshot.key === "updated") {
        this.fetchObjects(snapshot.val());
      }
    })
  }

  fetchObjects(timestampValue: any) {
    const lastUpdate = this.appService.getStorage(this.appService.storageKeys.firebaseObjectUpdate);
    if (lastUpdate && (lastUpdate.updated !== timestampValue)) {
      this.appService.setStorage(this.appService.storageKeys.firebaseObjectUpdate, {updated: timestampValue})

      this.cacheService.deleteRelatedCache("object");
      this.getObjects();
    } else {
      this.cacheService.deleteRelatedCache("object");
      this.getObjects();
    }
  }

  getObjects() {
    this.objectsLoading = !this.initialLoaded; // Only display skeletons on first load
    this.apiService.get("object", ["object"], {
      type: [this.objectService.types.folder.id, this.objectService.types.project.id].join(","),
    }).subscribe({
      next: (res) => {
        this.teamObjects = res.data;
        this.teamObjectsExtra = res.extra;
        this.objectsLoading = false;
        this.initialLoaded = true;
      },
      error: () => {
        this.objectsLoading = false;
      }
    });
  }

  getRecipes() {
    this.recipesLoading = true;
    this.apiService.get("recipe", ["recipe"]).subscribe({
      next: (res) => {
        if (res.data) {
          this.recipes = res.data;

          _.forEach(this.recipes, (recipe) => {
            const find = _.find(res.favorites, {recipe: recipe.id});
            if (find) {
              recipe.favorite = true;
            }
          })

          this.recipesLoading = false;
        }
      },
      error: () => {
        this.recipesLoading = false;
      }
    })
  }

  checkRoute() {
    this.isOnObjectNavigation = this.router.url.includes('navigate');
  }
}
