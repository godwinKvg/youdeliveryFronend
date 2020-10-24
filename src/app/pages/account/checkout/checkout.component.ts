import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { AppService } from 'src/app/app.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  @ViewChild('horizontalStepper', { static: true }) horizontalStepper: MatStepper;
  @ViewChild('verticalStepper', { static: true }) verticalStepper: MatStepper;
  billingForm: FormGroup;
  recipientForm: FormGroup;
  paymentForm: FormGroup;
  countries = [];
  months = [];
  years = [];
  poids = [];
  typesColis = [];
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
    this.typesColis = this.appService.getTypeColis();
    this.poids = this.appService.getPoids();
    this.deliveryMethods = this.appService.getDeliveryMethods();
    this.billingForm = this.formBuilder.group({
      fullname: [ this.currentUser.fullname, Validators.required],
      username: [this.currentUser.username, Validators.required],
      phoneNumber: [this.currentUser.phoneNumber, Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required]
    });
    this.recipientForm = this.formBuilder.group({
      fullname: [ '', Validators.required],
      username: '',
      phoneNumber: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required]
    });
    this.paymentForm = this.formBuilder.group({
      type: ['', Validators.required],
      poids: ['', Validators.required],
      deliveryMethode: ['this.deliveryMethods[0]', Validators.required],
      commentaire: ''
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
