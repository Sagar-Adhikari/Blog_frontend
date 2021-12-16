import { BehaviorSubject, Subject } from "rxjs";
import { Injectable } from "@angular/core";

interface ILayout {
  pageTitle: string;
  allowFooter: boolean;
}
@Injectable({
  providedIn: "root",
})
export class GlobalService {
  private pageTitleSource = new Subject<ILayout>();
  private _loading = false;
  private loadingSource = new BehaviorSubject<boolean>(false);
  pageTitle$ = this.pageTitleSource.asObservable();
  loading$ = this.loadingSource.asObservable();

  constructor() {}

  getShortDateWithTime(x: Date) {
    const d = new Date(x).toLocaleDateString();
    const t = new Date(x).toLocaleTimeString();
    return `${d} ${t}`;
  }

  setLayout(layout: ILayout) {
    setTimeout(() => {
      this.pageTitleSource.next(layout);
    });
  }

  setLoading(loading: boolean) {
    if (this._loading === loading) {
      return;
    }
    //  console.log(this._loading);
    this._loading = loading;
    setTimeout(() => {
      this.loadingSource.next(loading);
    }, 0);
  }
}
