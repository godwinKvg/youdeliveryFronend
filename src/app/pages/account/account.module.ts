import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { AccountComponent } from './account.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InformationComponent } from './information/information.component';
import { AddressesComponent } from './addresses/addresses.component';
import { OrdersComponent } from './orders/orders.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CommandeComponent } from './commande/commande.component';
export const routes = [
  { 
      path: '', 
      component: AccountComponent, children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          { path: 'dashboard', component: DashboardComponent, data: {  breadcrumb: 'Dashboard' } },
          { path: 'information', component: InformationComponent, data: {  breadcrumb: 'Information' } },
          { path: 'addresses', component: AddressesComponent, data: {  breadcrumb: 'Addresses' } },
          { path: 'checkout', component: CheckoutComponent, data: {  breadcrumb: 'Checkout' } },
          { path: 'commande', component: CommandeComponent, data: {  breadcrumb: 'Commande' } },
          { path: 'orders', component: OrdersComponent, data: {  breadcrumb: 'Orde' } }
      ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    AccountComponent,
    DashboardComponent,
    InformationComponent,
    AddressesComponent,
    OrdersComponent,
    CheckoutComponent,
    CommandeComponent
  ]
})
export class AccountModule { }
