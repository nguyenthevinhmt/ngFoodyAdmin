import { Component, OnInit } from '@angular/core';
import { PromotionService } from '../promotion.service';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent implements OnInit {
  public listPromotion: any;
  constructor(private promotionService: PromotionService) {

  }

  ngOnInit(): void {
    this.getAllPromotion();
    this.getPromotionById();
  }

  private getAllPromotion() {
    this.promotionService.getAllPromotion().subscribe((data: any) => {
      this.listPromotion = data.item;
      console.log(this.listPromotion);
    })
  }

  public getPromotionById() {
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
    let data = {
      name: "Không giảm giá",
      promotionCode: "123",
      description: "Không giảm giá",
      discountPercent: 0,
      startTime: "0001-01-01T00:00:00",
      endTime: "0001-01-01T00:00:00",
      isActive: true
  }
    console.log(data)
    this.promotionService.addPromotion(data).subscribe({
      next: (data: any) => {
        console.log("them thanh cong");
      },
      error: (err: any) => {
        console.log(err.status)
        console.error('loi khi them ', err);
      }
    });
  }

  public editPromotion() {
    let data = {
      id: '10',
      name: 'test edit',
      description: 'abc'
    }
    this.promotionService.editPromotion(data).subscribe({
      next: (data: any) => {
        console.log("sua thanh cong");
      },
      error: (err: any) => {
        console.log(err.status)
        console.error('loi khi sua ', err);
      }
    });
  }

  public deletePromotionById() {
    this.promotionService.deletePromotionById('9').subscribe(data => {
      console.log(data);
    })
  }
}
