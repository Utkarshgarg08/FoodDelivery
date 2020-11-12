import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private http: HttpClient) {}

  getStaticJsonPromise(url: any, options?: any): Promise<any> {
    let request = this.http
      .get(url)
      .toPromise()
      .then((response) => {
        if (response) return response;
      })
      .catch((error: any) => {
        console.log('error in calling',url,error);
        if (error) return error;
      });
    return request;
  }
}
