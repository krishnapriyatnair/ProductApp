import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductlistComponent } from './productlist/productlist.component';
import { NewProductComponent } from './new-product/new-product.component';
import{EditComponent}from './edit/edit.component';
import{UpdateComponent}from './update/update.component';
import{SignupComponent}from './signup/signup.component';
import{LoginComponent}from './login/login.component'
 import{UserGuard}from './user.guard';
import { from } from 'rxjs';

const routes: Routes = [{path:'',component:ProductlistComponent},
{path:'add',component:NewProductComponent, canActivate:[UserGuard]},
{path:'edit',component:EditComponent,canActivate:[UserGuard]},
{path:'update/:id',component:UpdateComponent,canActivate:[UserGuard]},
{path:'signup', component:SignupComponent},
{path:'login',component:LoginComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
