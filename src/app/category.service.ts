import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Product } from './models/product';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  observableCategories$: Observable<any>;

  constructor(private db : AngularFireDatabase) { 
    this.observableCategories$ = this.db.list('/categories', ref => ref.orderByChild('name'))
      .snapshotChanges();
  }

//  getAll()
//   {
//     return this.db.list('/categories', ref => ref.orderByChild('name')).snapshotChanges();
//   }

getAll() {
return this.observableCategories$.pipe(map(changes => {
  return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
}));
}

  // getAll() {
  //   return this.db.list('/categories', ref => ref.orderByChild('name')).snapshotChanges().pipe(
  //   map(action => {
  //   return action.map(item => {
  //   const key = item.payload.key;
  //   const data = { key, ...item.payload.val() };
  //   return data;
  //   });
  //   }));
  //   }
}
