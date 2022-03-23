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
import { SelectedProgrammeComponent } from './components/selected-programme/selected-programme.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { exercisePageService } from './services/exercise-page.service';
import { LoginService } from './services/login.service';
import { MefitGuardService } from './services/mefit-guard.service';
import { ProgrammePageService } from './services/programme-page.service';
import { SelectedExerciseService } from './services/selected-exercise.service';
import { SelectedWorkoutService } from './services/selected-workout.service';
import { userProfileService } from './services/user-profile-page.service';
import { WorkoutPageService } from './services/workout-page.service';
import { NavbarComponent } from './components/navbar/navbar.component';



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
    SelectedWorkoutComponent,
    SelectedProgrammeComponent,
    NotFoundPageComponent,
    NavbarComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [exercisePageService, LoginService, ProgrammePageService, SelectedExerciseService, SelectedWorkoutService, userProfileService, WorkoutPageService, MefitGuardService ],
  bootstrap: [AppComponent]
})
export class AppModule { }

