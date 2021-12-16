export interface IBlog {
  _id: string;
  blogName: string;
  description: string;
  photoUrl?: string;
  createdAt?: string;
}
export class CreateBlogDetailsDTO implements Partial<IBlog> {
  blogName: string;
  description: string;
}
