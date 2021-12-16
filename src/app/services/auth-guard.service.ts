import { IUser } from "../models/user.interface";
import { UserService } from "./user.service";
import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthGuardService implements CanActivate {
  constructor(private _userService: UserService) {}

  async canActivate(): Promise<boolean> {
    try {
      const authUser: IUser = await this._userService.getUserFromAccessToken();
      const isAuthenticated = !!authUser;
      if (isAuthenticated) {
        this._userService.setCurrentUser(authUser);
        return true;
      }
    } catch (error) {}
    this._userService.logout();
    return false;
  }
}
