import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SubSink } from 'subsink';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  
  signInForm: any;
  hide = true;
  subSink = new SubSink();

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router){}


  ngOnInit(){
    this.createForm();
  }

  ngOnDestroy(){
    this.subSink.unsubscribe()
  }
  
  createForm() {
    this.signInForm = this.formBuilder.group({
        email : [, Validators.compose([
          Validators.email,
          Validators.required
        ])],
        password : [, Validators.compose([
          Validators.required,
          Validators.minLength(8),
        ])],
        function_name : ['userSignin']
    });
  }

  
  isValidInput(fieldName: any): boolean {
    return this.signInForm.controls[fieldName].invalid && (this.signInForm.controls[fieldName].dirty || this.signInForm.controls[fieldName].touched);
  }

  
  reset(){
    this.signInForm.reset();
    this.signInForm.patchValue({
      function_name : ['userSignin'],
    });
  }

  handleLogin(){
    if(this.signInForm.invalid){
      return
    }else{
      this.signInForm.patchValue({
        email: this.signInForm.get('email').value.toLowerCase()
      });
      // console.log(this.signInForm.value);
      this.subSink.add(this.authService.signIn('auth/signin', this.signInForm.value)
        .subscribe((data :any) => {
            // console.log('res data: ',data);
            if(data.success){
              Swal.fire({ icon: 'success', title: 'Log in successfully',  heightAuto: false }).then((result) => {
                // location.reload();
                // this.reset();
                this.router.navigate(['/user'])
              });
            }else{
              Swal.fire({ icon: 'error', title: 'Invalid Entry!', text: data.message , heightAuto: false }).then((result) => {
                // location.reload();
                this.reset();
              }); 
            }
          }
        )
      )
    }


  }
}
