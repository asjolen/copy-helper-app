import {Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges} from "@angular/core";
import {ObjectService} from "../../../core/services/interface/object/object.service";
import {TranslateService} from "@ngx-translate/core";
import {ColorService} from "../../../core/services/interface/color/color.service";
import {FlattenService} from "../../../core/services/utils/flatten.service";
import {ApiService} from "../../../core/services/api/api.service";
import {FirebaseService} from "../../../core/services/firebase/firebase.service";
import {AppService} from "../../../core/services/app/app.service";
import {Router} from "@angular/router";
import {CacheService} from "../../../core/services/api/cache.service";
import {NumberService} from "../../../core/services/utils/number.service";
import * as _ from "lodash";

@Component({
  selector: 'app-folder-selector',
  templateUrl: './folder-selector.component.html',
  styleUrls: ['./folder-selector.component.scss']
})
export class FolderSelectorComponent implements OnInit, OnChanges {
  @Output() selectedFolder: EventEmitter<any> = new EventEmitter<any>();
  @Input() selfObject: any = null;
  @Input() preselectedFolderId: any;
  @Input() appendText: any;

  selectedFolderName: any = null;
  folders: any = [];

  constructor(public objectService: ObjectService, private translateService: TranslateService,
              public colorService: ColorService, private flattenService: FlattenService,
              private apiService: ApiService, private firebaseService: FirebaseService,
              private appService: AppService, private router: Router, private cacheService: CacheService,
              private numberService: NumberService) { }

  ngOnInit(): void {
    this.subscribeFirebase();
    this.getFolders();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["preselectedFolderId"]) {
      this.preselectFolder();
    }
  }

  subscribeFirebase() {
    this.firebaseService.ref(["organization", this.appService.getStorage(this.appService.storageKeys.organization).id,
      "workspace", this.appService.getStorage(this.appService.storageKeys.workspace).id], "child_changed").on("child_changed", (snapshot: any) => {
      if (snapshot.key === "updated") {
        this.getFolders();
      }
    })

    this.firebaseService.ref(["organization", this.appService.getStorage(this.appService.storageKeys.organization).id,
      "workspace", this.appService.getStorage(this.appService.storageKeys.workspace).id], "child_added").on("child_added", (snapshot: any) => {
      if (snapshot.key === "updated") {
        this.getFolders();
      }
    })
  }

  getFolders() {
    this.cacheService.deleteCacheByUrl("object/object");
    this.apiService.get("object", ["object"], {
      type: this.objectService.types['folder'].id,
    }).subscribe({
      next: (res) => {
        _.remove(res.data, (folder: any) => {
          return folder.workspace !== this.appService.getStorage(this.appService.storageKeys.workspace).id;
        });

        this.folders = res.data ? res.data : [];
        this.translateService.get("string.root").subscribe((translation) => {
          const check = _.find(this.folders, (folder) => {return folder.remove})
          if (!check) {
            this.folders.unshift({icon: "folder", name: translation, remove: true});
          }
        })

        this.preselectFolder();
      }
    })
  }

  selectFolder(id: any, emit: boolean = true) {
    const folders = this.flattenService.flatten(this.folders);
    const folder = _.find(folders, (folder) => {
      return Number(folder.id) === Number(id);
    })

    if (folder) {
      this.selectedFolderName = folder.name;
      if (emit) {this.selectedFolder.emit(folder)}
    }
  }

  preselectFolder() {
    // Preselects folder based on route ID or preselectedFolderId.
    if (this.preselectedFolderId) {
      this.selectFolder(this.preselectedFolderId, false);
    } else if(!this.router.url.includes("editor")) {
      const route = this.router.url.split("/").pop()
      if(this.numberService.isNumericValue(route)) {
        const flattenedObjects = this.flattenService.flatten(this.folders);

        const find = _.find(flattenedObjects, (obj) => {
          return Number(obj.id) === Number(route);
        })

        if (find) {
          this.selectFolder(find.id);
        }
      }
    }
  }

  removeSelection() {
    this.selectedFolder.emit(null);
    this.selectedFolderName = null;
  }
}
