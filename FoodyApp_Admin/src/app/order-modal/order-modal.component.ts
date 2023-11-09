import { OrderService } from './../service/order.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-order-modal',
  templateUrl: './order-modal.component.html',
  styleUrls: ['./order-modal.component.css']
})
export class OrderModalComponent implements OnInit {
  orderFormGroup: FormGroup;
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

  constructor(private formBuilder: FormBuilder, private orderService: OrderService, private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<OrderModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.orderFormGroup = this.formBuilder.group({
      orderId: '',
      newStatus: ''
    });
  }

  ngOnInit(): void {
    const orderId = sessionStorage.getItem('orderId');
    const orderStatus = sessionStorage.getItem('orderStatus');
    if (orderId && orderStatus) {
      let status = this.status.find((e: any) => e.id == orderStatus)
      this.orderFormGroup.patchValue({
        orderId: orderId,
        newStatus: status
      })
      console.log(status)
    }
  }

  submitForm() {
    console.log(this.orderFormGroup.value)
    let status = this.orderFormGroup.get('newStatus')?.value;
    let newStatus = this.status.findIndex((e: any) => e === status);
    let orderFormGroup = this.formBuilder.group({
      orderId: sessionStorage.getItem('orderId'),
      newStatus: newStatus
    });
    console.log(orderFormGroup.value)
    this.orderService.updateOrderStatus(orderFormGroup.value).subscribe(()=>{
      alert('thanh cong')
    });
  }
}
