import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  @ViewChild('sidenav', { static: true }) sidenav: any;
  public sidenavOpen:boolean = true;
  public links = [
    { name: 'Tableau de bord ', href: 'dashboard', icon: 'dashboard' },
    { name: 'Informations du compte', href: 'information', icon: 'info' },
    { name: 'Addresses', href: 'addresses', icon: 'location_on' },
    { name: 'Passer une commande', href: 'checkout', icon: 'shopping_cart' }, 
    { name: 'Historiques des commandes', href: 'orders', icon: 'add_shopping_cart' },  
     
  ];
  constructor(public router:Router,public tokenStorageService: TokenStorageService) { }

  ngOnInit() {
    if(window.innerWidth < 960){
      this.sidenavOpen = false;
    };
   // window.location.reload();
  }

  @HostListener('window:resize')
  public onWindowResize():void {
    (window.innerWidth < 960) ? this.sidenavOpen = false : this.sidenavOpen = true;
  }

  ngAfterViewInit(){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) { 
        if(window.innerWidth < 960){
          this.sidenav.close(); 
        }
      }                
    });
  }
  logout() {
    this.tokenStorageService.signOut();
    localStorage.setItem('isLoggedInClient',"false");
    window.location.reload();
  }
}
