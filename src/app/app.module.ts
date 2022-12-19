import {NgModule} from "@angular/core";
import {NZ_I18N} from "ng-zorro-antd/i18n";
import {en_US} from "ng-zorro-antd/i18n";
import {registerLocaleData } from "@angular/common";
import en from "@angular/common/locales/en";
import {HttpLoaderFactory} from "./core/translations/http-loader-factory";
import {environment} from "../environments/environment";
registerLocaleData(en);

// Components
import {AppComponent} from "./app.component";

// Modules
import {AppRoutingModule} from "./app-routing.module";
import {BrowserModule} from "@angular/platform-browser";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import * as Auth0Module from "@auth0/auth0-angular";
import {HttpInterceptorService} from "./core/services/api/http-interceptor.service";
import {AuthModule} from "./pages/auth/auth.module";
import {AngularFireModule} from "@angular/fire/compat";
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {getDatabase, provideDatabase} from "@angular/fire/database";
import {NzMessageModule} from "ng-zorro-antd/message";
import {LanguageSelectorModule} from "./components/other/language-selector/language-selector.module";
import {FullScreenLoaderModule} from "./components/other/full-screen-loader/full-screen-loader.module";
import {DashboardModule} from "./pages/dashboard/dashboard.module";
import {NavigationModule} from "./components/navigation/navigation.module";
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {RecipeModule} from "./pages/recipe/recipe.module";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase()),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    Auth0Module.AuthModule.forRoot({
      domain: environment.auth0.domain,
      clientId: environment.auth0.clientId,
      audience: environment.auth0.audience
    }),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzMessageModule,
    AuthModule,
    LanguageSelectorModule,
    FullScreenLoaderModule,
    DashboardModule,
    NavigationModule,
    NzLayoutModule,
    RecipeModule
  ],
  providers: [
    {provide: NZ_I18N, useValue: en_US},
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
