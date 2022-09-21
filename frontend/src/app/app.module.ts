import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy, CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { IconModule, IconSetModule, IconSetService } from '@coreui/icons-angular';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';

//Global Components And Modals
import { DeleteItemModalComponent } from './components/delete-item-modal/delete-item-modal.component';
import { ConfirmationMessageModalComponent } from './components/confirmation-message-modal/confirmation-message-modal.component';

import { ApiModule, Configuration } from './generated/index';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ACCESS_TOKEN_KEY } from './services/authentication.service';
import { TokenInterceptor } from './utils/token.interceptor';
import { MainBreadcrumbComponent } from './containers/breadcrumb/main-breadcrumb.component';
import { ErrorInterceptor } from './utils/error.interceptor';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

export const getToken = () => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  return token? token: '';
}

export const getConfiguration = () => {
  return new Configuration({
    basePath: environment.basePath,
    accessToken: getToken
  })
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    IconModule,
    IconSetModule.forRoot(),
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    HttpClientModule,
	  ApiModule.forRoot(getConfiguration)
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    MainBreadcrumbComponent,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
    DeleteItemModalComponent,
    ConfirmationMessageModalComponent,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    {
      provide : HTTP_INTERCEPTORS,
      useClass : TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    IconSetService,
    BsModalService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
