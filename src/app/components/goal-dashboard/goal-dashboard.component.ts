import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { GoalDashbordService } from 'src/app/services/goal-dashbord.service';
import { exercisePageService } from 'src/app/services/exercise-page.service';
import { Exercise } from 'src/app/models/exercise.model';
import { Workout } from 'src/app/models/workout.model';
import { WorkoutPageService } from 'src/app/services/workout-page.service';
import { ProgrammePageService } from 'src/app/services/programme-page.service';
import { Programme } from 'src/app/models/programme.model';
import { StartTimerComponent } from '../goal-dashboard-child-components/start-timer/start-timer.component';


@Component({
  selector: 'app-goal-dashboard',
  templateUrl: './goal-dashboard.component.html',
  styleUrls: ['./goal-dashboard.component.css']
})
export class GoalDashboardComponent implements OnInit {

  //---start-timer link
  @ViewChild(StartTimerComponent, {static : true}) startTimer : StartTimerComponent | undefined;

  username: string = JSON.parse(sessionStorage.getItem("current-user")||'{}').firstName
  
  //---Strings to be displayed in html
  dayOne: string = ''; 
  dayTwo: string ='';
  dayThree: string ='';
  dayFour: string ='';
  dayFive: string ='';
  daySix: string ='';
  daySeven: string ='';

  //---dates from 7 day head and 7 days behind
  mtwoDate = new Date();
  mthreeDate = new Date();
  mfourDate = new Date();
  mfiveDate = new Date();
  msixDate = new Date();
  msevenDate = new Date();
  oneDate = new Date();
  twoDate = new Date();
  threeDate = new Date();
  fourDate = new Date();
  fiveDate = new Date();
  sixDate = new Date();
  sevenDate = new Date();

  //---For exercises
  ex: string = '';
  ex_ids: number[] = [];
  ex_id: number | undefined;
  ex_choice_map_name = new Map();
  ex_finish_map_name = new Map();

  //---exercise program per day
  program_ex_map_name = new Map();
  program_ex_map_name2 = new Map();
  program_ex_map_name3 = new Map();
  program_ex_map_name4 = new Map();
  program_ex_map_name5 = new Map();
  program_ex_map_name6 = new Map();
  program_ex_map_name7 = new Map();

  //---initial exercise program per day
  program_ex_map_name_in = new Map();
  program_ex_map_name_in2 = new Map();
  program_ex_map_name_in3 = new Map();
  program_ex_map_name_in4 = new Map();
  program_ex_map_name_in5 = new Map();
  program_ex_map_name_in6 = new Map();
  program_ex_map_name_in7 = new Map();

  //---Commits logged an commits finished
  dayCommit = new Map(); 
  dayCommitInitial = new Map();
  
  //---workout id
  workout_ids: number[] = [];
  workout_id: number | undefined;

  //---program id
  program_ids: number[] = [];
  program_id: number | undefined;

  //---programs, workouts, exercises and their repititions
  repititions: number | undefined;
  exercises_choosen: Exercise[] | undefined | any;
  program_exercises_choosen: Exercise[] | undefined | any;
  workouts_choosen: Workout[] | undefined | any;

  //---Used to calculated progress
  //---exercises finished and exercises initially commited to 
  //---per day and per week
  sumExCommited: number = 0;
  sumExInitial = 0;
  weeklyFinish: number | string | undefined;
  weeklyGoal = 0;

  //---progress percentage for day and week
  weeklyProgress: number | string | undefined = 0;
  dailyProgress: number | string | undefined = 0;
  weeklyProgress_display: number | string | undefined = 0;
  dailyProgress_display: number | string | undefined = 0;

  //---timer components
  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  countDownDate: number = 0;

  //---not in use yet
  body: any|undefined;
  timeStamp: any|undefined;
  message: string | undefined;

  constructor(private router: Router, private readonly goalDashBoardService: GoalDashbordService ,private readonly exercisePageService :exercisePageService, private readonly workoutPageService: WorkoutPageService, private readonly programPageService: ProgrammePageService) { }

  ngOnInit(): void {
  
    //---get weekly submitted progress from local storage
   
    if(localStorage.getItem("weekly_finish")){


      this.weeklyFinish = Number(localStorage.getItem("weekly_finish"))
      this.weeklyGoal = Number(localStorage.getItem("weekly_goal"))
      
      this.weeklyProgress = Number((this.weeklyFinish/this.weeklyGoal)*100).toFixed(2);
      
      if (Number(this.weeklyProgress) < 100){
          this.weeklyProgress_display = this.weeklyProgress +" percent finished of your weekly goal!";
      }else if(Number(this.weeklyProgress) >= 100){
          this.weeklyProgress_display = "You finished of your weekly goal!";
      }
    }

    //---get daily submitted progress from local storage
    if(localStorage.getItem("daily_finish")){

      this.sumExCommited = Number(localStorage.getItem("daily_finish"))
      this.sumExInitial = Number(localStorage.getItem("daily_initial_commit"))
   
      this.dailyProgress = Number((this.sumExCommited/this.sumExInitial)*100).toFixed(2);

    if (Number(this.dailyProgress) < 100){
      this.dailyProgress_display = this.dailyProgress +" percent finished of you daily goal!";
    }else if(Number(this.dailyProgress) >= 100){
      this.dailyProgress_display = "You finished of your daily goal!";
    }
  }
  
  //---set dates
    this.mtwoDate.setDate(this.oneDate.getDate()-1);
    this.mthreeDate.setDate(this.oneDate.getDate()-2);
    this.mfourDate.setDate(this.oneDate.getDate()-3);
    this.mfiveDate.setDate(this.oneDate.getDate()-4);
    this.msixDate.setDate(this.oneDate.getDate()-5);
    this.msevenDate.setDate(this.oneDate.getDate()-6);

    this.twoDate.setDate(this.oneDate.getDate()+1);
    this.threeDate.setDate(this.oneDate.getDate()+2);
    this.fourDate.setDate(this.oneDate.getDate()+3);
    this.fiveDate.setDate(this.oneDate.getDate()+4);
    this.sixDate.setDate(this.oneDate.getDate()+5);
    this.sevenDate.setDate(this.oneDate.getDate()+6);

    //---display dates
    this.dayOne = this.oneDate.getFullYear()+"-"+(this.oneDate.getMonth()+1)+"-"+this.oneDate.getDate()
    this.dayTwo = this.twoDate.getFullYear()+"-"+(this.twoDate.getMonth()+1)+"-"+this.twoDate.getDate()
    this.dayThree = this.threeDate.getFullYear()+"-"+(this.threeDate.getMonth()+1)+"-"+this.threeDate.getDate()
    this.dayFour = this.fourDate.getFullYear()+"-"+(this.fourDate.getMonth()+1)+"-"+this.fourDate.getDate()
    this.dayFive = this.fiveDate.getFullYear()+"-"+(this.fiveDate.getMonth()+1)+"-"+this.fiveDate.getDate()
    this.daySix = this.sixDate.getFullYear()+"-"+(this.sixDate.getMonth()+1)+"-"+this.sixDate.getDate()
    this.daySeven = this.sevenDate.getFullYear()+"-"+(this.sevenDate.getMonth()+1)+"-"+this.sevenDate.getDate()

    //---Fetch all exercises
    this.exercisePageService.fetchExercise();

    //---Fetch all workouts
    this.workoutPageService.fetchWorkout();

    // //---Fetch all programs
    this.programPageService.fetchProgramme();
 
    //---If a goal has allready been commited too.
    if(localStorage.getItem('day1commit')!=null){

      //---get all daily goals of the week
      this.program_ex_map_name = new Map(JSON.parse(localStorage.getItem("day1commit")||'{}'));
      this.program_ex_map_name2 = new Map(JSON.parse(localStorage.getItem("day2commit")||'{}'));
      this.program_ex_map_name3 = new Map(JSON.parse(localStorage.getItem("day3commit")||'{}'));
      this.program_ex_map_name4 = new Map(JSON.parse(localStorage.getItem("day4commit")||'{}'));
      this.program_ex_map_name5 = new Map(JSON.parse(localStorage.getItem("day5commit")||'{}'));
      this.program_ex_map_name6 = new Map(JSON.parse(localStorage.getItem("day6commit")||'{}'));
      this.program_ex_map_name7 = new Map(JSON.parse(localStorage.getItem("day7commit")||'{}'));
      
      //---Get initial goals
      this.program_ex_map_name_in = new Map(JSON.parse(localStorage.getItem("day1commitInitial")||'{}'));
      this.program_ex_map_name_in2 = new Map(JSON.parse(localStorage.getItem("day2commitInitial")||'{}'));
      this.program_ex_map_name_in3 = new Map(JSON.parse(localStorage.getItem("day3commitInitial")||'{}'));
      this.program_ex_map_name_in4 = new Map(JSON.parse(localStorage.getItem("day4commitInitial")||'{}'));
      this.program_ex_map_name_in5 = new Map(JSON.parse(localStorage.getItem("day5commitInitial")||'{}'));
      this.program_ex_map_name_in6 = new Map(JSON.parse(localStorage.getItem("day6commitInitial")||'{}'));
      this.program_ex_map_name_in7 = new Map(JSON.parse(localStorage.getItem("day7commitInitial")||'{}'));

      // //---start timer
      this.countDownDate = Number(localStorage.getItem("countdown_timer"))
      this.callTimer(this.countDownDate)
      
  }
    
}   
  //---get exercises
  get exercises(): Exercise[] {
    return this.exercisePageService.exercise();
  }

  //---get workouts
  get workouts(): Workout[] {
    return this.workoutPageService.workout();
  }

  //---get programmes
  get programmes(): Programme[] {
    return this.programPageService.programme();
  }

  //---receive exercise choices from child
  newChoiceMap(map: any){
    this.ex_choice_map_name = map;
  }

  //---receieved logged exercises from child
  newFinishMap(map: any){
    this.ex_finish_map_name = map;
  }
  

  //---Weekly goals
  day1_program(map: any){
    this.program_ex_map_name= map;
  }
  day2_program(map: any){
    this.program_ex_map_name2= map;
  }
  day3_program(map: any){
    this.program_ex_map_name3= map;
  }
  day4_program(map: any){
    this.program_ex_map_name4= map;
  }
  day5_program(map: any){
    this.program_ex_map_name5= map;
  }
  day6_program(map: any){
    this.program_ex_map_name6= map;
  }
  day7_program(map: any){
    this.program_ex_map_name7= map;
  }

  //---progress
  daily_progress(value: number){
    this.dailyProgress=value
  }
  daily_progress_display(value: number){
    this.dailyProgress_display=value
  }
  weekly_progress(value: number){
    this.weeklyProgress=value
  }
  sumExerciseInitial(value:number){
    this.sumExInitial = value
  }

  //---commits
  dayCommits(value: any){
    this.dayCommit = value
  }
  dayCommitsInitial(value: any){
    this.dayCommitInitial = value
  }


  //---Button to clear week
  clearweek(){
    this.program_ex_map_name.clear();
    this.program_ex_map_name2.clear();
    this.program_ex_map_name3.clear();
    this.program_ex_map_name4.clear();
    this.program_ex_map_name5.clear();
    this.program_ex_map_name6.clear();
    this.program_ex_map_name7.clear();
  }

  //---go to details page
 toGoalDetails(){
    this.router.navigateByUrl('/goaldetails');
  }

  //---clear goal and refresh page
  unCommitGoal(){

    //---clear localstorage
    localStorage.removeItem("day1commit");
    localStorage.removeItem("day2commit");
    localStorage.removeItem("day3commit");
    localStorage.removeItem("day4commit");
    localStorage.removeItem("day5commit");
    localStorage.removeItem("day6commit");
    localStorage.removeItem("day7commit");
    localStorage.removeItem("day1commitInitial");
    localStorage.removeItem("day2commitInitial");
    localStorage.removeItem("day3commitInitial");
    localStorage.removeItem("day4commitInitial");
    localStorage.removeItem("day5commitInitial");
    localStorage.removeItem("day6commitInitial");
    localStorage.removeItem("day7commitInitial");

    localStorage.removeItem("countdown_timer");
    localStorage.removeItem("daily_finish");
    localStorage.removeItem("daily_initial_commit");
    localStorage.removeItem("weekly_finish");
    localStorage.removeItem("weekly_goal"); 

    location.reload();
  }

  callTimer(value:number){
    this.startTimer?.startTimer(value)
  }

}

