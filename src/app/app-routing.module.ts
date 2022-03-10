import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { ExercisePageComponent } from './components/exercise-page/exercise-page.component';
import { WorkoutPageComponent } from './components/workout-page/workout-page.component';
import { ProgrammePageComponent } from './components/programme-page/programme-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginPageComponent, pathMatch: 'full' },

  { path: 'register', component: RegistrationPageComponent, pathMatch: 'full' },

  { path: 'exercises', component: ExercisePageComponent, pathMatch: 'full' },
  
  { path: 'workouts', component: WorkoutPageComponent, pathMatch: 'full' },

  { path: 'programmes', component: ProgrammePageComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
