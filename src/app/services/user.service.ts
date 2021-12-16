import { BehaviorSubject, Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { IUser, LoginDTO, RegisterDTO } from '../models/user.interface';
import { RestApiService } from './rest-api.service';

@Injectable({
  providedIn: "root",
})
export class UserService {
  private _currentUser$: BehaviorSubject<IUser | null> =
    new BehaviorSubject<IUser | null>(null);

  get currentUser$(): Observable<IUser | null> {
    return this._currentUser$.asObservable();
  }

  get currentUser(): IUser | null {
    return this._currentUser$.value;
  }

  constructor(
    private router: Router,
    private _restApiService: RestApiService
  ) {}

  async loginWithEmail(value: LoginDTO): Promise<any> {
    const response: any = await this._restApiService.post("/user/login", value);
    return this.login(response.user as IUser, response.accessToken);
  }

  async login(
    authUser: IUser,
    accessToken: string,
    redirectRoute: string = ""
  ) {
    this.setCurrentUser(authUser);
    this.storeAccessToken(accessToken);
    if (redirectRoute === "") {
      await this.router.navigateByUrl("/auth/user");
    } else {
      await this.router.navigateByUrl(redirectRoute);
    }
  }

  async logout() {
    this._currentUser$.next(null);
    this.clearAuthStorage();
    this.router.navigateByUrl("/");
  }

  setCurrentUser(user: IUser) {
    const currentUser = this._currentUser$.value;
    this._currentUser$.next({
      ...currentUser,
      ...user,
    });
  }

  updateCurrentUser(partialUser: Partial<IUser>) {
    const currentUser = this._currentUser$.value;
    if (
      currentUser &&
      currentUser._id &&
      currentUser.firstName &&
      currentUser.lastName &&
      currentUser.email
    ) {
      this._currentUser$.next({
        ...currentUser,
        ...partialUser,
      });
    }
  }

  async register(user: RegisterDTO): Promise<any> {
    return await this._restApiService.post("/user/register", user);
  }

  async getAllUsers(): Promise<IUser[]> {
    return await this._restApiService.get("/user/all-users");
  }

  async storeAccessToken(accessToken: string) {
    localStorage.setItem("accessToken", accessToken);
    this._restApiService.refreshHeader();
  }

  getStoredAccessToken() {
    return localStorage.getItem("accessToken");
  }

  clearAuthStorage() {
    localStorage.removeItem("accessToken");
  }

  async getUserFromAccessToken(): Promise<IUser> {
    try {
      this._restApiService.refreshHeader();
      const res = await this._restApiService.get("/user/get-current-user");
      return res;
    } catch {
      throw new Error("Could not authenticate");
    }
  }
}
