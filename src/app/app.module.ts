import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AgmCoreModule } from '@agm/core';
import { OverlayContainer, Overlay } from '@angular/cdk/overlay';
import { MAT_MENU_SCROLL_STRATEGY } from '@angular/material/menu';
import { CustomOverlayContainer } from './theme/utils/custom-overlay-container';
import { menuScrollStrategy } from './theme/utils/scroll-strategy';

import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { TopMenuComponent } from './theme/components/top-menu/top-menu.component';
import { MenuComponent } from './theme/components/menu/menu.component';
import { SidenavMenuComponent } from './theme/components/sidenav-menu/sidenav-menu.component';
import { BreadcrumbComponent } from './theme/components/breadcrumb/breadcrumb.component';

import { AppSettings } from './app.settings';
import { AppService } from './app.service';
import { AuthService } from './_services/auth.service';
import { AuthGuardClientService } from './_services/auth-guard-client.service';
import { AuthGuardAdminService } from './_services/auth-guard-admin.service';
import { AuthGuardPartenaireService } from './_services/auth-guard-partenaire.service';

import { AuthInterceptor } from './_helpers/auth.interceptor';
import { TokenStorageService } from './_services/token-storage.service';
import { AppInterceptor } from './theme/utils/app-interceptor';
import { OptionsComponent } from './theme/components/options/options.component';
import { FooterComponent } from './theme/components/footer/footer.component';


@NgModule({
   imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxSpinnerModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA1rF9bttCxRmsNdZYjW7FzIoyrul5jb-s'
    }),
    SharedModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    PagesComponent,
    NotFoundComponent,
    TopMenuComponent,
    MenuComponent,
    SidenavMenuComponent,
    BreadcrumbComponent,
    OptionsComponent,
    FooterComponent    
  ], 
  providers: [
    AppSettings,
    AppService,
    AuthService,
    TokenStorageService,
    AuthGuardClientService,
    AuthGuardAdminService,
    AuthGuardPartenaireService,
    AuthInterceptor,
    { provide: OverlayContainer, useClass: CustomOverlayContainer },
    { provide: MAT_MENU_SCROLL_STRATEGY, useFactory: menuScrollStrategy, deps: [Overlay] },
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }