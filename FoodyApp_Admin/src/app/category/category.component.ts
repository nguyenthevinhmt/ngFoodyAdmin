import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  listCategory: any;
  constructor(private categoryService: CategoryService) {

  }

  ngOnInit(): void {
    this.getAllCategory();
    this.getCategoryById();
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

  public deleteCategoryById() {
    this.categoryService.deleteCategoryById('9').subscribe(data => {
      console.log(data);
    })
  }
}
