import {Component, OnInit, Input} from "@angular/core";
import {ApiService} from "../../../core/services/api/api.service";
import {Router} from "@angular/router";

@Component({
  selector: "app-recipe-card",
  templateUrl: "./recipe-card.component.html",
  styleUrls: ["./recipe-card.component.scss"]
})
export class RecipeCardComponent implements OnInit {
  @Input() recipe: any;

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {}

  favorite() {
    this.recipe.favorite = !this.recipe.favorite;
    this.apiService.post("recipe", ["favorite"], {
      recipe: this.recipe.id
    }).subscribe(() => {})
  }

  goToRecipe() {
    this.router.navigate(['recipe', this.recipe.id]);
  }
}
