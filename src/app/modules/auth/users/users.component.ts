import { IUser } from "../../../models/user.interface";
import { SnackBarService } from "src/app/services/snackbar.service";

import { Component, OnInit } from "@angular/core";

import { GlobalService } from "../../../global.service";
import { UserService } from "../../../services/user.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit {
  data: IUser[] = [];
  displayedColumns: string[] = ["firstName", "lastName", "email"];

  isMobile: any;

  constructor(
    private _userService: UserService,
    private _globalService: GlobalService,
    private _snackbarService: SnackBarService
  ) {
    this._globalService.setLayout({
      allowFooter: false,
      pageTitle: "Users",
    });
  }

  ngOnInit() {
    this.getAllUser();
  }

  async getAllUser() {
    try {
      this._globalService.setLoading(true);
      this.data = await this._userService.getAllUsers();
      this._globalService.setLoading(false);
    } catch (error) {
      this._globalService.setLoading(false);
      this._snackbarService.showError(error.error.message);
    }
  }
}
