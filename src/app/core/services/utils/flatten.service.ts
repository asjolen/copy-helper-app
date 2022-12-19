import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlattenService {

  constructor() {}

  flatten(data: any) {
    if (data) {
      // @ts-ignore
      return data.reduce((r: any, {children, ...rest}) => {
        r.push(rest);

        if (children) {
          r.push(...this.flatten(children));
        }

        return r;
      }, [])
    }

    return [];
  }

  find(id: any, array: any) {
    let result: any = [];
    array.some((o: any) => o.id === id && (result = o) || (result = this.find(id, o.children || [])));

    return result;
  }
}
