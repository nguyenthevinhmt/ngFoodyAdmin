import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from '../service/category.service';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.css']
})
export class CategoryModalComponent implements OnInit {
  categoryForm: FormGroup;
  isEditType: boolean = false;
  constructor(private formBuilder: FormBuilder, private categoryService: CategoryService, private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<CategoryModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.categoryForm = this.formBuilder.group({
      id: '',
      name: '',
      description: '',
    });
  }

  ngOnInit(): void {
    const categoryId = sessionStorage.getItem('categoryId');
    if (categoryId) {
      this.isEditType = true;
      this.categoryForm.patchValue({ id: categoryId });
      this.categoryService.getCategoryById(categoryId).subscribe({
        next: (data: any) => {
          this.categoryForm.patchValue({
            name: data.name,
            description: data.description
          });
        }
      })
    }
    console.log(this.isEditType)
  }

  public addCategory() {
    this.categoryService.addCategory(this.categoryForm.value).subscribe({
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

  public editCategory() {
    this.categoryService.editCategory(this.categoryForm.value).subscribe({
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

  submitForm() {
    console.log(this.categoryForm.value);
    if (!this.isEditType) {
      this.addCategory();
    } else {
      this.editCategory();
    }
    this.dialogRef.close();
  }
}
