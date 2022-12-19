import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from "@angular/core";
import {ApiService} from "../../core/services/api/api.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ObjectService} from "../../core/services/interface/object/object.service";
import {Router} from "@angular/router";

@Component({
  selector: "app-handle-object-modal",
  templateUrl: "./handle-object-modal.component.html",
  styleUrls: ["./handle-object-modal.component.scss"]
})
export class HandleObjectModalComponent implements OnInit, OnChanges {
  @Input() visible: boolean = false;
  @Input() type: number = this.objectService.types.folder.id;
  @Input() object: any;
  @Output() visibleChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  users: any = [];
  loading = false;
  workspaceFolders = [];
  selectedFolder: any = null;
  settings: any = {};
  id: any = null;
  userAccess = [];

  form: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required]),
    userAccess: new FormControl("", []),
    workspaceAccess: new FormControl("", [])
  });

  constructor(private apiService: ApiService, public objectService: ObjectService,
              private router: Router) { }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if(changes["visible"] && changes["visible"].currentValue) {
      this.id = null;
      this.settings = {};
      this.selectedFolder = null;
      this.form.reset();
    }

    if (changes["object"] && changes["object"].currentValue) {
      this.id = changes["object"].currentValue.id;
      this.form.controls["name"].patchValue(changes["object"].currentValue.name);

      if(changes["object"].currentValue.settings && changes["object"].currentValue.settings.link) {
        this.form.controls["link"].patchValue(changes["object"].currentValue.settings.link)
      }
    }
  }

  closeModal() {
    this.visible = false;
    this.visibleChanged.emit(this.visible);
  }

  createFolder() {
    this.loading = true;

    this.apiService.post("object", ["object"], {
      id: this.id, type: this.type, name: this.form.controls["name"].value,
      content: null, parent: this.selectedFolder ? this.selectedFolder.id : null,
      settings: this.settings,
    }).subscribe({
      next: () => {
        this.closeModal();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    })
  }

  selectFolder(event: any) {
    this.selectedFolder = event;
  }
}
