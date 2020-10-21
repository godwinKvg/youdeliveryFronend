import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { emailValidator, matchingPasswords } from '../../../theme/utils/app-validators';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {
  infoForm: FormGroup;
  passwordForm: FormGroup;
  currentUser: any;
  constructor(public formBuilder: FormBuilder, public snackBar: MatSnackBar, private token: TokenStorageService) { }

  ngOnInit() {
    this.currentUser = this.token.getUser();
    this.infoForm = this.formBuilder.group({
      'fullname': [this.currentUser.fullname, Validators.compose([Validators.required, Validators.minLength(3)])],
      'phoneNumber': [this.currentUser.phoneNumber, Validators.compose([Validators.required, Validators.minLength(9)])],
      'username': [this.currentUser.username, Validators.compose([Validators.required, emailValidator])]
    });

    this.passwordForm = this.formBuilder.group({
      'currentPassword': ['', Validators.required],
      'newPassword': ['', Validators.required],
      'confirmNewPassword': ['', Validators.required]
    },{validator: matchingPasswords('newPassword', 'confirmNewPassword')});
  }

  public onInfoFormSubmit(values:Object):void {
    if (this.infoForm.valid) {
      this.snackBar.open('Your account information updated successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
    }
  }

  public onPasswordFormSubmit(values:Object):void {
    if (this.passwordForm.valid) {
      this.snackBar.open('Your password changed successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
    }
  }

}
