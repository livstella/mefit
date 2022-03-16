import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  email: string = "";
  password: string = "";

  @Input() login: Login | undefined;
  @Output() onUserLogin: EventEmitter<Login> = new EventEmitter()

  public users: Login[] | undefined;


  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {

  }

  //---when button is clicked, username is checked
  onSubmit() {
    if (this.email == "") {
      alert("Please enter an email to continue...")
      return
    }
    else if(this.password == ""){
      alert("Please enter a password to continue...")
      return
    }
    else {
      this.onNavigate();
      }
    }

  onNavigate() {
      //---search for user
      //---if none is found -> redirect to registration page
      this.loginService.queryUser(this.email).subscribe((res: Login[]) => {
        if (res == null) {
            this.router.navigateByUrl('/register');
          }
        //---if found -> register in local storage
        else if(res != null && (JSON.parse(JSON.stringify(res)).password==this.password)) {
          this.users = res
          sessionStorage.setItem("current-user", JSON.stringify(this.users))
          this.router.navigateByUrl('/dashboard');
        }
        else{
          alert("Password is incorrect!")
        }
      })
    }

    toRegister(){
      this.router.navigateByUrl('/register');
    }
}
