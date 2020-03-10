import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { take } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Product } from './models/product';
import { ShoppingCart } from './models/shopping-cart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db : AngularFireDatabase) { }

  
  // async getCart(): Promise<Observable<ShoppingCart>> {
  //   let cartId = await this.getOrCreateCartId();
  //   let cart = this.db.object('/shopping-carts/' + cartId).snapshotChanges().pipe(
  //     map((action: any) => {
  //       const key = action.key;
  //       const items = action.payload.val().items;
  //       return new ShoppingCart(key, items);
  //     })
  //   )
  //   return cart;
  // }

// this method reads the shopping cart from firebase and
// anotaded with Promise to sync with the shoppinCart to display the numbers
async getCart(): Promise <Observable<ShoppingCart> > {
  let cartId = await this.getOrCreateCartId();
  return this.db.object('/shopping-carts/' + cartId)
  .snapshotChanges().pipe(map((action : any) => {
  const key = action.key;
  const items = action.payload.val().items;
  return new ShoppingCart(key, items);
  }));
  }

  async addToCart(product) {
    this.updateItem(product,1);
  }
  
  async removeFromCart(product) {
    this.updateItem(product,-1);
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items/').remove();
  }

  private create() {
    return this.db.list("/shopping-carts").push({
      dateCreated : new Date().getTime()
    });
  }

  private getItem(cartId: string, productId: string){
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string>{
    let cartId = localStorage.getItem('cartId');
    if(cartId) return cartId;
    let result = await this.create();
    localStorage.setItem('cartId',result.key);
    return result.key;
  }

//   private async updateItemQuantity(product : Product, change: number) {
//   const cartId = await this.getOrCreateCartId();
//   const item = this.getItem(cartId,product.key);
//   item.snapshotChanges().pipe(take(1)).subscribe((i: any) => {
//     console.log(i);
//     if (i.payload.val()) {
//       item.update({ product:product, quantity: i.payload.val().quantity + change });
//     } else {
//       item.set({ product:product, quantity: 1 });        
//     }
//   }); 
// }


private async updateItem(product: Product, change: number) {
  let cartId = await this.getOrCreateCartId();
  
  let item$ = this.getItem(cartId, product.$key);
  // item$.snapshotChanges().take(1).subscribe(item => {
  // item$.update({product: product, quantity: (item.payload.val() ? (item.payload.val().quantity + 1) : 1)});
  // });
  item$.snapshotChanges().pipe(take(1)).subscribe((item : any)=> {
  const itemPayload = item.payload.val();
  let quantity = (itemPayload ? itemPayload.quantity : 0) + change;
  if( quantity === 0) item$.remove();
  else item$.update({
  title: product.title,
  price: product.price,
  // category: product.category,
  imageUrl: product.imageUrl,
  quantity: quantity
  });
  });
  }
}
