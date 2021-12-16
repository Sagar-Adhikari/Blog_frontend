import { Component } from "@angular/core";

import { GlobalService } from "./global.service";
import { UserService } from "./services/user.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "blogDetail";

  isOpenSideNavBar = false;

  loading = false;

  pageTitle = "Initial Title";
  allowFooter = true;
  smallScreen = false;

  constructor(
    private _globalService: GlobalService,
    public userService: UserService
  ) {
    this._globalService.pageTitle$.subscribe((component) => {
      this.pageTitle = component.pageTitle;
      this.allowFooter = component.allowFooter;
    });

    this._globalService.loading$.subscribe((x) => {
      this.loading = x;
    });
  }

  onNavbarClicked() {
    this.isOpenSideNavBar = !this.isOpenSideNavBar;
  }
}
