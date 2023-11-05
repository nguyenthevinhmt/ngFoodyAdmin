import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONSTANT } from './Common';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) { }

  public logIn(data: any) {
    return this.http.post(`${CONSTANT.apiUrl}/Auth/login`, data);
  }
}
