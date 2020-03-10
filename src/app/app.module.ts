import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomFormsModule } from 'ng2-validation';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import {DataTableModule} from "angular-6-datatable";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatInputModule, MatTableModule, MatToolbarModule } from '@angular/material';

import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment.prod';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';
import { UserService } from './user.service';
import { AdminAuthGuard } from './admin-auth-guard.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { CategoryService } from './category.service';
import { FormsModule } from '@angular/forms';
import { ProductService } from './product.service';
import { ProductsFilterComponent } from './products/products-filter/products-filter.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ShoppingCartService } from './shopping-cart.service';
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';
import { OrderService } from './order.service';
import { ShoppingCartSummaryComponent } from './shopping-cart-summary/shopping-cart-summary.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    OrdersComponent,
    BsNavbarComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent,
    ProductsFilterComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    ShoppingCartSummaryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CustomFormsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    DataTableModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatTableModule, 
    MatToolbarModule,
    AngularFireModule.initializeApp(environment.firebase),
    NgbModule.forRoot(),
    RouterModule.forRoot([
      {
        path : '',
        component : ProductsComponent
      },
      {
        path : 'products',
        component : ProductsComponent
      },
      {
        path : 'shopping-cart',
        component : ShoppingCartComponent
      },
      {
        path : 'login',
        component : LoginComponent
      },


      {
        path : 'check-out',
        component : CheckOutComponent,
        canActivate : [AuthGuard]
      },
      {
        path : 'order-success/:id',
        component : OrderSuccessComponent,
        canActivate : [AuthGuard]
      },
      {
        path : 'my/orders',
        component : MyOrdersComponent,
        canActivate : [AuthGuard]
      },
      
      
      
      {
        path : 'admin/products/new',
        component : ProductFormComponent,
        canActivate : [AuthGuard,AdminAuthGuard]
      },
      {
        path : 'admin/products/:id',
        component : ProductFormComponent,
        canActivate : [AuthGuard,AdminAuthGuard]
      },
      {
        path : 'admin/products',
        component : AdminProductsComponent,
        canActivate : [AuthGuard,AdminAuthGuard]
      },
      {
        path : 'admin/orders',
        component : AdminOrdersComponent,
        canActivate : [AuthGuard,AdminAuthGuard]
      },
    ])
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    AdminAuthGuard,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
