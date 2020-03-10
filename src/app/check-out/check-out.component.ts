import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';
import { OrderService } from '../order.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy{ 
  shipping = <any>{};
  cart : ShoppingCart;
  userId : string;
  cartSubscription : Subscription;
  userSubscription : Subscription;

  constructor(private router : Router,private authService : AuthService,private orderService : OrderService,private cartService : ShoppingCartService) {

  }

  async ngOnInit() {
    let cart$ = await this.cartService.getCart();
    this.cartSubscription = cart$.subscribe(cart => this.cart = cart);
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid)
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
  
  async placeOrder() {
    let order = {
      userId : this.userId,
      datePlaced : new Date().getTime(),
      shipping : this.shipping,
      items : this.cart.items.map( i => {
        return {
          product : {
            title : i.title,
            imageUrl : i.imageUrl,
            price : i.price
          },
          quantity : i.quantity,
          totalPrice : i.totalPrice
        }
      })
    };
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success/',result.key]);
  }    
}
