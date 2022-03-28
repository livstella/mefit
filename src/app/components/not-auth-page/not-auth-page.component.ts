import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-auth-page',
  templateUrl: './not-auth-page.component.html',
  styleUrls: ['./not-auth-page.component.css']
})
export class NotAuthPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {

  }
  onSubmit(){
    this.router.navigateByUrl('/login');

}
}
