import { IComment } from "./../models/comment.interface";
import { Injectable } from "@angular/core";

import { CreateCommentDTO } from "../models/comment.interface";
import { RestApiService } from "./rest-api.service";

@Injectable({
  providedIn: "root",
})
export class CommentService {
  constructor(private _restApiService: RestApiService) {}

  async createComment(createCommentDTO: CreateCommentDTO): Promise<IComment> {
    const res = await this._restApiService.post(
      "/comment/create-comment",
      createCommentDTO
    );
    return res;
  }

  async getAllComments(): Promise<IComment[]> {
    const allComments: IComment[] = await this._restApiService.get(
      "/comment/comments"
    );
    console.log(
      "🚀 ~ file: comment.service.ts ~ line 25 ~ CommentService ~ getAllComments ~ allComments",
      allComments
    );
    return allComments;
  }
}
