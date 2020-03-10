import { ShoppingCartItem } from "./shopping-cart-item";
import { Product } from "./product";

export class ShoppingCart {
    items : ShoppingCartItem[] = <any>[];
    
    // constructor(public key: string,public itemsMap: { [productId : string] : ShoppingCartItem } ) {
    //    for (let productId in itemsMap)
    //       this.items.push(itemsMap[productId]);
    // }

    // get productIds() {
    //   return  Object.keys(this.items);
    // }

    // get totalItemsCount() {
    //     let count =0 ;
    //     for (let productId in this.itemsMap)
    //     count += this.itemsMap[productId].quantity;
    //     return count;
    // }

    // constructor(public key: string,public itemsMap: { [productId : string] : ShoppingCartItem } ) {
    //     for (let productId of Object.keys(itemsMap)) {
    //         let item = itemsMap[productId];
    //         this.items.push(new ShoppingCartItem(item.product,item.quantity));
    //     }    
    //  }

    constructor (
        public key: string,
        private itemsMap: { [productId: string]: ShoppingCartItem }) {
        this.itemsMap = itemsMap || <any>{};
        
        for (let productId in itemsMap) {
        let item = itemsMap[productId];
        let x = new ShoppingCartItem();
        Object.assign(x, item);
        x.$key = productId;
        this.items.push(x);
        }
        }

     get totalPrice() {
        let sum =0 ;
        for (let productId in this.items) {
        sum += this.items[productId].totalPrice;
        }
        return sum;
    }

     get totalItemsCount() {
        let count =0 ;
        for (let productId of Object.keys(this.itemsMap)) {
        count += this.itemsMap[productId].quantity;
        }
        return count;
    }

    // getQuantity(product : Product) {
    //     let item = this.itemsMap[product.key];
    //     return item ? item.quantity : 0;
    //   }

      getQuantity (product: Product) {
        // tslint:disable-next-line:no-unused-expression
        let item = this.itemsMap[product.$key];
        return item ? item.quantity : 0;
        }
}