import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router) {}
  currentItem = 'Manikanta';
  items: any;
  // tslint:disable-next-line:typedef
  addItem(newItem: string) {
    this.items.push(newItem);
  }
  GetChildData(data: any): void{
    console.log(data);
  }
}
