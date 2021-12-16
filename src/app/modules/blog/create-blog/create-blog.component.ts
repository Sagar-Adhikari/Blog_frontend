import { Router } from "@angular/router";
import { environment } from "./../../../../environments/environment";
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { GlobalService } from "src/app/global.service";
import { BlogService } from "../../../services/blog.service";
import { SnackBarService } from "../../../services/snackbar.service";

@Component({
  selector: "app-create-blog",
  templateUrl: "./create-blog.component.html",
  styleUrls: ["./create-blog.component.scss"],
})
export class CreateBlogComponent implements OnInit {
  selectedFile: File | null | undefined;
  private iconPath = environment.icon_image_path + "fakepath/";
  imgUrl: any = this.iconPath + "default.jpg";

  blogImageFile: File | null = null;

  createBlogForm: FormGroup;

  loading = false;

  constructor(
    private _globalService: GlobalService,
    private _blogService: BlogService,
    private _snackbarService: SnackBarService,
    private _router: Router
  ) {}

  async ngOnInit() {
    this._globalService.setLayout({
      allowFooter: true,
      pageTitle: "Create Blog",
    });

    this.createBlogForm = new FormBuilder().group({
      blogName: [
        "",
        Validators.compose([
          Validators.maxLength(50),
          Validators.minLength(1),
          Validators.required,
        ]),
      ],
      description: ["", Validators.compose([Validators.required])],
    });
  }

  onFileSelected(event: any) {
    const targetHtml: any = event.target as unknown;
    this.blogImageFile = targetHtml.files[0];

    if (event.target.files && event.target.files[0]) {
      // tslint:disable-next-line:no-shadowed-variable
      const reader = new FileReader();

      reader.onload = (event: any) => {
        this.imgUrl = event.target.result;
      };
      this.selectedFile = event.target.files[0];
      reader.readAsDataURL(event.target.files[0]);
    } else {
      this.selectedFile = null;
      this.imgUrl = null;
    }
  }

  async onSubmit(form: NgForm) {
    try {
      if (form.status === "VALID") {
        this._globalService.setLoading(true);

        const response = await this._blogService.createBlog(form.value);

        if (this.blogImageFile) {
          const res = await this._blogService.uploadBlogImage(
            response._id,
            this.blogImageFile
          );
          console.log(
            "🚀 ~ file: create-blog.component.ts ~ line 84 ~ CreateBlogComponent ~ onSubmit ~ res",
            res
          );
          this.blogImageFile = null;
        }
        this._snackbarService.open("Your blog has been posted successfully!");
        this._router.navigateByUrl("blog");
        this._globalService.setLoading(false);
      }
    } catch (error) {
      this._globalService.setLoading(false);
      this._snackbarService.showError(error.error.message);
    }
  }
}
