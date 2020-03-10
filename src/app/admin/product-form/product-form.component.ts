import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators'


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit{

  categories$;
  product = <any>{};
  id;

  constructor(private route : ActivatedRoute,
    private categoryService : CategoryService,
    private productService : ProductService,
    private router : Router) { 
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id) this.productService.get(this.id).pipe(take(1)).subscribe(p => { this.product = p });
   }

   ngOnInit() {
    this.categories$ = this.categoryService.getAll();
   }

   save(product) {
     if(this.id) this.productService.update(this.id,product);
     else this.productService.createProduct(product);

     this.router.navigate(['/admin/products']);
   }

   delete() {
     if(!confirm("Are you sure you want to delete this product?")) return;
     
     this.productService.delete(this.id);
     this.router.navigate(['/admin/products']);
   }
}
