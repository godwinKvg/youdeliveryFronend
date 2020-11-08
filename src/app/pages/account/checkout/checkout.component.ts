import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Colis } from 'src/app/app.models';
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
  payementForm: FormGroup;
  countries = [];
  months = [];
  years = [];
  poids = [];
  typesColis = [];
  deliveryMethods = [];
  payementMethods =  [];
  grandTotal = 0;
  currentUser: any;
  constructor(public appService:AppService, public formBuilder: FormBuilder,private token: TokenStorageService) { }

  ngOnInit() {    
    this.currentUser = this.token.getUser();

    console.log('current user :',this.currentUser);

    this.appService.Data.cartList.forEach(product=>{
      this.grandTotal += product.cartCount*product.newPrice;
    });
    this.countries = this.appService.getCountries();
    this.months = this.appService.getMonths();
    this.years = this.appService.getYears();
    this.typesColis = this.appService.getTypeColis();
    this.poids = this.appService.getPoids();
    this.deliveryMethods = this.appService.getDeliveryMethods();
    this.payementMethods = this.appService.getPaymentMethods();
    console.log(this.deliveryMethods + " "+this.payementMethods);
    this.billingForm = this.formBuilder.group({
      fullname: [ this.currentUser.fullname, Validators.required],
      username: [this.currentUser.username, Validators.required],
      phoneNumber: [this.currentUser.phoneNumber, Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required]
    });
    this.recipientForm = this.formBuilder.group({
      fullname: [ '', Validators.required],
      phoneNumber: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required]
    });
    this.payementForm = this.formBuilder.group({
      payementMethod: ['this.payementMethods[0]', Validators.required]
    });
    this.paymentForm = this.formBuilder.group({
      type: ['', Validators.required],
      poids: ['', Validators.required],
      deliveryMethode: ['this.deliveryMethods[0]', Validators.required],
      commentaire: ''
    });
  }

  createColisFromForm(){
    let colis: Colis = new Colis();

   // console.log('payementForm :',this.payementForm.value);

    colis.user = this.currentUser;
    colis.modePaiement = this.payementForm.value.payementMethod.name;
    colis.typeColis = this.paymentForm.value.type;
    colis.villeDepart = this.billingForm.value.city.name;
    colis.adressDepart = this.billingForm.value.address;
    colis.villeDestination = this.recipientForm.value.city.name;
    colis.poids = this.paymentForm.value.poids;
    colis.telephoneDestinataire = this.recipientForm.value.phoneNumber;
    colis.nomDestinataire = this.recipientForm.value.fullname;
    colis.adressDestinataire = this.recipientForm.value.city.name;

    return colis;
    

  }

  public placeOrder(){

    let colis : Colis = this.createColisFromForm();

    console.log('Colis :', colis);

    this.appService.createColis(colis).subscribe(
      (c : Colis) => {
        console.log('successfully saved colis :',c);
        
    this.horizontalStepper._steps.forEach(step => step.editable = false);
    this.verticalStepper._steps.forEach(step => step.editable = false);
    this.appService.Data.cartList.length = 0;    
    this.appService.Data.totalPrice = 0;
    this.appService.Data.totalCartCount = 0;

      },
      (e : HttpErrorResponse)=>{
        console.log('error while saving colis :',e);
      }
    )


  }

}
