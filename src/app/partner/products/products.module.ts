import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { InputFileModule } from 'ngx-input-file';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductZoomComponent } from './product-detail/product-zoom/product-zoom.component';
import { AddProductComponent } from './add-product/add-product.component';

export const routes = [ 
  { path: '', redirectTo: 'product-list', pathMatch: 'full'},
  { path: 'product-list', component: ProductListComponent, data: { breadcrumb: 'Menus' } },
  { path: 'product-detail', component: ProductDetailComponent, data: { breadcrumb: 'Détail Menu' } },
  { path: 'product-detail/:id', component: ProductDetailComponent, data: { breadcrumb: 'Détail Menu' } }, 
  { path: 'add-product', component: AddProductComponent, data: { breadcrumb: 'Ajout Menu' } },
  { path: 'add-product/:id', component: AddProductComponent, data: { breadcrumb: 'Editer Menu' } }, 
];

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductZoomComponent,
    AddProductComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule,
    NgxPaginationModule,
    SwiperModule,
    InputFileModule
  ]
})
export class ProductsModule { }
