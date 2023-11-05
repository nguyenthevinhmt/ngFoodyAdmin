import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CONSTANT } from '../Common';
import { LoginService } from './login.service';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl: string = `${CONSTANT.apiUrl}/Category`;
  private headers = new HttpHeaders();
  constructor(private http: HttpClient, private loginService: LoginService) {
    const accessToken = sessionStorage.getItem('accessToken');
    if (accessToken) {
      this.headers = this.headers.set('Authorization', `Bearer ${accessToken}`);
    }
  }

  public getAllCategory() {
    const params = {
      PageSize: 99,
      PageIndex: 1
    }
    return this.http.get(`${this.apiUrl}/get-category-paging`, { params });
  }

  public getCategoryById(id: string) {
    const headers = this.headers;
    return this.http.get(`${this.apiUrl}/get-catgory-by-id/${id}`, { headers });
  }

  public addCategory(data: any) {
    const headers = this.headers;
    console.log(headers.get('Authorization'));
    return this.http.post(`${this.apiUrl}/create-category`, data, { headers });
  }

  public editCategory(data: any) {
    const headers = this.headers;
    return this.http.put(`${this.apiUrl}/update-catgory`, data, { headers });
  }

  public deleteCategoryById(id: string) {
    const headers = this.headers;
    return this.http.delete(`${this.apiUrl}/delete-catgory/${id}`, { headers });
  }
}
