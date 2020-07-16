import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{HttpClientModule ,HTTP_INTERCEPTORS} from '@angular/common/http';
import{FormsModule,ReactiveFormsModule} from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProductlistComponent } from './productlist/productlist.component';
import { from } from 'rxjs';

import { NewProductComponent } from './new-product/new-product.component';
import { EditComponent } from './edit/edit.component';
import { UpdateComponent } from './update/update.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import{UserService} from './user.service';
import{ProductService} from './product.service';
import{UserGuard} from './user.guard';
import{TokenInterceptorService}from './token-interceptor.service';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductlistComponent,
    
    NewProductComponent,
    
    EditComponent,
    
    UpdateComponent,
    
    SignupComponent,
    
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [UserService,ProductService,UserGuard,
  {
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
