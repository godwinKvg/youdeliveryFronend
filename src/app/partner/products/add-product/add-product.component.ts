import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  public form: FormGroup;
  private sub: Subscription;
  public id:any;

  constructor(public appService:AppService, public formBuilder: FormBuilder, private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({ 
      'name': [null, Validators.compose([Validators.required, Validators.minLength(4)])],
      'images': null,
      'price' : [null,Validators.required],
      "description": null,
    }); 
    
  }


  public getProductById(){
    this.appService.getProductById(this.id).subscribe((data:any)=>{ 
      this.form.patchValue(data); 
      const images: any[] = [];
      data.images.forEach(item=>{
        let image = {
          link: item.medium,
          preview: item.medium
        }
        images.push(image);
      })
      this.form.controls.images.setValue(images); 
    });
  }

  public onSubmit(){
    console.log(this.form.value);
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  } 

}
