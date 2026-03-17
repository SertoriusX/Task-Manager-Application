import { HttpClient } from '@angular/common/http';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { RegisterModel } from '../../models/AuthModel/register-model';
import { Observable } from 'rxjs';
import { AuthResponseModel } from '../../models/AuthResponseModel/auth-response-model';
import { LoginModel } from '../../models/AuthModel/login-model';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private backUrl=`${environment.apiUrl}/Auth`
  private platformId = inject(PLATFORM_ID);
  constructor(private http:HttpClient){}

  register(dto:RegisterModel):Observable<AuthResponseModel>{
    return this.http.post<AuthResponseModel>(`${this.backUrl}/register`,dto)
  }
  login(dto:LoginModel):Observable<AuthResponseModel>{
    return this.http.post<AuthResponseModel>(`${this.backUrl}/login`,dto)
  }
  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem("token");
    }
    return null;
  }
  saveToken(token:string){
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.setItem("token",token)
    }
  }
  logout(){
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.removeItem("token")
    }
  }
}
