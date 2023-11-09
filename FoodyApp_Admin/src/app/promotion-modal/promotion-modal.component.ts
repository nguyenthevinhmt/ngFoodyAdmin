import { PromotionService } from './../service/promotion.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-promotion-modal',
  templateUrl: './promotion-modal.component.html',
  styleUrls: ['./promotion-modal.component.css']
})
export class PromotionModalComponent implements OnInit {
  promotionForm: FormGroup;
  isEditType: boolean = false;
  constructor(private formBuilder: FormBuilder, private PromotionService: PromotionService, private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<PromotionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.promotionForm = this.formBuilder.group({
      id: '',
      name: '',
      promotionCode: '',
      description: '',
      discountPercent: '',
      startTime: '',
      endTime: '',
      isActive: 'false',
    });
  }

  ngOnInit(): void {
    const promotionId = sessionStorage.getItem('promotionId');
    if (promotionId) {
      this.isEditType = true;
      this.promotionForm.patchValue({ id: promotionId });
      this.PromotionService.getPromotionById(promotionId).subscribe({
        next: (data: any) => {
          this.promotionForm.patchValue({
            name: data.name,
            promotionCode: data.promotionCode,
            description: data.description,
            discountPercent: data.discountPercent,
            startTime: data.startTime,
            endTime: data.endTime,
            isActive: data.isActive,
          });
          console.log(data)
        }
      })
    }
    console.log(this.isEditType)
  }

  public addPromotion() {
    this.PromotionService.addPromotion(this.promotionForm.value).subscribe({
      next: () => {
        this.snackBar.open('Them thanh cong!', '', {
          duration: 2000,
          verticalPosition: 'top',
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      },
      error: () => {
        this.snackBar.open('Them khong thanh cong!', '', {
          duration: 2000,
          verticalPosition: 'top',
        });
      }
    });
  }

  public editPromotion() {
    this.PromotionService.editPromotion(this.promotionForm.value).subscribe({
      next: () => {
        this.snackBar.open('Sua thanh cong!', '', {
          duration: 2000,
          verticalPosition: 'top',
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      },
      error: () => {
        this.snackBar.open('Sau khong thanh cong!', '', {
          duration: 2000,
          verticalPosition: 'top',
        });
      }
    });
  }

  formatToISOWithoutUTC(date: Date) {
    const year = date.getFullYear().toString().padStart(4, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    return formattedDate;
  }

  convertDate() {
    const startTime = this.formatToISOWithoutUTC(new Date(this.promotionForm.get('startTime')?.value));
    const endTime = this.formatToISOWithoutUTC(new Date(this.promotionForm.get('endTime')?.value));
    this.promotionForm.patchValue({
      startTime: startTime,
      endTime: endTime
    })
  }

  submitForm() {
    this.convertDate();
    console.log(this.promotionForm.value);
    if (!this.isEditType) {
      this.addPromotion();
    } else {
      this.editPromotion();
    }
    this.dialogRef.close();
  }
}
