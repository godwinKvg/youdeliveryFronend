import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardPartenaireService {
  constructor(private router: Router) { }      
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {      
     if (this.isLoggedInPartenaire()) {      
        return true;      
     }      
     // navigate to login page as user is not authenticated      
    this.router.navigate(['/sign-in']);      
    return false;      
}      
public isLoggedInPartenaire(): boolean {      
  let status = false;      
  if (localStorage.getItem('isLoggedInPatenaire') == "true") {      
     status = true;      
  }    
  else {      
     status = false;      
     }      
  return status;      
  }
}
