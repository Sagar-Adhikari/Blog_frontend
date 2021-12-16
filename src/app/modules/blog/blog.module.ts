import { ngxLoadingAnimationTypes, NgxLoadingModule } from 'ngx-loading';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { MaterialModules } from '../../shared/material.models';
import { BlogRoutingModule } from './blog-routing.module';
import { BlogsComponent } from './blogs/blogs.component';
import { CreateBlogComponent } from './create-blog/create-blog.component';

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
