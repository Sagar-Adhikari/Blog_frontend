import { IBlog } from "./../../../models/blog.interface";
import { IComment } from "./../../../models/comment.interface";
import { GlobalService } from "src/app/global.service";
import { BlogService } from "src/app/services/blog.service";
import { CommentService } from "src/app/services/comment.service";
import { SnackBarService } from "src/app/services/snackbar.service";
import { UserService } from "src/app/services/user.service";
import { environment } from "src/environments/environment.prod";

import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-blogs",
  templateUrl: "./blogs.component.html",
  styleUrls: ["./blogs.component.scss"],
})
export class BlogsComponent implements OnInit {
  blogs: IBlog[] | undefined | null;

  comments: IComment[] | undefined;

  private iconPath = environment.icon_image_path + "fakepath/";
  imgUrl: any = this.iconPath + "default.jpg";

  commentButtonClicked = false;

  createCommentForm: FormGroup;

  constructor(
    private _globalService: GlobalService,
    private _blogService: BlogService,
    public sanitizer: DomSanitizer,
    private _commentService: CommentService,
    private _userService: UserService,
    private _snackbarService: SnackBarService
  ) {}

  async ngOnInit() {
    this._globalService.setLayout({
      allowFooter: true,
      pageTitle: "Blogs",
    });

    this.createCommentForm = new FormBuilder().group({
      comment: ["", Validators.compose([Validators.required])],
    });

    this.getAllBlogs();
  }

  async getAllBlogs(): Promise<IBlog[]> {
    this.blogs = await this._blogService.getAllBlogs();
    return this.blogs;
  }

  async getAllComments(): Promise<IComment[]> {
    this.comments = await this._commentService.getAllComments();
    return this.comments;
  }

  comment() {
    this.getAllComments();
    this.commentButtonClicked = true;
  }

  async onSubmit(form: NgForm) {
    const data = {
      comment: form.value.comment,
      commentedBy: this._userService.currentUser,
    };
    try {
      this._globalService.setLoading(true);
      await this._commentService.createComment(data);
      await this._commentService.getAllComments;
      this._snackbarService.open("Commented");
      this._globalService.setLoading(false);
    } catch (error) {
      this._snackbarService.showError(error.error.message);
      this._globalService.setLoading(false);
    }
  }
}
