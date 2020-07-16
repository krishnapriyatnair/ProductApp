import { Component, OnInit,OnDestroy } from '@angular/core';
import{ProductModel}from '../productlist/product.model';
import { ProductService } from '../product.service';
import { Router,ActivatedRoute} from '@angular/router';
import{FormsModule} from '@angular/forms';
import { from,Subscription } from 'rxjs';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit,OnDestroy {
  title:String=" UpdateProduct List";
  products:ProductModel[];
  constructor(private productService:ProductService,private router:Router,private activatedRoute:ActivatedRoute ) { }
  productItem:ProductModel=new ProductModel(null,null,null,null,null,null,null,null);;
sub;
id;

  ngOnInit(): void {
    this.sub =  this.activatedRoute.paramMap.subscribe((params)=>
    {
      this.id = params.get('id'); 
this.productService.getProduct(this.id).subscribe((data)=>
{
this.productItem=JSON.parse(JSON.stringify(data));
console.log(this.productItem);
});

console.log(this.productItem);
    });
  }

  ngOnDestroy()
 {
 this.sub.unsubscribe();
 }
    updateProduct():void
   {
     
     this.productService.updatePro(this.productItem);
     alert("updated the product");
     this.router.navigate(['/'])
   }

}
