import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { Category, Product } from 'src/app/app.models';
import { ActivatedRoute, Router } from '@angular/router';

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
  public edit: boolean = false;
  product: Product = new Product();
  constructor(public appService:AppService, public formBuilder: FormBuilder, private activatedRoute: ActivatedRoute,private router: Router ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({ 
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
    this.getCategories();
    this.sub = this.activatedRoute.params.subscribe(params => {  
      if(params['id']){
        this.id = params['id'];
        this.getProductById(); 
        this.edit =true;
      }  
    }); 
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

  public onSubmit(){
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
     console.log(this.form);
     if(!this.edit){
    this.appService
    .createProduct(this.product).subscribe(data => {
      console.log(data)
      this.product = new Product();
      this.router.navigate(['/partner/products/product-list']);
    }, 
    error => console.log(error));
  }
  else{
    this.appService
    .updateProduct(this.id,this.product).subscribe(data => {
      console.log(data)
      this.product = new Product();
      this.router.navigate(['/partner/products/product-list']);
    }, 
    error => console.log(error));
  }
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
