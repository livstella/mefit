import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';


const routes: Routes = [
{path:'', redirectTo:'login', pathMatch:'full'},

{path: 'login', component: LoginPageComponent ,pathMatch:'full'},

{path: 'register', component: RegistrationPageComponent ,pathMatch:'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule { }