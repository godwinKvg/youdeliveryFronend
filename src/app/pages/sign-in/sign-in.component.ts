import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { emailValidator, matchingPasswords } from '../../theme/utils/app-validators';
import { AuthService } from 'src/app/_services/auth.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  role: string;
  constructor(public formBuilder: FormBuilder, public router:Router, public snackBar: MatSnackBar,private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
    localStorage.setItem('isLoggedInClient',"false");
    localStorage.setItem('isLoggedInAdmin',"false");
    localStorage.setItem('isLoggedPartenaire',"false");
    this.loginForm = this.formBuilder.group({
      'email': ['', Validators.compose([Validators.required, emailValidator])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])] 
    });

    this.registerForm = this.formBuilder.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'email': ['', Validators.compose([Validators.required, emailValidator])],
      'phoneNumber': ['',Validators.required],
      'password': ['', Validators.required],
      'confirmPassword': ['', Validators.required]
    },{validator: matchingPasswords('password', 'confirmPassword')});

  }

 /* public onLoginFormSubmit(values:Object):void {
    if (this.loginForm.valid) {
      this.router.navigate(['/']);
    }
  }*/
  public onLoginFormSubmit() {
    console.log(this.loginForm.value.email);
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.roles = this.tokenStorage.getUser().roles;
        console.log(data);
        this.isLoginFailed = false;
        // 
        this.isLoggedIn = true;
        localStorage.setItem('role',data.roles[0]);
        
        switch (data.roles[0]) {
          case "CLIENT_ROLE":
            localStorage.setItem('isLoggedInClient',"true");
            window.location.reload();
            this.router.navigate(['/']);
            break;
          case "LIVREUR_ROLE":
            localStorage.setItem('isLoggedInAdmin',"true");
            this.router.navigate(['/admin']);
              break;
          default:
            localStorage.setItem('isLoggedInPartenaire',"true");
            this.router.navigate(['/partner'])
            break;
        }
        
      },
      err => {
           window.location.reload();
          this.snackBar.open('Identifiant incorrect!', '×', { panelClass: 'danger', verticalPosition: 'top', duration: 3000 });

        this.errorMessage = err.error.message;
        console.log(err);
        this.isLoginFailed = true;
      }
    );
  }

  /*public onRegisterFormSubmit(values:Object):void {
    if (this.registerForm.valid) {
      this.snackBar.open('You registered successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
    }
  }*/
  public onRegisterFormSubmit(){
   /* if (this.registerForm.valid) {
      this.snackBar.open('You registered successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
    }*/
    this.authService.register(this.registerForm.value.name,this.registerForm.value.email,
      this.registerForm.value.phoneNumber,this.registerForm.value.password
      
      ).subscribe(
      data => {
        console.log(data);
        this.snackBar.open('You registered successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
       /* this.isSuccessful = true;
        this.isSignUpFailed = false;*/
      },
      err => {
        this.errorMessage = err.error.message;
       /* this.isSignUpFailed = true;*/
      }
    );
  }

  

}
