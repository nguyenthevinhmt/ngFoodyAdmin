import { Component, OnInit } from '@angular/core';
import { PromotionService } from '../service/promotion.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PromotionModalComponent } from '../promotion-modal/promotion-modal.component';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent implements OnInit {
  public listPromotion: any;
  constructor(private promotionService: PromotionService, private dialog: MatDialog, private snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.getAllPromotion();
  }

  private getAllPromotion() {
    this.promotionService.getAllPromotion().subscribe((data: any) => {
      this.listPromotion = data.item;
      console.log(this.listPromotion);
    })
  }

  public getPromotionById(id: string) {
    this.promotionService.getPromotionById('1').subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  public addPromotion() {
    sessionStorage.setItem('promotionId', '');
    const dialogRef = this.dialog.open(PromotionModalComponent, {
      data: { title: 'ADD PROMOTION' }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  public editPromotion(id: string) {
    sessionStorage.setItem('promotionId', id);
    const dialogRef = this.dialog.open(PromotionModalComponent, {
      data: { title: 'EDIT PROMOTION' }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  public deletePromotionById(id: string) {
    if (confirm('Co chac chan xoa khong?')) {
      this.promotionService.deletePromotionById(id).subscribe({
        next: () => {
          this.snackBar.open('Xoa thanh cong', '', {
            duration: 2000,
            verticalPosition: 'top',
          });
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        },
        error: () => {
          this.snackBar.open('Xoa khong thanh cong', '', {
            duration: 2000,
            verticalPosition: 'top',
          });
        }
      });
    }
  }
}
