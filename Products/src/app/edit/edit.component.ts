import { Component, OnInit } from '@angular/core';
import{ProductModel}from '../productlist/product.model';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  title:String=" Edit/Delete Product List";
products:ProductModel[];

imageWidth:number=50;
imageMargin:number=2;

showImage:boolean=true;


  constructor(private productService:ProductService,private router:Router) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data)=>{
      this.products=JSON.parse(JSON.stringify(data));
    })}

    deleteProduct(id)
   {
     console.log("delete call"+id);
     
     this.productService.deletePro(id)
     .subscribe(
     
      err =>{
        if (err instanceof HttpErrorResponse){
          if(err.status===401){
            this.router.navigate(['/login'])
          }
        }
      }
     )
     console.log("Product Deleted!");
     alert("Product Deleted!");
     this.router.navigate(['/']);
   }
 
   
 
 }
  


