import { IUser } from "./user.interface";

export interface IComment {
  _id: string;
  comment: string;
}

export class CreateCommentDTO implements Partial<IComment> {
  comment: string;
  commentedBy: Partial<IUser>;
}
