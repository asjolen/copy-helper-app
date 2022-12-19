import {CacheService} from "./cache.service";
import {Injectable} from "@angular/core";
import {catchError, map} from "rxjs/operators";
import {throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  apiPath = environment.api;

  constructor(private http: HttpClient, private cacheService: CacheService) {}

  public buildUrl(app: any, urlArray: any, includeBasePath = true) {
    let url = includeBasePath ? this.apiPath + "/" : "";
    url = url + app;

    for (const single of urlArray) {
      url = url + "/" + single;
    }

    return url + "/";
  }

  /**
   * GET request.
   *
   * @param app: String
   * @param urlArray: UrlArray
   * @param params: Parameters as object
   * @param includeBasePath
   */
  get(app: string, urlArray: any = [], params = {}, includeBasePath = true) {
    return this.http.get(this.buildUrl(app, urlArray, includeBasePath), {params}).pipe(map(
      (response: any) => {
        return response;
      }), catchError((err => {
        return throwError(err);
    })));
  }

  /**
   * POST request.
   *
   * @param app: String
   * @param urlArray: Path
   * @param data: Data as object
   */
  put(app: string, urlArray: any = [], data = {}) {
    return this.http.put(this.buildUrl(app, urlArray), data).pipe(map(
      (response: any) => {
        this.cacheService.deleteRelatedCache(app);
        return response;
      }), catchError((err => {
        return throwError(err);
      })));
  }

  /**
   * POST request.
   *
   * @param app: String
   * @param urlArray: Path
   * @param data: Data as object
   * @param includeBasePath: Boolean
   */
  post(app: string, urlArray: any = [], data = {}, includeBasePath = true) {
    return this.http.post(this.buildUrl(app, urlArray, includeBasePath), data).pipe(map(
      (response: any) => {
        this.cacheService.deleteRelatedCache(app);
        return response;
      }), catchError((err => {
        return throwError(err);
      })));
  }

  /**
   * DELETE request.
   *
   * @param app: String
   * @param urlArray: Path
   * @param params: Data as object
   */
  delete(app: string, urlArray: any = [], params = {}) {
    return this.http.delete(this.buildUrl(app, urlArray), {params}).pipe(map(
      (response: any) => {
        this.cacheService.deleteRelatedCache(app);
        return response;
      }), catchError((err => {
        return throwError(err);
      })));
  }
}
