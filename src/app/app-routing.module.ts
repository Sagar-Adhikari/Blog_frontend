import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './modules/auth/login/login.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "", redirectTo: "login", pathMatch: "full" },

  {
    path: "auth",
    loadChildren: () =>
      import("../app/modules/auth/auth.module").then((m) => m.AuthModule),
    canActivate: [],
  },
  {
    path: "blog",
    loadChildren: () =>
      import("../app/modules/blog/blog.module").then((m) => m.BlogModule),
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
