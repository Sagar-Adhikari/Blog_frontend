import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BlogsComponent } from './blogs/blogs.component';
import { CreateBlogComponent } from './create-blog/create-blog.component';

const routes: Routes = [
  {
    path: "",
    component: BlogsComponent,
  },
  {
    path: "create",
    component: CreateBlogComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}
