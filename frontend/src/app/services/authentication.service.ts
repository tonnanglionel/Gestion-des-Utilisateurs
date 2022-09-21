import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { LoginData } from '../additional-models/LoginData';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { NavigationService } from './navigation.service';
import { UserWrapper } from '../additional-models/users-wrapper';
import { Users } from '../generated/model/users';
//import { ROLES } from '../utils/constants';

export const USER_KEY: string = 'USER_KEY';
export const ACCESS_TOKEN_KEY: string = 'ACCESS_TOKEN_KEY';
export const TOKEN_EXPIRED_AT_KEY: string = 'TOKEN_EXPIRED_AT_KEY';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements OnInit {

  constructor(
    private http: HttpClient,
    public navigationService: NavigationService) { }

  ngOnInit() { }

  login(loginData: LoginData): Observable<UserWrapper> {
    return this.http.post<UserWrapper>(`${environment.basePath}/login`, loginData);
  }

  register(user: Users): Observable<any> {
    return this.http.post(`${environment.basePath}/users/createOrUpdateUser`, user);
  }

  public storeUser(user: Users): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): Users {
    return JSON.parse(localStorage.getItem(USER_KEY));
  }

  public deleteUser(): void {
    localStorage.removeItem(USER_KEY);
  }

  public storeAccessToken(token: string): void {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  }

  public getAccessToken(): string {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  public storeTokenExpiresAt(tokenExpiresAt: string): void {
    localStorage.setItem(TOKEN_EXPIRED_AT_KEY, tokenExpiresAt);
  }

  public getTokenExpiresAt(): string {
    return localStorage.getItem(TOKEN_EXPIRED_AT_KEY);
  }

  public deleteAccessToken(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }

  public localLogin(user: Users, token: string, expiresAt: string): void {
    this.storeUser(user);
    this.storeAccessToken(token);
    this.storeTokenExpiresAt(expiresAt);
  }

  public logout(): void {
    this.deleteUser();
    this.deleteAccessToken();
    this.navigationService.goTo('/login');
  }

  public isLoggedIn(): boolean {
    const user: Users = this.getUser();
    const token: string = this.getAccessToken();
    const tokenExpiresAt: string = this.getTokenExpiresAt();
    const now = (new Date()).getTime();
    if (user && token && tokenExpiresAt) {
      const expires_at = (new Date(tokenExpiresAt)).getTime();
      return (now < expires_at);
    } else {
      return false;
    }
  }

  /*public hasAnyRole(roles: string[]): boolean {
    if (this.isLoggedIn()) {
      const userRoles: string[] = this.getUser().roleList;
      for (let index = 0; index < userRoles.length; index++) {
        if (roles.includes(userRoles[index].trim())) {
          return true;
        }
      }
    } else {
      return false;
    }
  }*/

  /*public hasAnyPermission(permissions: string[]): boolean {
    if (this.isLoggedIn()) {
      if (this.getUser().roleList.includes(ROLES.SUPER_ADMIN_ROLE)) {
        return true;
      }
      const userPermissions: string[] = this.getUser().permissionList;
      for (let index = 0; index < userPermissions.length; index++) {
        if (permissions.includes(userPermissions[index].trim())) {
          return true;
        }
      }
    } else {
      return false;
    }
  }*/

}
