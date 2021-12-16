import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UsersComponent } from "src/app/modules/auth/users/users.component";

import { LoginComponent } from "./login/login.component";
import { RegisterUserComponent } from "./register-user/register-user.component";

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "register", component: RegisterUserComponent },
  { path: "user", component: UsersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
