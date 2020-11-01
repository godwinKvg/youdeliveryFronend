import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {

  public banners = [
    { title: 'Collecte et Distribution', subtitle: 'Faites nous confiance pour la collecte et la distribution de vos produits', image:'assets/images/carousel/banner0.jpg' },
    { title: 'Courriers et Colis', subtitle: 'Nous réceptionnons vos colis et courriers et nous chargerons de les acheminer en toute sécurité avec un respect strict des mesures édictées', image:'assets/images/carousel/banner1.jpg' },
    { title: "Courses personnelles", subtitle: "Pour faire vos courses, ne bougez plus de chez vous. Envoyez nous la liste de vos courses via notre site et nous nous chargeons de vous les livrer dans les plus brefs délais", image: 'assets/images/carousel/banner1.jpg' },
    { title: "Services en ligne", subtitle: "Vous pouvez passer vos commandes auprès de nos structures partenaires pour vos différentes requêtes", image: 'assets/images/carousel/banner1.jpg' },
    { title: "Summer collection", subtitle: "New Arrivals On Sale", image:'assets/images/carousel/banner1.jpg' },
    { title: "Shoes for you", subtitle: "Now starting at $89", image: 'assets/images/carousel/banner1.jpg' }
    
  ];
 

  constructor(public appService:AppService) { }

  ngOnInit(): void {
    /*this.getBanners();*/
  }
  /*public getBanners(){
    this.appService.getBanners().subscribe(data=>{
      this.banners = data;
    })
  }*/

}
