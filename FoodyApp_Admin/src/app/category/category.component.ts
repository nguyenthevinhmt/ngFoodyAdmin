import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../service/category.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CategoryModalComponent } from '../category-modal/category-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  listCategory: any;
  constructor(private categoryService: CategoryService, private router: Router, private dialog: MatDialog, private snackBar: MatSnackBar) {
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
    sessionStorage.setItem('categoryId', '');
    const dialogRef = this.dialog.open(CategoryModalComponent, {
      data: { title: 'ADD CATEGORY' }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  public editCategory(id: string) {
    sessionStorage.setItem('categoryId', id)
    const dialogRef = this.dialog.open(CategoryModalComponent, {
      data: { title: 'EDIT CATEGORY' }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  public deleteCategoryById(id: string) {
    if (confirm('Co chac chan xoa khong?')) {
      this.categoryService.deleteCategoryById(id).subscribe({
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
