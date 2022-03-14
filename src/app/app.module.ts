import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UserProfilePageComponent } from './components/user-profile-page/user-profile-page.component';
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ExercisePageComponent } from './components/exercise-page/exercise-page.component';
import { SelectedExerciseComponent } from './components/selected-exercise/selected-exercise.component';
import { WorkoutPageComponent } from './components/workout-page/workout-page.component';
import { ProgrammePageComponent } from './components/programme-page/programme-page.component';
import { SelectedWorkoutComponent } from './components/selected-workout/selected-workout.component';
import { GoalDashboardComponent } from './components/goal-dashboard/goal-dashboard.component';
import { GoalDetailsComponent } from './components/goal-details/goal-details.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegistrationPageComponent,
    GoalDashboardComponent,
    GoalDetailsComponent,
    UserProfilePageComponent,
    ExercisePageComponent,
    SelectedExerciseComponent,
    WorkoutPageComponent,
    ProgrammePageComponent,
    SelectedWorkoutComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

