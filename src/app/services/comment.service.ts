import { CreateCommentDTO } from "./../models/comment.interface";
import { IBlog as IComment } from "../models/blog.interface";
import { Injectable } from "@angular/core";
import { RestApiService } from "./rest-api.service";

@Injectable({
  providedIn: "root",
})
export class CommentService {
  constructor(private _restApiService: RestApiService) {}

  async createComment(createCommentDTO: CreateCommentDTO): Promise<IComment> {
    console.log(
      "🚀 ~ file: comment.service.ts ~ line 19 ~ CommentService ~ createComment ~ createCommentDTO",
      createCommentDTO
    );
    const res = await this._restApiService.post(
      "/comment/create-comment",
      createCommentDTO
    );
    console.log(
      "🚀 ~ file: comment.service.ts ~ line 30 ~ CommentService ~ createComment ~ res",
      res
    );
    return res;
  }

  async getAllBlogs(): Promise<IComment[]> {
    const allComments: IComment[] = await this._restApiService.get(
      "/comment/comment"
    );
    return allComments;
  }
}
