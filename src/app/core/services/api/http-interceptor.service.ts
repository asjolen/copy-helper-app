import { Injectable } from "@angular/core";
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpClient, HttpResponse} from "@angular/common/http";
import {ApiService} from "./api.service";
import {delay, finalize, Observable, of, retryWhen, switchMap, tap} from "rxjs";
import {CacheService} from "./cache.service";
import {AuthService} from "@auth0/auth0-angular";
import {SetupService} from "../interface/setup/setup.service";
import {AlertMessageService} from "../interface/alert-message/alert-message.service";
import {AppService} from "../app/app.service";
import * as _ from "lodash";
import {FullScreenLoaderService} from "../interface/full-screen-loader/full-screen-loader.service";

@Injectable({
  providedIn: "root"
})
export class HttpInterceptorService implements HttpInterceptor {
  tokenHeaderKey = "Authorization";
  tokenOrganizationKey = "x-Organization-key";
  tokenTeamKey = "x-Team-key";
  skipCache = ["/assets/i18n/"];
  hideErrorOn: any = []
  pendingRequests: any = [];
  authorizationToken = {
    token: null,
    timestamp: null
  }

  constructor(private http: HttpClient, private apiService: ApiService,
              private cacheService: CacheService, private authService: AuthService,
              private setupService: SetupService, private appService: AppService,
              private alertMessage: AlertMessageService, private fullScreenLoaderService: FullScreenLoaderService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): any {
    const organization = this.appService.getStorage(this.appService.storageKeys.organization);
    const team = this.appService.getStorage(this.appService.storageKeys.team);


    if (req.method === "GET" && !this.cacheService.cacheExpired(req) && this.useCache(req) && this.cacheService.getCache(req)) {
      console.log("%c >> Using cache ",
        "background: green; color: white", req.urlWithParams, this.cacheService.getCache(req));
      return of(this.cacheService.getCache(req));
    }

    if (organization && organization.id) {req = this.addOrganizationToken(req, organization.id)}
    if (team && team.id) {req = this.addTeamToken(req, team.id)}

    return this.authService.getAccessTokenSilently().pipe(switchMap((token) => {
      if (token) {
        req = this.addTokenHeader(req, token);
      }

      this.pendingRequests.push(req);
      return this.next(req, next, this.cacheService);
    }));
  }

  next(req: HttpRequest<any>, next: HttpHandler, cache: CacheService): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.cacheService.setCache(req, event);
          console.log("%c >> " + event.statusText + " (" + event.status + ")",
            "background: green; color: white", event.url);
        }
      }),
      retryWhen(errors =>
        errors.pipe(
          delay(500),
          tap(error => {
            if (error.error.detail) {this.alertMessage.displayStrMessage(error.error.detail, "error")}

            throw error;
          })
        )
      ), finalize(() => {
        _.remove(this.pendingRequests, {url: req.url})
        if (!this.pendingRequests.length) {
          // Remove all fullScreenEmitterLoaders
          this.fullScreenLoaderService.clearEmitters();
        }
      })
    );
  }

  shouldHideError(errorMessage: any) {
    let shouldHide = false;

    _.forEach(this.hideErrorOn, (err) => {
      if (errorMessage.includes(err)) {shouldHide = true}
    })

    return shouldHide;
  }

  private addTokenHeader(request: HttpRequest<any>, token: any) {
    return request.clone({ headers: request.headers.append(this.tokenHeaderKey, "Bearer " + token) });
  }

  private addOrganizationToken(request: HttpRequest<any>, organization: string) {
    return request.clone({ headers: request.headers.append(this.tokenOrganizationKey, String(organization)) });
  }

  private addTeamToken(request: HttpRequest<any>, team: string) {
    return request.clone({ headers: request.headers.append(this.tokenTeamKey, String(team)) });
  }

  useCache(req: HttpRequest<any>) {
    let shouldUseCache = true;

    // @ts-ignore
    _.forEach(this.skipCache, (skip) => {
      if (req.urlWithParams.includes(skip)) {
        shouldUseCache = false;
      }
    })

    return shouldUseCache;
  }
}
