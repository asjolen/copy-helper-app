import { Component, OnInit } from '@angular/core';
import * as _ from "lodash";
import {ApiService} from "../../../core/services/api/api.service";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  recipes: any = [];
  recipesLoading = false;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getRecipes();
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
}
