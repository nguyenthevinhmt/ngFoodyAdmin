import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CategoryService } from '../service/category.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  listCategory: any;
  constructor(private categoryService: CategoryService, private router: Router, private route: ActivatedRoute) {
    console.log(sessionStorage.getItem('accessToken'))
  }

  ngOnInit(): void {
    this.getAllCategory();
  }

  private getAllCategory() {
    this.categoryService.getAllCategory().subscribe((data: any) => {
      this.listCategory = data.item;
      console.log(this.listCategory);
    })
  }

  public getCategoryById() {
    this.categoryService.getCategoryById('1').subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  public addCategory() {
    let data = {
      name: 'test11',
      description: 'abc'
    }
    console.log(data)
    this.categoryService.addCategory(data).subscribe({
      next: (data: any) => {
        console.log("them thanh cong");
      },
      error: (err: any) => {
        console.log(err.status)
        console.error('loi khi them ', err);
      }
    });
  }

  public editCategory() {
    let data = {
      id: '10',
      name: 'test edit',
      description: 'abc'
    }
    this.categoryService.editCategory(data).subscribe({
      next: (data: any) => {
        console.log("sua thanh cong");
      },
      error: (err: any) => {
        console.log(err.status)
        console.error('loi khi sua ', err);
      }
    });
  }

  public deleteCategoryById(id: string) {
    if (confirm('Are you sure delete?')) {
      this.categoryService.deleteCategoryById(id).subscribe({
        next: () => {
          alert('Xoa thanh cong');
          window.location.reload();
        },
        error: () => {
          alert('Loi khi xoa');
          window.location.reload();
        }
      });
    }
  }
}
