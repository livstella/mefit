import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {

  username: string = "";
  password: string = "";

  @Input() login: Login | undefined;
  @Output() onUserLogin: EventEmitter<Login> = new EventEmitter()

  public users: Login[] | undefined;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  //---when button is clicked, username is checked
  onSubmit() {
    if (this.username == "") {
      alert("Please enter a username to continue...")
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
  
  onNavigate(){
      this.loginService.setUserToApi(this.username, this.password).subscribe((res: Login[]) => {
        sessionStorage.setItem("current-user", JSON.stringify([res]))
        this.router.navigateByUrl('/profile');
        })
      }
  }

