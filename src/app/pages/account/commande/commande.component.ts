import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { colorSets } from '@swimlane/ngx-charts';
import { Commande, CommandeProduit, Product, User } from 'src/app/app.models';
import { AppService } from 'src/app/app.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.scss']
})
export class CommandeComponent implements OnInit {

  @ViewChild('horizontalStepper', { static: true }) horizontalStepper: MatStepper;
  @ViewChild('verticalStepper', { static: true }) verticalStepper: MatStepper;
  billingForm: FormGroup;
  deliveryForm: FormGroup;
  paymentForm: FormGroup;
  countries = [];
  months = [];
  years = [];
  deliveryMethods = [];
  grandTotal = 0;
  currentUser: User = {} as User;
  p:Array<Product> = [];
  payementMethods =[];
  constructor(public appService:AppService, public formBuilder: FormBuilder,private token: TokenStorageService) { }

  ngOnInit() {   
    
    console.log('CommandeComponent onInit');
    
    this.appService.getProducts("featured").subscribe(data =>{this.p =data;});

    

   // this.currentUser = JSON.parse(this.token.getUser());

    this.currentUser = this.token.getUser();

    console.log('this.currentUser :',this.currentUser);

    this.appService.Data.cartList.forEach(product=>{

      console.log('product.cartCount :',product.cartCount);
      console.log('product.newPrice :',product.newPrice);

      this.grandTotal += product.cartCount*product.newPrice;
    });
    this.countries = this.appService.getCountries();
    this.months = this.appService.getMonths();
    this.years = this.appService.getYears();
    this.deliveryMethods = this.appService.getDeliveryMethods();
    this.payementMethods = this.appService.getPaymentMethods();
    this.billingForm = this.formBuilder.group({
      fullname: [ this.currentUser.fullname, Validators.required],
      username: [this.currentUser.username, Validators.required],
      phoneNumber: [this.currentUser.phoneNumber, Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required]
    });
    this.deliveryForm = this.formBuilder.group({
      deliveryMethod: [this.deliveryMethods[0], Validators.required]
    });
    this.paymentForm = this.formBuilder.group({
      payementMethod: ['', Validators.required]
    });
  }

  createOrderFromForm(){
    let order : Commande = {} as Commande;
    order.commandeProduits = [];
    order.modeLivraison = this.deliveryForm.value.deliveryMethod.name;
    order.modePaiement = this.paymentForm.value.payementMethod.name;
    order.user = this.currentUser;

    this.appService.Data.cartList.forEach( p =>{
      let c : CommandeProduit = {} as CommandeProduit;
      c.product = p;
      c.qte = p.cartCount;
      order.commandeProduits.push(c);
    })

    order.montant = this.grandTotal;

    return order;

  }

  public placeOrder(){

    let order = this.createOrderFromForm();

    console.log('Order object :',order);

    this.appService.createOrder(order).subscribe(
      (o : Commande) =>{
        console.log('successfully placed order:',o);
        
    this.horizontalStepper._steps.forEach(step => step.editable = false);
    this.verticalStepper._steps.forEach(step => step.editable = false);
    this.appService.Data.cartList.length = 0;    
    this.appService.Data.totalPrice = 0;
    this.appService.Data.totalCartCount = 0;

      },
      (e : HttpErrorResponse)=>{
        console.log('Error while placing order:',e);
      }
    )
  }

}
