import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreviousUrlService {
  previousUrl: string|any = false;

  constructor() { }
}
