import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardAdminService {

  constructor(private router: Router) { }      
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {      
     if (this.isLoggedInAdmin()) {      
        return true;      
     }      
     // navigate to login page as user is not authenticated      
    this.router.navigate(['/sign-in']);      
    return false;      
}      
public isLoggedInAdmin(): boolean {      
  let status = false;      
  if (localStorage.getItem('isLoggedInAdmin') == "true") {      
     status = true;      
  }    
  else {      
     status = false;      
     }      
  return status;      
  }
}
