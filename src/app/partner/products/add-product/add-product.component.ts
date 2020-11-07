import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { Category, Product } from 'src/app/app.models';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { InputFile } from 'ngx-input-file';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  public form: FormGroup;
  public colors = ["#5C6BC0","#66BB6A","#EF5350","#BA68C8","#FF4081","#9575CD","#90CAF9","#B2DFDB","#DCE775","#FFD740","#00E676","#FBC02D","#FF7043","#F5F5F5","#696969"];
  public sizes = ["S","M","L","XL","2XL","32", "36","38","46","52","13.3\"","15.4\"","17\"","21\"","23.4\""]; 
  public selectedColors:string;
  public categories:Category[];
  private sub: any;
  public id:any;
  file : File[] = [];
  photoServiceUrl =environment.photoServiceUrl;
  public edit: boolean = false;
  public currentUser :any;
  product: Product = new Product();


  constructor(public token: TokenStorageService, public appService:AppService, public formBuilder: FormBuilder, private activatedRoute: ActivatedRoute,private router: Router ) { }

  ngOnInit(): void {


    this.form = this.formBuilder.group({ 
      'id' : null,
      'name': [null, Validators.compose([Validators.required, Validators.minLength(4)])],
      'images': null,
      "oldPrice": null,
      "newPrice": [null, Validators.required ],
      "discount": null, 
      "description": null,
      "availibilityCount": null, 
      "color": null,
      "size": null,
      "weight": null,
      "categoryId": [null, Validators.required ]   
    }); 
    this.currentUser = this.token.getUser();
    this.getCategories();
    this.sub = this.activatedRoute.params.subscribe(params => {  
      if(params['id']){
        this.id = params['id'];
        this.getProductById(); 
        this.edit =true;
      }  
    }); 
  }

  fileChangeEvent(e : InputFile){
    console.log('photo selected :',e);
    this.file.push(e.file);
    console.log('photo list:',this.file);
  } 

  public getCategories(){   
    this.appService.getCategories().subscribe(data => {
      this.categories = data; 
      this.categories.shift();
    }); 
  }

  public getProductById(){
    this.appService.getProductByID(this.id).subscribe((data:any)=>{ 
      this.form.patchValue(data); 
      this.selectedColors = data.color; 
    /*  const images: any[] = [];
      data.images.forEach(item=>{
        let image = {
          link: item.medium,
          preview: item.medium
        }
        images.push(image);
      })
      this.form.controls.images.setValue(images); */
    });
  }

  //save photos then product
  saveProduct(){
    this.appService.uploadPhotosProduct(this.file,this.photoServiceUrl).subscribe(
      (photos) => {
        console.log('successfully saved photos :',photos);
        this.product.photo1 = photos[0];
        this.product.photo2 = photos[1] ? photos[1] : photos[0];
        this.product.photo3 = photos[2] ? photos[2] : photos[0];
        this.product.photo4 = photos[3] ? photos[3] : photos[0];

        console.log('Product object before save :',this.product);


         console.log(this.form + ""+ this.currentUser.id);
 
        this.appService.createProduct(this.product).subscribe(data => {
          console.log('Product object after save :',data);
        //  this.product = new Product();
          this.router.navigate(['/partner/products/product-list']);
        }, 
        error => console.log(error)); 
      },
      (e : HttpErrorResponse) =>{
        console.log('Error while saving photos...',e);
      }
    )

  }

  public onSubmit(){


    
    this.product.name = this.form.get('name').value;
    this.product.newPrice = this.form.get('newPrice').value;
    this.product.oldPrice = this.form.get('oldPrice').value;
    this.product.size = this.form.get('size').value;
    this.product.weight = this.form.get('weight').value;
    this.product.availibilityCount = this.form.get('availibilityCount').value;
    this.product.categoryId = this.form.get('categoryId').value;
    this.product.color = this.form.get('color').value;
    this.product.description = this.form.get('description').value;
    this.product.discount = this.form.get('discount').value;
    this.product.idPartner = this.currentUser.id;

    console.log('photo list on submit:',this.file);
    if(!this.edit || (this.edit && this.file.length != 0)) this.saveProduct(); // S'il  s'agit d'un ajout ou d'edit avec modification de photos

    if(this.edit && this.file.length == 0)  this.appService.createProduct(this.product); // S'il s'agit d'un update sans modification de photos
    
/*     this.appService.uploadPhotosProduct(this.file,this.photoServiceUrl).subscribe(
      (photos) => {
        console.log('successfully saved photos :',photos);

        //Si les photos s'enregistrent avec success, on peut enregistrer le produit maintenant

        this.product.name = this.form.get('name').value;
        this.product.images = this.form.get('images').value;
        this.product.newPrice = this.form.get('newPrice').value;
        this.product.oldPrice = this.form.get('oldPrice').value;
        this.product.size = this.form.get('size').value;
        this.product.weight = this.form.get('weight').value;
        this.product.availibilityCount = this.form.get('availibilityCount').value;
        this.product.categoryId = this.form.get('categoryId').value;
        this.product.color = this.form.get('color').value;
        this.product.description = this.form.get('description').value;
        this.product.discount = this.form.get('discount').value;
        this.product.idPartner = this.currentUser.id;

        this.product.photo1 = photos[0];
        this.product.photo2 = photos[1] ? photos[1] : photos[0];
        this.product.photo3 = photos[2] ? photos[2] : photos[0];
        this.product.photo4 = photos[3] ? photos[3] : photos[0];

        console.log('Product object before save :',this.product);


         console.log(this.form + ""+ this.currentUser.id);
         if(!this.edit){
        this.appService
        .createProduct(this.product).subscribe(data => {
          console.log('Product object after save :',data);
        //  this.product = new Product();
          this.router.navigate(['/partner/products/product-list']);
        }, 
        error => console.log(error));
      }
      else{
        this.appService
        .updateProduct(this.id,this.product).subscribe(data => {
          console.log(data)
        //  this.product = new Product();
          this.router.navigate(['/partner/products/product-list']);
        }, 
        error => console.log(error));
      } 

      },
      (e : HttpErrorResponse) =>{
        console.log('Error while saving photos...',e);
      }
    ) */
  }

  public onColorSelectionChange(event:any){  
    if(event.value){
      this.selectedColors = event.value.join();
    } 
  }  

  ngOnDestroy() {
    this.sub.unsubscribe();
  } 

}
