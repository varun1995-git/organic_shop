import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import {map} from 'rxjs/operators';
import { Product } from './models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db : AngularFireDatabase) { }

  createProduct(product){
    return this.db.list('/products').push(product);
  }

  // getAll() {  
  //   return this.db.list('/products')
  //       .snapshotChanges()    
  //       .pipe(map(actions => actions.map(a => ({ key: a.key, ...a.payload.val() }))));
  // }

  // getAll() { 
  //   return this.db.list('/products').snapshotChanges().pipe(map(changes => { 
  //     return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));   
  //   })); 
  // }

  getAll () {
    return this.db.list('/products', ref => ref.orderByChild('title'))
      .snapshotChanges().pipe(
        map(products => products.map((product : any) => {
          const $key = product.payload.key;
          const data = product.payload.val();
          return {$key, ...data} as Product;
        }))
      );
  }




  get(productId) {
    return this.db.object('/products/'+productId).valueChanges();
  }

  update(productId,product){
    return this.db.object('/products/'+productId).update(product);
  }

  delete(productId) {
    return this.db.object('/products/'+productId).remove();
  }


}
