import {Component, EventEmitter, OnInit, Output, Input, OnChanges, SimpleChanges} from "@angular/core";
import {ApiService} from "../../../core/services/api/api.service";
import {isArray, isNumber} from "lodash";
import {CacheService} from "../../../core/services/api/cache.service";
import * as _ from "lodash";

@Component({
  selector: 'app-keyword-selector',
  templateUrl: './keyword-selector.component.html',
  styleUrls: ['./keyword-selector.component.scss']
})
export class KeywordSelectorComponent implements OnInit {
  @Output() selectedKeywords: EventEmitter<any> = new EventEmitter<any>();
  @Input() preselectedKeywords: any = [];
  userSelect: any = [];
  selectedData: any = [];
  availableKeywords: any = [];
  keywordsLoading = false;

  constructor(private apiService: ApiService, private cacheService: CacheService) { }

  ngOnInit(): void {
    this.getWorkspaceKeywords();
  }

  preselectKeywords(keywords: any) {
    _.forEach(keywords, (keyword) => {
      this.selectedData.push(keyword);
    })

    this.modelChange(this.selectedData);
  }

  modelChange(event: any) {
    this.userSelect = [];
    _.forEach(event, (e) => {
      if (e.hasOwnProperty("value")) {
        this.userSelect.push(e.value);
      } else {
        this.userSelect.push(e);
      }
    })

    const emitData: any = [];
    _.forEach(this.userSelect, (keyword) => {
      if (isNumber(keyword)) {
        const find = _.find(this.availableKeywords, {value: keyword});
        emitData.push(find);
      } else {
        emitData.push({
          label: keyword,
          value: null,
        })
      }
    })

    this.selectedKeywords.emit(emitData);
  }

  getWorkspaceKeywords() {
    this.keywordsLoading = true;
    this.cacheService.deleteCacheByUrl("workspace/keywords");
    this.apiService.get("workspace", ["keywords"]).subscribe({
      next: (res) => {
        this.keywordsLoading = false;
        _.forEach(res.data, (keyword) => {
          this.availableKeywords.push({
            label: keyword.value,
            value: keyword.id
          })
        })

        this.preselectKeywords(this.preselectedKeywords);
      }
    })
  }
}
