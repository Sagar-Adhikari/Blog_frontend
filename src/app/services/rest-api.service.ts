import { environment } from 'src/environments/environment.prod';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: "root",
})
export class RestApiService {
  constructor(private httpClient: HttpClient) {}

  options = {
    headers: this._getHeaders(),
  };

  private _getHeaders(): HttpHeaders | undefined {
    const jwtToken: string | null = localStorage.getItem("accessToken");
    if (jwtToken) {
      return new HttpHeaders().set("Authorization", `Bearer ${jwtToken}`);
    }
    return undefined;
  }

  refreshHeader() {
    const header = this._getHeaders();
    if (header) {
      this.options.headers = header;
    } else {
      throw new Error("Could not find the token");
    }
  }

  get(url: string): Promise<any> {
    return this.httpClient
      .get(environment.serverURL + url, this.options)
      .toPromise();
  }

  post(url: string, body?: any): Promise<any> {
    return this.httpClient
      .post(environment.serverURL + url, body, this.options)
      .toPromise();
  }

  patch(url: string, body?: any): Promise<any> {
    return this.httpClient
      .patch(environment.serverURL + url, body, this.options)
      .toPromise();
  }

  put(url: string, body?: any): Promise<any> {
    return this.httpClient
      .put(environment.serverURL + url, body, this.options)
      .toPromise();
  }

  delete(url: string): Promise<any> {
    return this.httpClient
      .delete(environment.serverURL + url, this.options)
      .toPromise();
  }
}
