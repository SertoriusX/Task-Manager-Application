import { Component } from '@angular/core';
import { AuthService } from '../../service/AuthService/auth-service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { RegisterModel } from '../../models/AuthModel/register-model';

@Component({
  selector: 'app-register-page',
  imports: [FormsModule, RouterModule],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css',
})
export class RegisterPage {
   constructor(private regService:AuthService,private router:Router){}

  createUser(form:NgForm){
    const dto:RegisterModel=form.value;
    this.regService.register(dto).subscribe({
      next:(res)=>{
             this.router.navigate(['/login']);
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
}
