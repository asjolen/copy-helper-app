import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneratorService {
  generatorTypes = [
    {name: "article title", string: "type.title"},
    {name: "summary", string: "type.product_summary"}
  ];

  generatorAttitudes = [
    {name: "friendly", string: "string.friendly"},
    {name: "business", string: "string.business"},
    {name: "sarcastic", string: "string.sarcastic"}
  ]

  constructor() { }
}
