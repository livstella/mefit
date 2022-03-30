import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login.model';
import { LoginService } from 'src/app/services/login.service';
import * as shajs from 'sha.js';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {

  email: string = "";
  firstname: string = "";
  lastname: string = "";
  password1: string = "";
  password2: string = "";
  hash: any;
  
  @Input() login: Login | undefined;
  @Output() onUserLogin: EventEmitter<Login> = new EventEmitter()

  public users: Login[] | undefined;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  //---when button is clicked, username is checked
  onSubmit() {
    if (this.email == "") {
      alert("Please enter a username to continue...")
      return
    }
    else if(this.firstname == ""){
      alert("Please enter a first name to continue...")
      return
    }
    else if(this.lastname == ""){
      alert("Please enter a last name to continue...")
      return
    }
    else if(this.password1 == ""){
      alert("Please enter a password to continue...")
      return
    }
    else if(this.password2 == ""){
      alert("Please enter a password in both fields to continue...")
     return
    }
    else if(this.password1 != this.password2){
      alert("Password in both fields must match!")
     return
    }
    else {
      this.onNavigate();
    }
  }
  
  onNavigate(){

    //---hash password
    this.hash = shajs('sha256').update(this.password1).digest('hex');

    //---check if user already exists 
    this.loginService.queryUser(this.email).subscribe((res: Login[]) => {
      if (res != null) {
        alert("This user allready exists!");
        this.router.navigateByUrl('/login');

      //---if not save in database
      }else{
      this.loginService.setUserToApi(this.email, this.firstname, this.lastname, this.hash).subscribe((res: Login[]) => {
        sessionStorage.setItem("current-user", JSON.stringify(res))
        this.router.navigateByUrl('/dashboard');
        })
      }
    })
}
}

