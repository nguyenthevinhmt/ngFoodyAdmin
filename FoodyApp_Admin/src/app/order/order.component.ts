import { OrderService } from './../service/order.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderModalComponent } from '../order-modal/order-modal.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  public listOrder: any;
  public status: any = [
    {
      'id': 0,
      'name': ''
    },
    {
      'id': 1,
      'name': 'INPROGRESS'
    },
    {
      'id': 2,
      'name': 'ACCEPTED'
    },
    {
      'id': 3,
      'name': 'SHIPPING'
    },
    {
      'id': 4,
      'name': 'SUCCESS'
    },
    {
      'id': 5,
      'name': 'CANCELED'
    },
  ]
  public selectedStatus: any;

  constructor(private orderService: OrderService, private dialog: MatDialog, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getAllOrder();
  }

  private async getAllOrder() {
    this.orderService.getAllOrder().subscribe((data: any) => {
      this.listOrder = data.item;
      console.log(this.listOrder);
    })
  }

  public convertOderStatus(status: number) {
    let statusName = '';
    switch (status) {
      case 1:
        statusName = 'INPROGRESS';
        break;
      case 2:
        statusName = 'ACCEPTED';
        break;
      case 3:
        statusName = 'SHIPPING';
        break;
      case 4:
        statusName = 'SUCCESS';
        break;
      case 5:
        statusName = 'CANCELED';
        break;
    }
    return statusName;
  }

  changeStatusOrder(id: string, status: string) {
    sessionStorage.setItem('orderId', id);
    sessionStorage.setItem('orderStatus', status);
    const dialogRef = this.dialog.open(OrderModalComponent, {
      data: { title: 'CHANGE STATUS ORDER' }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  public async searchOrderByStatus() {
    let id = this.selectedStatus.id;
    console.log(id);
    this.orderService.getAllOrder().subscribe((data: any) => {
      this.listOrder = data.item;
      console.log(this.listOrder);
      if (id != 0) {
        this.listOrder = this.listOrder.filter((e: any) => e.orderStatus == id);

      }
      console.log(this.listOrder);
    })
  }
}
