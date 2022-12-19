import {Component, OnInit} from "@angular/core";
import {GeneratorService} from "../../../core/services/interface/generator/generator.service";
import {ApiService} from "../../../core/services/api/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RecipeService} from "../../../core/services/recipe/recipe.service";
import * as uuid from 'uuid';
import * as _ from "lodash";
import {FullScreenLoaderService} from "../../../core/services/interface/full-screen-loader/full-screen-loader.service";

@Component({
  selector: "app-generator",
  templateUrl: "./generator.component.html",
  styleUrls: ["./generator.component.scss"],
})
export class GeneratorComponent implements OnInit {
  generatorLoading = false;
  receivedData: any = [];
  selectedRecipe: any;
  form: FormGroup = new FormGroup({});
  formCreated = false;
  project: any = {
    id: uuid.v4(),
    name: "Project"
  }

  constructor(public generatorService: GeneratorService, private apiService: ApiService,
              private activatedRoute: ActivatedRoute, public recipeService: RecipeService,
              private fullScreenLoader: FullScreenLoaderService, private router: Router) {
    this.fullScreenLoader.emitLoader();

    this.activatedRoute.params.subscribe((params: any) => {
      if (params.id) {
        this.getSelectedRecipe(params.id);
      }
    })

    this.reserveUuid();
  }

  ngOnInit(): void {}

  reserveUuid() {
    console.log(this.project);
    this.apiService.post("object", ["reserve"], {uuid: this.project.id}).subscribe({
      next: () => {
        this.fullScreenLoader.deEmitLoader();{}
      },
      error: () => {
        this.router.navigate(['dashboard']);
      }
    });
  }

  buildFormGroup() {
    _.forEach(this.selectedRecipe.fields, (field) => {
      this.form.addControl(field.target, new FormControl(field.default ? field.default : '', []));
    })

    this.formCreated = true;
  }

  getSelectedRecipe(id: any) {
    this.apiService.get("recipe", ["recipe"]).subscribe({
      next: (res) => {
        this.selectedRecipe = _.find(res.data, {id: Number(id)});
        this.buildFormGroup();
      }
    })
  }

  generateText() {
    const promptDataObject: any = {};
    _.forEach(this.form.controls, (v, k) => {
      promptDataObject[k] = this.form.controls[k].value;
    })

    this.generatorLoading = true;
    this.apiService.post("recipe", ["use"], {
      id: this.selectedRecipe.id,
      data: promptDataObject,
      lang: "sv",
    }).subscribe({
      next: (value) => {
        this.receivedData.push(value.data);
        this.generatorLoading = false;
      },
      error: () => {
        this.generatorLoading = false;
      }
    })
  }
}
