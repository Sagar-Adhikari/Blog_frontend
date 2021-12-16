import { GlobalService } from 'src/app/global.service';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SnackBarService } from '../../../services/snackbar.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: "app-register-user",
  templateUrl: "./register-user.component.html",
  styleUrls: ["./register-user.component.scss"],
})
export class RegisterUserComponent implements OnInit {
  @ViewChild("firstName", { static: true }) firstName: ElementRef;
  hidePassword = true;
  registerForm: FormGroup;

  constructor(
    private _globalService: GlobalService,
    private _userService: UserService,
    private _snackbarService: SnackBarService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.registerForm = new FormBuilder().group({
      firstName: [
        "",
        Validators.compose([Validators.required, Validators.maxLength(100)]),
      ],
      lastName: [
        "",
        Validators.compose([Validators.required, Validators.maxLength(100)]),
      ],
      email: ["", Validators.compose([Validators.required, Validators.email])],
      mobileNo: [
        "",
        Validators.compose([Validators.required, Validators.maxLength(20)]),
      ],
      password: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15),
        ]),
      ],
    });
    this._globalService.setLayout({
      allowFooter: true,
      pageTitle: "Register Page",
    });
    this.firstName.nativeElement.focus();
  }

  async onSubmit(form: NgForm) {
    const user = form.value;
    const registerUser = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
    };
    try {
      this._globalService.setLoading(true);
      const res = await this._userService.register(registerUser);

      this._snackbarService.open("User Added Successfully");
      this._router.navigate(["/"]);
      this._globalService.setLoading(false);
    } catch (error) {
      this._globalService.setLoading(false);
      this._snackbarService.showError(`${error.error.message}`);
    }
  }
}
