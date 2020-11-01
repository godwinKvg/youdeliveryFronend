import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { Data, AppService } from '../../../app.service';
import { Settings, AppSettings } from '../../../app.settings';
@Component({
  selector: 'app-top-menu2',
  templateUrl: './top-menu2.component.html',
  styleUrls: ['./top-menu2.component.scss']
})
export class TopMenu2Component implements OnInit {

  public currencies = ['USD', 'EUR'];
  public currency:any;
  public isLogin: boolean = false;
  public  currentUser: any;
  public flags = [
    { name:'English', image: 'assets/images/flags/gb.svg' },
    { name:'German', image: 'assets/images/flags/de.svg' },
    { name:'French', image: 'assets/images/flags/fr.svg' },
    { name:'Russian', image: 'assets/images/flags/ru.svg' },
    { name:'Turkish', image: 'assets/images/flags/tr.svg' }
  ]
  public flag:any;
  public settings: Settings;
  constructor(public appSettings:AppSettings, public appService:AppService,private tokenStorageService: TokenStorageService) { 
    this.settings = this.appSettings.settings; 
  } 

  ngOnInit() {
    this.currentUser = this.tokenStorageService.getUser();
    this.currency = this.currencies[0];
    this.flag = this.flags[0];   
     
  }

  public changeCurrency(currency){
    this.currency = currency;
  }

  public changeLang(flag){
    this.flag = flag;
  }
  logout() {
    this.tokenStorageService.signOut();
    localStorage.setItem('isLoggedInClient',"false");
    window.location.reload();
  }
}
