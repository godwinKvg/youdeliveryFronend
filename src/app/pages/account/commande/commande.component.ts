import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
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
  currentUser: any;
  constructor(public appService:AppService, public formBuilder: FormBuilder,private token: TokenStorageService) { }

  ngOnInit() {    
    this.currentUser = this.token.getUser();
    this.appService.Data.cartList.forEach(product=>{
      this.grandTotal += product.cartCount*product.newPrice;
    });
    this.countries = this.appService.getCountries();
    this.months = this.appService.getMonths();
    this.years = this.appService.getYears();
    this.deliveryMethods = this.appService.getDeliveryMethods();
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
      cardHolderName: ['', Validators.required],
      cardNumber: ['', Validators.required],
      expiredMonth: ['', Validators.required],
      expiredYear: ['', Validators.required],
      cvv: ['', Validators.required]
    });
  }

  public placeOrder(){
    this.horizontalStepper._steps.forEach(step => step.editable = false);
    this.verticalStepper._steps.forEach(step => step.editable = false);
    this.appService.Data.cartList.length = 0;    
    this.appService.Data.totalPrice = 0;
    this.appService.Data.totalCartCount = 0;

  }

}
