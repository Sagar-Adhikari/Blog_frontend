import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CreateBlogDetailsDTO, IBlog } from '../models/blog.interface';
import { RestApiService } from './rest-api.service';

@Injectable({
  providedIn: "root",
})
export class BlogService {
  constructor(
    private _restApiService: RestApiService,
    private http: HttpClient
  ) {}

  async createBlog(createBlogDetails: CreateBlogDetailsDTO): Promise<IBlog> {
    const res = await this._restApiService.post(
      "/blog/create-blog",
      createBlogDetails
    );
    return res;
  }

  async uploadBlogImage(id: string, image: File): Promise<IBlog> {
    const formData = new FormData();
    formData.append("_id", id);
    formData.append("blogImageFile", image);
    return this._restApiService.patch("/blog/blog-image-upload", formData);
  }

  async getAllBlogs(): Promise<IBlog[]> {
    const allBlogs: IBlog[] = await this._restApiService.get(
      "/blog/all-blog-posts"
    );
    return allBlogs;
  }

  async getImage(image: any): Promise<any> {
    return await this._restApiService.get(`/blog/blog-image/${image}`);
  }

  async getPath(image: any): Promise<any> {
    return await this._restApiService.get(`/blog/${image}`);
  }

  public download(fileName: string): void {
    const img = this.http
      .get(`/uploads/${fileName}`, { responseType: "blob" })
      .subscribe((res) => {
        window.open(window.URL.createObjectURL(res));
      });
    console.log(
      "🚀 ~ file: blog.service.ts ~ line 45 ~ BlogService ~ download ~ img",
      img
    );
  }
}
