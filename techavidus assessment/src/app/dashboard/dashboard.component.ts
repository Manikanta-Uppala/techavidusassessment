import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { dashboard } from './dashboard.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  form!: FormGroup;
  productData!: any;
  newObject: any;
  // total = 0;
  private value: any;
  total = 0;
  dashboardModelObj: dashboard = new dashboard();
  row: any;
  constructor(
    private formBuilder: FormBuilder,
    private apiservice: ApiService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [''],
      productName: [''],
      prize: [''],
      Quantity: [''],
    });
    this.getallproduct();
  }
  postproductDetails(): void {
    this.dashboardModelObj.id = this.form.value.id;
    this.dashboardModelObj.productName = this.form.value.productName;
    this.dashboardModelObj.prize = this.form.value.prize;
    this.dashboardModelObj.Quantity = this.form.value.Quantity;
    this.apiservice.postProduct(this.dashboardModelObj).subscribe(
      (res: any) => {
        console.log(res);
        alert('Employee Added successfully');
        const ref = document.getElementById('cancel');
        ref?.click();
        this.form.reset();
      },
      (error: any) => {
        alert('something went wrong');
      }
    );
  }
  // tslint:disable-next-line:typedef
  getallproduct() {
    this.apiservice.getProduct().subscribe((res: any) => {
      this.productData = res;
      this.findsum(this.productData);
      console.log(res);
    });
  }
  // tslint:disable-next-line:typedef
  findsum(productData: any) {
    this.value = productData;
    console.log(productData);
    for (let j = 0; j < productData.length; j++) {
      this.total += this.value[j].prize * this.value[j].Quantity;
      console.log(this.total);
    }
  }
  onEdit(row: any): any {
    this.dashboardModelObj.id = row.id;
    this.form.controls.id.setValue(row.id);
    this.form.controls.productName.setValue(row.productName);
    this.form.controls.prize.setValue(row.prize);
    this.form.controls.Quantity.setValue(row.Quantity);
  }
  updateProductData(): any {
    this.dashboardModelObj.id = this.form.value.id;
    this.dashboardModelObj.productName = this.form.value.productName;
    this.dashboardModelObj.prize = this.form.value.prize;
    this.dashboardModelObj.Quantity = this.form.value.Quantity;
    this.apiservice
      .updateProduct(this.dashboardModelObj, this.dashboardModelObj.id)
      .subscribe((res: any) => {
        console.log(res);
        alert('updated successfully');
        const ref = document.getElementById('cancel');
        ref?.click();
        this.form.reset();
        this.getallproduct();
      });
  }
  // tslint:disable-next-line:typedef
  deleteProducts(row: any) {
    this.apiservice.deleteProduct(row.id).subscribe((res: any) => {
      alert('product deleted successfully');
      this.getallproduct();
    });
  }
}

