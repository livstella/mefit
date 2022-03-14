import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { ExercisePageComponent } from './components/exercise-page/exercise-page.component';
import { WorkoutPageComponent } from './components/workout-page/workout-page.component';
import { ProgrammePageComponent } from './components/programme-page/programme-page.component';
import { UserProfilePageComponent } from './components/user-profile-page/user-profile-page.component';
import { GoalDashboardComponent } from './components/goal-dashboard/goal-dashboard.component';
import { GoalDetailsComponent } from './components/goal-details/goal-details.component';



const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginPageComponent, pathMatch: 'full' },

  { path: 'register', component: RegistrationPageComponent, pathMatch: 'full' },

  { path: 'exercises', component: ExercisePageComponent, pathMatch: 'full' },
  
  { path: 'workouts', component: WorkoutPageComponent, pathMatch: 'full' },

  { path: 'programmes', component: ProgrammePageComponent, pathMatch: 'full' },

  { path: 'profile', component: UserProfilePageComponent ,pathMatch:'full'},

  {path: 'dashboard', component: GoalDashboardComponent ,pathMatch:'full'},

  {path: 'goaldetails', component: GoalDetailsComponent ,pathMatch:'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
