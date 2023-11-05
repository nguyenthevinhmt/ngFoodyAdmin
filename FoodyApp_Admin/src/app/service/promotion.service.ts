import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONSTANT } from '../Common';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  private apiUrl: string = `${CONSTANT.apiUrl}/Promotion`;
  private headers = new HttpHeaders();
  constructor(private http: HttpClient) {
    const accessToken = sessionStorage.getItem('accessToken');
    if (accessToken) {
      this.headers = this.headers.set('Authorization', `Bearer ${accessToken}`);
    }
  }

  public getAllPromotion() {
    let params = new HttpParams()
      .set('startTime', '0001-01-01T00:00:00')
      .set('endTime', '9999-12-31T23:59:59')
      .set('PageSize', '99')
      .set('PageIndex', '1');
    return this.http.get(`${this.apiUrl}/get-all-promotion`, { params });
  }

  public getPromotionById(id: string) {
    const headers = this.headers;
    return this.http.get(`${this.apiUrl}/get-promotion-by-id/${id}`, { headers });
  }

  public addPromotion(data: any) {
    const headers = this.headers;
    console.log(headers.get('Authorization'));
    return this.http.post(`${this.apiUrl}/create-promotion`, data, { headers });
  }

  public editPromotion(data: any) {
    const headers = this.headers;
    return this.http.put(`${this.apiUrl}/update-promotion`, data, { headers });
  }

  public deletePromotionById(id: string) {
    const headers = this.headers;
    return this.http.delete(`${this.apiUrl}/delete-promotion/${id}`, { headers });
  }
}
