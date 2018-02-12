import { Component, OnInit } from '@angular/core';
import { CategoriesManagementService } from '../../services/categories-management.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categoryModel = {
    name: ''
  };

  categories = [];

  errMsg = '';

  isLoading = false;

  modalState = '';

  constructor(
    public categoriesManager: CategoriesManagementService
  ) { }

  ngOnInit() {
    this.listCategories();
  }

  listCategories() {
    this.categories = [];
    this.categoriesManager.list()
      .then(data => {
        // tslint:disable-next-line:forin
        for (const key in data) {
          data[key].key = key;
          data[key].dateCreated = (new Date(data[key].dateCreated)).toTimeString();
          data[key].dateModified = (new Date(data[key].dateModified)).toTimeString();
          this.categories.push(data[key]);
        }
      })
      .catch(err => {
        alert(err.message);
      });
  }

  addCategory() {
    this.errMsg = '';
    this.isLoading = true;
    this.categoriesManager.store(this.categoryModel)
      .then(status => {
        this.errMsg = 'Successful!';
        this.isLoading = false;
        this.listCategories();
      })
      .catch(err => {
        this.errMsg = 'err.message';
        this.isLoading = false;
      });
  }

  showEditModal(category) {
    this.modalState = 'edit';
    this.categoryModel = category;
  }

  showAddModal() {
    this.modalState = 'add';
  }

  deleteCategory(category) {
    this.categoriesManager.delete(category)
      .then(status => {
        this.listCategories();
      })
      .catch(err => {
        alert(err.message);
      });
  }

  manageProduct() {
    if (this.modalState === 'add') {
      this.addCategory();
    }

    if (this.modalState === 'edit') {
      this.renameCategory();
    }
  }

  renameCategory() {
    this.errMsg = '';
    this.isLoading = true;
    this.categoriesManager.update(this.categoryModel)
      .then(status => {
        this.errMsg = 'Successful!';
        this.isLoading = false;
        this.listCategories();
      })
      .catch(err => {
        this.errMsg = 'err.message';
        this.isLoading = false;
        this.listCategories();
      });
  }

}
