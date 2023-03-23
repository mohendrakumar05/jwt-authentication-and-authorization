import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, tap, map } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private helper: JwtHelperService, private router: Router) { }

  signUp(functionName: any, data : any){
    return this.http.post(environment.apiUrl + functionName, data).pipe(
      tap(res => res),
      catchError(e => {
        throw new Error(e)
      })
    );
  }

  signIn(functionName: any, data: any){
    return this.http.post(environment.apiUrl + functionName, data).pipe(
      map((res: any) => {
        const result = res;
        if (result.success && result.token) {
          localStorage.setItem('token', result.token);
        }
        return res;
      }),
      catchError(e => {
        throw new Error(e)
      })
    );
  }


  isUserLoggedIn(): boolean{
    var token = localStorage.getItem('token');
    if(token){
      return true
    }else{
      return false
    }
  }


  
  get currentUser() {
    const token = localStorage.getItem('token');
    if (token) {
      const isExpired = this.helper.isTokenExpired(token);
      if (!isExpired) {
        return this.helper.decodeToken(token);
      } else {
        this.logout();
      }
    }
  }


  logout() {
    const token = localStorage.getItem('token');
    if (token) {
      const isExpired = this.helper.isTokenExpired(token);
      if (!isExpired) {
        // let login_history_id = this.currentUser.login_history_id;
        // let login_id = this.currentUser.login_id;
        // this.cms.get('common/getFunction/logout/' + login_history_id + '/' + login_id).subscribe((response: any) => {
        //   if(response){
            localStorage.removeItem('token');
            this.router.navigate(['/auth']);
        //   }
        // });
      }
    } else {
      this.router.navigate(['/auth']);
    }
  }

  
}
