import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public lat: number = 14.707312049597947;
  public lng: number = -17.43054199218749;
  public zoom: number = 12;

  constructor() { }

  ngOnInit() { }

  subscribe(){ }

}