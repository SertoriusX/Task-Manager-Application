import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../service/AuthService/auth-service';
import { LoginModel } from '../../models/AuthModel/login-model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-page',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  constructor(private logService: AuthService,private route:Router){}
  login(form:NgForm){
        const dto:LoginModel=form.value;
        this.logService.login(dto).subscribe({
          next:(res)=>{
            if (!res.token) {
              alert("Login failed: token not returned from server");
              return;
            }
            this.logService.saveToken(res.token)
            
            console.log('Token:', res.token);
            this.route.navigate(['/board'])
            
          },
           error:(err)=>{
        console.error('Login failed:', err);
        alert('Login failed: Check credentials');          
        }
        })
    
  }
}
