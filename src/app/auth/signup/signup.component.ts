import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import * as moment from 'moment';
import { CommonService } from 'src/app/services/common.service';
import Swal from 'sweetalert2';
import { SubSink } from 'subsink';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements  OnInit, OnDestroy {
  
  signUpForm: any;
  hide = true;
  c_hide = true;
  subSink = new SubSink();

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router){}


  ngOnInit(){
    this.createForm();
  }

  ngOnDestroy(){
    this.subSink.unsubscribe()
  }

  createForm() {
    this.signUpForm = this.formBuilder.group({
        first_name : [,Validators.required],
        last_name : [,Validators.required],
        email : [, Validators.compose([
          Validators.email,
          Validators.required
        ])],
        password : [, Validators.compose([
          Validators.required,
          Validators.minLength(8),
        ])],
        // c_password : [, Validators.compose([
        //   Validators.required, 
        // ])],
        function_name : ['userSignup']
    },

    );
  }


  isValidInput(fieldName: any): boolean {
    return this.signUpForm.controls[fieldName].invalid && (this.signUpForm.controls[fieldName].dirty || this.signUpForm.controls[fieldName].touched);
  }

  
  reset(){
    this.signUpForm.reset();
    this.signUpForm.patchValue({
      function_name : ['userSignup'],
    });
  }

  
  saveUserFormData() {
    // console.log(this.signUpForm.value);
    if(this.signUpForm.invalid){
      return
    }else{
      this.signUpForm.patchValue({
        email: this.signUpForm.get('email').value.toLowerCase()
      });
      // console.log(this.signUpForm.value);
      this.subSink.add(this.authService.signUp('auth/signup', this.signUpForm.value)
        .subscribe((data :any) => {
            // console.log("data", data);
            // console.log(data.success);
            if(data.success){
              Swal.fire({ icon: 'success', title: 'Sign Up',text: 'Created Successfully', heightAuto: false }).then((result) => {
                // location.reload();
                this.reset();
                this.router.navigate(['/auth']);

              });
            }else{
              Swal.fire({ icon: 'error', title: 'Sign Up', text: data.message, heightAuto: false }).then((result) => {
                // this.reset();
              });
            }
          }
        )
      )
    }
  }


}
