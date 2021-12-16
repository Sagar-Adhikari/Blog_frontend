import { GlobalService } from "src/app/global.service";

import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { SnackBarService } from "../../../services/snackbar.service";
import { UserService } from "../../../services/user.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  @ViewChild("email", { static: true }) email: ElementRef;
  hidePassword = true;
  loginForm: FormGroup;

  constructor(
    private _globalService: GlobalService,
    private _userService: UserService,
    private _snackbarService: SnackBarService
  ) {}

  ngOnInit() {
    this.loginForm = new FormBuilder().group({
      email: ["", Validators.compose([Validators.required, Validators.email])],
      password: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15),
        ]),
      ],
    });
    this._globalService.setLayout({ allowFooter: true, pageTitle: "Login" });
    this.email.nativeElement.focus();
  }

  async onSubmit(form: NgForm) {
    try {
      this._globalService.setLoading(true);
      const res = await this._userService.loginWithEmail({
        email: form.value.email,
        password: form.value.password,
      });
      this._snackbarService.open("User logged in successfully");
      this._globalService.setLoading(false);
    } catch (error) {
      this._globalService.setLoading(false);
      this._snackbarService.showError(`${error.error.message}`);
    }
  }
}
