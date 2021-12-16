import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { environment } from "src/environments/environment.prod";

import { IBlog } from "./../../../models/blog.interface";
import { Component, OnInit } from "@angular/core";
import { GlobalService } from "src/app/global.service";
import { BlogService } from "src/app/services/blog.service";
import { DomSanitizer } from "@angular/platform-browser";
import { CommentService } from "src/app/services/comment.service";
import { UserService } from "src/app/services/user.service";
import { SnackBarService } from "src/app/services/snackbar.service";

@Component({
  selector: "app-blogs",
  templateUrl: "./blogs.component.html",
  styleUrls: ["./blogs.component.scss"],
})
export class BlogsComponent implements OnInit {
  blogs: IBlog[] | undefined | null;

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
    const blogs = await this.getAllBlogs();

    this.createCommentForm = new FormBuilder().group({
      comment: ["", Validators.compose([Validators.required])],
    });
  }

  async getAllBlogs(): Promise<IBlog[]> {
    this.blogs = await this._blogService.getAllBlogs();
    return this.blogs;
  }

  comments() {
    this.commentButtonClicked = true;
  }

  async onSubmit(form: NgForm) {
    const data = {
      comment: form.value.comment,
      commentedBy: this._userService.currentUser,
    };
    try {
      this._globalService.setLoading(true);
      const response = await this._commentService.createComment(data);
      this._snackbarService.open("Commented");
      this._globalService.setLoading(false);
    } catch (error) {
      this._snackbarService.showError(error.error.message);
      this._globalService.setLoading(false);
    }
  }
}
