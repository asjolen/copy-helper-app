import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NumberService {

  constructor() {}

  isNumericValue(value: any) {
    return /^-?\d+$/.test(value);
  }
}
