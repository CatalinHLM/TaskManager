import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { UserService } from '../services/user.service';
import { SnackbarService } from '../services/snackbar.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormGroup } from '@angular/forms'
import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { GlobalContants } from '../shared/global-constant';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  signupForm: any = FormGroup;
  responseMessage: any;


  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private snackbarService: SnackbarService,
    private dialogRef: MatDialogRef<SignupComponent>,
    private ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username: [null, [Validators.required, Validators.pattern(GlobalContants.usernameRegex)]],
      email: [null, [Validators.required, Validators.pattern(GlobalContants.emailRegex)]],
      password: [null, Validators.required]
    })
  }

  handleSubmit() {
    this.ngxService.start();
    var formData = this.signupForm.value;
    var data = {
      username: formData.username,
      email: formData.email,
      password: formData.password
    }
    this.userService.signup(data).subscribe((response: any) => {
      this.ngxService.stop();
      this.dialogRef.close();
      this.responseMessage = response?.message;
      this.snackbarService.openSnackBar(this.responseMessage, "");
      this.router.navigate(['/']);
    }, (error) => {
      this.ngxService.stop();
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      }
      else {
        this.responseMessage = GlobalContants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalContants.error);
    })
  }

}
