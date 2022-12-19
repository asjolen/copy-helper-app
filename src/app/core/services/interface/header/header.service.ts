import {EventEmitter, Injectable, OnChanges, Output, SimpleChanges} from "@angular/core";
import {NavigationEnd, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  title: any = false;
  @Output() headerTitleEmitter: EventEmitter<any> = new EventEmitter<any>();

  constructor(private router: Router) {}

  checkEvents() {
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.headerTitleEmitter.emit(evt.url.split('/')[1]);
      }
    })
  }
}
