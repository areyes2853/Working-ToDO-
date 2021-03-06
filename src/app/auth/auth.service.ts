import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AuthData } from '../auth/auth-data/auth-data.module';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { toDate } from '@angular/common/src/i18n/format_date';
import { DateAdapter } from '@angular/material';

@Injectable({ providedIn: 'root' })

export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();
  private UserId: string;

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getisAuth() {
    return this.isAuthenticated;
  }
  getUserId() {
   return this.UserId;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(email: string, password: string) {
    const authData: AuthData = {email: email, password: password};
    this.http.post('http://localhost:3000/api/user/signup', authData)
      .subscribe(response => {
        this.router.navigate(['create']);
        console.log(response);
      });
  }

  login(email: string, password: string) {
    const authData: AuthData = {email: email, password: password};
    this.http.post<{token: string, expiresIn: number, userId: string }>('http://localhost:3000/api/user/login', authData)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.UserId = response.userId;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          console.log(expirationDate);
          this.saveAuthData(token, expirationDate, this.UserId);
          this.router.navigate(['/']);
        }
      });
  }

  private setAuthTimer(duration: number) {
    console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logOut();
    }, duration * 1000);
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();

    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.UserId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }



logOut() {
this.token = null;
this.isAuthenticated = false;
this.authStatusListener.next(false);
clearTimeout(this.tokenTimer);
this.clearAuthData();
this.UserId = null;
this.router.navigate(['/']);

}
private saveAuthData(token: string, expirationDate: Date, userId: string ) {
  localStorage.setItem('token', token);
  localStorage.setItem('expiration', expirationDate.toISOString());
  localStorage.setItem('userId', userId);

}
private clearAuthData() {
  localStorage.removeItem('token');
  localStorage.removeItem('expiration');
  localStorage.removeItem('userId');
}

private getAuthData() {
  const token = localStorage.getItem('token');
  const expirationDate = localStorage.getItem('expiration');
  const userId = localStorage.getItem('userId');
  if (!token || !expirationDate) {
    return;
  }
  return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
  };
}
}
