import {Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter} from "@angular/core";
import {ColorService} from "../../../core/services/interface/color/color.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {ApiService} from "../../../core/services/api/api.service";
import {FlattenService} from "../../../core/services/utils/flatten.service";
import {ObjectService} from "../../../core/services/interface/object/object.service";
import {NzContextMenuService, NzDropdownMenuComponent} from "ng-zorro-antd/dropdown";
import {NumberService} from "../../../core/services/utils/number.service";
import {TimeService} from "../../../core/services/interface/time/time.service";
import {AppService} from "../../../core/services/app/app.service";
import {HeaderService} from "../../../core/services/interface/header/header.service";
import * as _ from "lodash";


@Component({
  selector: "app-object-navigation",
  templateUrl: "./object-navigation.component.html",
  styleUrls: ["./object-navigation.component.scss"]
})
export class ObjectNavigationComponent implements OnInit, OnChanges {
  @Input() objects: any = [];
  @Input() filtration: any;
  @Input() extra: any = [];
  @Input() row: boolean = true;
  @Input() sortByKey: any;
  @Input() showSorting: boolean = true;
  @Input() isLoading: boolean = true;
  @Input() updateTimestamp: any = false;
  @Input() dropdownCreateTypes: any = [];
  @Output() emitFile: EventEmitter<any> = new EventEmitter<any>();
  @Output() emitChange: EventEmitter<any> = new EventEmitter<any>();
  currentId: any = null;
  initialLoaded = false;
  filteredObjects: any = [];
  quickEditObjectModal: any = false;
  shareObjectModal: any = false;
  dragObject: any = null;
  isDragging: boolean = false;
  hasDropped: boolean = false;
  breadCrumbArray: any = [];
  filterDone: boolean = false;

  constructor(public colorService: ColorService, public objectService: ObjectService,
              private router: Router, private activatedRoute: ActivatedRoute, private headerService: HeaderService,
              private location: Location, private apiService: ApiService, public numberService: NumberService,
              private flattenService: FlattenService, private nzContextMenuService: NzContextMenuService,
              public timeService: TimeService,private appService: AppService) {}


  ngOnChanges(changes: SimpleChanges) {
    if((changes["objects"] && changes["objects"].currentValue) || changes["updateTimestamp"]) {
      this.filteredObjects = this.objects;
      this.doObjectLogic();
    }
  }

  ngOnInit(): void {
    this.activatedRoute.url.subscribe({
      next: () => {
        this.doObjectLogic();
      }
    })
  }

  doObjectLogic() {
    const route = this.router.url.split("/").pop();
    this.currentId = route;

    if (this.numberService.isNumericValue(route)) {
      this.filterNesting(Number(route));
    } else {
      this.filteredObjects = this.objects;

      this.emitFile.emit(false);
      this.setExtraData();
    }

    this.buildBreadCrumb();
    this.emitChange.emit(true);
  }

  hideFilteredObjects(objects: any) {
    return objects;
  }

  setExtraData() {
    _.forEach(this.filteredObjects, (o) => {
      const find = _.find(this.extra, {id: o.id});
      if (find) {
        _.merge(o, find);
      }
    })

    setTimeout(() => {
      this.filterDone = true;
    }, 250);
  }

  filterNesting(id?: number) {
    let flattedObjects = this.flattenService.flatten(this.objects);

    const objects: any = _.filter(flattedObjects, (obj) => {
      return obj.parent === (id ? id : Number(this.currentId));
    })

    this.filteredObjects = objects ? objects : this.objects;
    this.setExtraData();
  }

  openObject(object: any) {
    if (object.type === this.objectService.types.folder.id) {
      const routerUrl = this.breadCrumbArray.length ? this.router.url : 'navigate';
      this.router.navigate([routerUrl, object.id]);
    }

    if ([this.objectService.types.project.id].includes(object.type)) {
      this.router.navigate(["editor/" + this.objectService.findObjectType(object.type).name + "/" + object.id]);
    }
  }

  appendFolderToUrl() {
    const lastPath = this.router.url.split("/").pop();
    return this.numberService.isNumericValue(lastPath) ? lastPath : null;
  }

  countObjects(obj: any) {
    const flattenedObjects = this.flattenService.flatten(this.objects);
    const find = _.filter(flattenedObjects, (flat) => {
      return flat.parent === obj.id;
    })

    return find ? find : [];
  }

  goBack() {
    const currentUrl: any = this.router.url.split("/").pop();
    if (this.numberService.isNumericValue(currentUrl)) {
       const route = this.router.url.replace(currentUrl, "");
       this.router.navigate([route]);
    } else {
      this.location.back();
    }
  }

  deleteObject(object: any) {
    this.objectService.deleteObject(object);
  }

  buildBreadCrumb() {
    const currentUrl: any = this.router.url.split("/");
    const breadcrumb: any = [];

    _.forEach(currentUrl, (url) => {
      if (this.numberService.isNumericValue(url)) {
        const find = _.find(this.flattenService.flatten(this.objects), {id: Number(url)});

        if (find) {
          breadcrumb.push(find);
        }
      }
    })

    this.breadCrumbArray = breadcrumb;
  }

  goToBreadCrumb(breadcrumb: any, root: boolean) {
    if (root) {
      this.router.navigate(["navigate"])
    } else {
      const path: any = [];
      _.forEach(this.breadCrumbArray, (crumb): any => {
        path.push(crumb.id);
        if (crumb.id === breadcrumb.id) {
          return false;
        }
      });

      this.router.navigate(["navigate/" + path.join("/")])
    }
  }

  openModal(object: any, key: string) {
    if (key === "quick-edit") {
      this.quickEditObjectModal = object
    }

    if (key === "share") {
      this.shareObjectModal = object;
    }
  }

  getParentObject() {
    const find = _.find(this.flattenService.flatten(this.objects), (obj) => {
      return Number(obj.id) === Number(this.dragObject.parent);
    })

    return find && find.parent ? find.parent : "root";
  }

  objectDropped(dropEvent: any, destinationObject: any) {
    this.hasDropped = true;
    if (destinationObject && destinationObject.type === this.objectService.types.folder.id && this.dragObject.id !== destinationObject.id) {
      this.objectService.moveObject(this.dragObject, destinationObject);
    } else if (this.numberService.isNumericValue(destinationObject) || destinationObject === "root") {
      this.objectService.moveObject(this.dragObject, destinationObject); // Move folder up
    }

    this.setDraggingObjectZIndex(this.dragObject, false);
    this.dragObject = null;
    this.isDragging = false;
    this.hasDropped = false;
  }

  setDraggingObjectZIndex(object: any, bool: boolean) {
    if (object) {
      object.zIndex = bool ? 99 : 1;
    }
  }

  dragStart(object: any) {
    this.setDraggingObjectZIndex(object, true);
    this.dragObject = object;
    this.isDragging = true;
  }

  dragEnd() {
    if (!this.hasDropped) {
      window.setTimeout(() => {
        this.setDraggingObjectZIndex(this.dragObject, false);
        this.isDragging = false;
      }, 50)
    }
  }

  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent): void {
    this.nzContextMenuService.create($event, menu);
  }

  closeMenu(): void {
    this.nzContextMenuService.close();
  }
}
