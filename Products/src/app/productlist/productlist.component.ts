import { Component, OnInit } from '@angular/core';
import{ProductModel}from './product.model';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {

  
title:String="Product List";
products:ProductModel[];
 

imageWidth:number=50;
imageMargin:number=2;

showImage:boolean=true;

constructor(private productService:ProductService,private router:Router) { }
 toggleImage():void{
   this.showImage=!this.showImage;
 }



ngOnInit(): void {
 this.productService.getProducts().subscribe((data)=>{
      this.products=JSON.parse(JSON.stringify(data));
    })
  }

}