import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommonService {


  constructor(private http: HttpClient) { }

  save(functionName: any, data: any){
    return this.http.post(environment.apiUrl + functionName, data).pipe(
      tap(res => res), 
      catchError(e => {
        throw new Error(e)
      }));
  }

  
  // update data
  update(funtionName: any, data: any) {
    return this.http.put(environment.apiUrl + funtionName, data).pipe(tap(res => { res }),
      catchError(e => {
        throw new Error(e);
      })
    );
  }

  // get data
  get(functionName: any) {
    return this.http.get(environment.apiUrl + functionName).pipe(tap(res => res), catchError(e => {
      throw new Error(e);
    }));
  }

  // delete records
  delete(functionName: any) {
    return this.http.delete(environment.apiUrl + functionName).pipe(tap(res => res), catchError(e => {
      throw new Error(e);
    }));
  }

  // for multiple params
  getWithParams(functionName: any, params: any) {
    const url = environment.apiUrl + functionName + '?' + params;
    return this.http.get(url).pipe(tap(res => res), catchError(e => {
      throw new Error(e);
    }));
  }


  public filterSearch(event: Event, data: any = []){
    const filterValue = (event.target as HTMLInputElement).value;
    data.filter = filterValue.trim().toLowerCase();
    if (data.paginator) {
      data.paginator.firstPage();
    }
  }
  
}
