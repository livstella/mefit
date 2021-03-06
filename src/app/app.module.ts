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
import { Day1ButtonsComponent } from './components/goal-dashboard-child-components/day1-buttons/day1-buttons.component';
import { Day2ButtonsComponent } from './components/goal-dashboard-child-components/day2-buttons/day2-buttons.component';
import { Day3ButtonsComponent } from './components/goal-dashboard-child-components/day3-buttons/day3-buttons.component';
import { Day4ButtonsComponent } from './components/goal-dashboard-child-components/day4-buttons/day4-buttons.component';
import { Day5ButtonsComponent } from './components/goal-dashboard-child-components/day5-buttons/day5-buttons.component';
import { Day6ButtonsComponent } from './components/goal-dashboard-child-components/day6-buttons/day6-buttons.component';
import { Day7ButtonsComponent } from './components/goal-dashboard-child-components/day7-buttons/day7-buttons.component';
import { WorkoutOfTheDayButtonsComponent } from './components/goal-dashboard-child-components/workout-of-the-day-buttons/workout-of-the-day-buttons.component';
import { WorkoutOfTheDayOptionsComponent } from './components/goal-dashboard-child-components/workout-of-the-day-options/workout-of-the-day-options.component';
import { PickingProgramComponent } from './components/goal-dashboard-child-components/picking-program/picking-program.component';
import { Day1ProgramComponent } from './components/goal-dashboard-child-components/day1-program/day1-program.component';
import { Day2ProgramComponent } from './components/goal-dashboard-child-components/day2-program/day2-program.component';
import { Day3ProgramComponent } from './components/goal-dashboard-child-components/day3-program/day3-program.component';
import { Day4ProgramComponent } from './components/goal-dashboard-child-components/day4-program/day4-program.component';
import { Day5ProgramComponent } from './components/goal-dashboard-child-components/day5-program/day5-program.component';
import { Day6ProgramComponent } from './components/goal-dashboard-child-components/day6-program/day6-program.component';
import { Day7ProgramComponent } from './components/goal-dashboard-child-components/day7-program/day7-program.component';
import { CommitFinishComponent } from './components/goal-dashboard-child-components/commit-finish/commit-finish.component';
import { StartTimerComponent } from './components/goal-dashboard-child-components/start-timer/start-timer.component';
import { CommitGoalComponent } from './components/goal-dashboard-child-components/commit-goal/commit-goal.component';
import { NotAuthPageComponent } from './components/not-auth-page/not-auth-page.component';



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
    NavbarComponent,
    Day1ButtonsComponent,
    Day2ButtonsComponent,
    Day3ButtonsComponent,
    Day4ButtonsComponent,
    Day5ButtonsComponent,
    Day6ButtonsComponent,
    Day7ButtonsComponent,
    WorkoutOfTheDayButtonsComponent,
    WorkoutOfTheDayOptionsComponent,
    PickingProgramComponent,
    Day1ProgramComponent,
    Day2ProgramComponent,
    Day3ProgramComponent,
    Day4ProgramComponent,
    Day5ProgramComponent,
    Day6ProgramComponent,
    Day7ProgramComponent,
    CommitFinishComponent,
    StartTimerComponent,
    CommitGoalComponent,
    NotAuthPageComponent

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

