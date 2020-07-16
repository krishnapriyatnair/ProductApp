import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { from } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
getProducts(){
  return this.http.get("http://localhost:3000/products");
}
newProduct(item){
  return this.http.post("http://localhost:3000/insert",{"product":item});

}

deletePro(item){
  // alert("service"+item);
  return this.http.post("http://localhost:3000/remove" ,{"id":item});
}

getProduct(id){
  return this.http.post("http://localhost:3000/product",{"id":id});
}
updatePro(item){

  return this.http.post("http://localhost:3000/edit",{"product":item}).subscribe((status)=>{
    console.log("updated");
  });
}

}

