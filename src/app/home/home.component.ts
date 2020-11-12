import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  searchedFood: string = '';
  fullName: string = '';
  tax = 0;
  subtotal = 0;
  TotalPrice = 0;
  purchasedItem = [];
  foodObj = [];
  couponCode = '';
  discountFlag = false;
  discountPrice = 0;
  showFilter: boolean = false;
  showdeliveryPopup: boolean = false;
  menuObj: any;
  deliveryTime = 0;
  constructor(private router: Router, private commonService: CommonService) {}

  add(food) {
    this.purchasedItem.push(food);
    this.subtotal = this.subtotal + food.price;
    this.tax = this.subtotal * 0.025;
    this.TotalPrice = this.subtotal + this.tax + this.tax;
    this.discountFlag = false;
    this.discountPrice = 0;
  }

  clearCart() {
    this.subtotal = 0;
    this.tax = 0;
    this.TotalPrice = 0;
    this.purchasedItem = [];
    this.discountFlag = false;
    this.discountPrice = 0;
  }

  filterByValue() {
    this.foodObj = this.menuObj.filter((food) => {
      return Object.keys(food).some((x) => {
        return (
          typeof food[x] == 'string' &&
          food[x]
            .toString()
            .toLowerCase()
            .includes(this.searchedFood.toString().toLowerCase())
        );
      });
    });
  }

  applyCoupon() {
    this.couponCode.trim();
    if (this.couponCode == 'DISC10' && !this.discountFlag) {
      this.discountPrice = this.TotalPrice * 0.1;
      this.TotalPrice = this.TotalPrice - this.discountPrice;
      this.discountFlag = true;
    }
  }

  showFilterpopup() {
    this.showFilter = !this.showFilter;
  }

  showOrderpopup() {
    if (this.purchasedItem.length > 0)
      this.showdeliveryPopup = !this.showdeliveryPopup;
      this.deliveryTime=10+(this.purchasedItem.length*2);
  }
  sortMenu(category) {
    this.foodObj.sort((a, b) =>
      a[category] > b[category] ? 1 : b[category] > a[category] ? -1 : 0
    );
    this.showFilter = !this.showFilter;
  }

  getMenuData() {
    this.commonService
      .getStaticJsonPromise('https://demo5414223.mockable.io/getMenu')
      .then((response) => {
        this.menuObj = response;
        this.foodObj = this.menuObj;
      });
  }
  ngOnInit(): void {
    this.getMenuData();
  }
}
