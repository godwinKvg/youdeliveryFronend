import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email,password): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username: email,
      password: password
    }, httpOptions);
  }

  register(fullname,email,phoneNumber,password): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username: email,
      fullname: fullname,
      phoneNumber: phoneNumber,
      password: password
    }, httpOptions);
  }
}
