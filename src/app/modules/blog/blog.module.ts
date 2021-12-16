import { ngxLoadingAnimationTypes } from "ngx-loading";
import { NgxLoadingModule } from "ngx-loading";
import { MaterialModules } from "../../shared/material.models";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { BlogRoutingModule } from "./blog-routing.module";
import { CreateBlogComponent } from "./create-blog/create-blog.component";
import { BlogsComponent } from "./blogs/blogs.component";

@NgModule({
  declarations: [CreateBlogComponent, BlogsComponent],
  imports: [
    CommonModule,
    BlogRoutingModule,
    HttpClientModule,
    MaterialModules,

    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.threeBounce,
      backdropBackgroundColour: "transparent",
      backdropBorderRadius: "0px",
      primaryColour: "Navy",
      secondaryColour: "Navy",
      tertiaryColour: "Navy",
      fullScreenBackdrop: false,
    }),
  ],
})
export class BlogModule {}
