import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONSTANT } from '../Common';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl: string = `${CONSTANT.apiUrl}/Order`;
  private headers = new HttpHeaders();
  constructor(private http: HttpClient) {
    const accessToken = sessionStorage.getItem('accessToken');
    if (accessToken) {
      this.headers = this.headers.set('Authorization', `Bearer ${accessToken}`);
    }
  }

  public getAllOrder() {
    let params = new HttpParams()
      .set('PageSize', '99')
      .set('PageIndex', '1');
    return this.http.get(`${this.apiUrl}/admin/get-all-order`, { params });
  }

  public getAllPendingOrder() {
    const headers = this.headers;
    return this.http.get(`${this.apiUrl}/get-all-pending-order`, { headers });
  }

  public getAllAcceptedOrder() {
    const headers = this.headers;
    return this.http.get(`${this.apiUrl}/get-all-accepeted-order`, { headers });
  }

  public getAllShippingOrder() {
    const headers = this.headers;
    return this.http.get(`${this.apiUrl}/get-all-shipping-order`, { headers });
  }

  public getAllSuccessOrder() {
    const headers = this.headers;

    return this.http.get(`${this.apiUrl}/get-all-success-order`, { headers });
  }

  public getAllCancelOrder() {
    const headers = this.headers;
    return this.http.get(`${this.apiUrl}/get-all-cancel-order`, { headers });
  }

  public updateOrderStatus(data: any) {
    const headers = this.headers;
    return this.http.put(`${this.apiUrl}/update-order-status`, data, { headers });
  }
}
