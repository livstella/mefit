import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { GoalDashbordService } from 'src/app/services/goal-dashbord.service';
import { exercisePageService } from 'src/app/services/exercise-page.service';
import { Exercise } from 'src/app/models/exercise.model';
import { Workout } from 'src/app/models/workout.model';
import { WorkoutPageService } from 'src/app/services/workout-page.service';
import { ProgrammePageService } from 'src/app/services/programme-page.service';
import { Programme } from 'src/app/models/programme.model';


@Component({
  selector: 'app-goal-dashboard',
  templateUrl: './goal-dashboard.component.html',
  styleUrls: ['./goal-dashboard.component.css']
})
export class GoalDashboardComponent implements OnInit {

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
      this.startTimer()
      
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

  //---commit to build
  commitGoal(){

    //---commit weekly goal to localstorage
    localStorage.setItem("day1commit", JSON.stringify(Array.from(this.program_ex_map_name.entries())))
    localStorage.setItem("day2commit", JSON.stringify(Array.from(this.program_ex_map_name2.entries())))
    localStorage.setItem("day3commit", JSON.stringify(Array.from(this.program_ex_map_name3.entries())))
    localStorage.setItem("day4commit", JSON.stringify(Array.from(this.program_ex_map_name4.entries())))
    localStorage.setItem("day5commit", JSON.stringify(Array.from(this.program_ex_map_name5.entries())))
    localStorage.setItem("day6commit", JSON.stringify(Array.from(this.program_ex_map_name6.entries())))
    localStorage.setItem("day7commit", JSON.stringify(Array.from(this.program_ex_map_name7.entries())))
    

    //---weekly goal initials
    this.program_ex_map_name_in = new Map(JSON.parse(JSON.stringify(Array.from(this.program_ex_map_name))))
    this.program_ex_map_name_in2 = new Map(JSON.parse(JSON.stringify(Array.from(this.program_ex_map_name2))))
    this.program_ex_map_name_in3 = new Map(JSON.parse(JSON.stringify(Array.from(this.program_ex_map_name3))))
    this.program_ex_map_name_in4 = new Map(JSON.parse(JSON.stringify(Array.from(this.program_ex_map_name4))))
    this.program_ex_map_name_in5 = new Map(JSON.parse(JSON.stringify(Array.from(this.program_ex_map_name5))))
    this.program_ex_map_name_in6 = new Map(JSON.parse(JSON.stringify(Array.from(this.program_ex_map_name6))))
    this.program_ex_map_name_in7 = new Map(JSON.parse(JSON.stringify(Array.from(this.program_ex_map_name7))))

    //---set to local storage
    localStorage.setItem("day1commitInitial", JSON.stringify(Array.from(this.program_ex_map_name_in.entries())))
    localStorage.setItem("day2commitInitial", JSON.stringify(Array.from(this.program_ex_map_name_in2.entries())))
    localStorage.setItem("day3commitInitial", JSON.stringify(Array.from(this.program_ex_map_name_in3.entries())))
    localStorage.setItem("day4commitInitial", JSON.stringify(Array.from(this.program_ex_map_name_in4.entries())))
    localStorage.setItem("day5commitInitial", JSON.stringify(Array.from(this.program_ex_map_name_in5.entries())))
    localStorage.setItem("day6commitInitial", JSON.stringify(Array.from(this.program_ex_map_name_in6.entries())))
    localStorage.setItem("day7commitInitial", JSON.stringify(Array.from(this.program_ex_map_name_in7.entries())))


     //---start timer
     //---if timer already started, fetch the end date
     //---otherwise set end date
     if(localStorage.getItem("countdown_timer")){
      this.countDownDate = Number(localStorage.getItem("countdown_timer"))
     }else{
      this.countDownDate = new Date().setDate(new Date().getDate()+7);
     }
     this.startTimer();
    }
 

  //---Commit finished excersizes
  commitFinish(){

    //---if week already initialized
    //---get finished repititions 
    if(localStorage.getItem("weekly_finish")){
      this.weeklyFinish = Number(localStorage.getItem("weekly_finish"));
    }else{
      this.weeklyFinish=0;
    }

      
    //---If day already initialized
    //---get get finished repititions 
    if(localStorage.getItem("daily_finish")){
      this.sumExCommited = Number(localStorage.getItem("daily_finish"));
    }else{
      this.sumExCommited = 0;
    }
      
     //---Read through exercises logged ad finish and and to finished repititions
     this.ex_finish_map_name.forEach(value=> {
          this.sumExCommited += value;
          this.weeklyFinish += value;
       });

       localStorage.setItem("daily_finish", this.sumExCommited.toString())

      //---Read through exercises goals
      //---of the day
      if(this.sumExInitial===0){ 

       this.dayCommitInitial.forEach(value => {
          this.sumExInitial += value;
       });}

       //---commit daily goal to local storage
       localStorage.setItem("daily_initial_commit", this.sumExInitial.toString())
      
       //---calculate daily progress
       this.dailyProgress = Number((this.sumExCommited/this.sumExInitial)*100).toFixed(2);

       //---display daily progress
       if (Number(this.dailyProgress) < 100){
          this.dailyProgress_display = this.dailyProgress +" percent finished of your daily goal!";
       }else if(Number(this.dailyProgress) >= 100){
          this.dailyProgress_display = "You finished of your daily goal!";
       }

       //---calculating weekly progress
       //---Fetch weekly goal
       if (this.weeklyGoal === 0){

       if(this.program_ex_map_name_in.size!=0){
        this.program_ex_map_name_in.forEach(value=> {
        this.weeklyGoal += value;
       })}

       if(this.program_ex_map_name_in2.size!=0){
       this.program_ex_map_name_in2.forEach(value=> {
        this.weeklyGoal += value;
       });}

       if(this.program_ex_map_name_in3.size!=0){
       this.program_ex_map_name_in3.forEach(value=> {
        this.weeklyGoal += value;
       });}

       if(this.program_ex_map_name_in4.size!=0){
       this.program_ex_map_name_in4.forEach(value=> {
        this.weeklyGoal += value;
       });}

       if(this.program_ex_map_name_in5.size!=0){
       this.program_ex_map_name_in5.forEach(value=> {
        this.weeklyGoal += value;
       });}

       if(this.program_ex_map_name_in6.size!=0){
       this.program_ex_map_name_in6.forEach(value=> {
        this.weeklyGoal += value;
       });}

       if(this.program_ex_map_name_in7.size!=0){
       this.program_ex_map_name_in7.forEach(value=> {
        this.weeklyGoal += value;
       });}

      }
       //---calculate weekly progress
       this.weeklyProgress = Number((this.weeklyFinish/this.weeklyGoal)*100).toFixed(2);
      
      //---display weekly progress
       if (Number(this.weeklyProgress) < 100){
          this.weeklyProgress_display = this.weeklyProgress +" percent finished of your weekly goal!";
       }else if(Number(this.weeklyProgress) >= 100){
          this.weeklyProgress_display = "You finished of your weekly goal!";
       }

       //---commit weekly progress to localstorage
       localStorage.setItem("weekly_finish", this.weeklyFinish.toString())
       localStorage.setItem("weekly_goal", this.weeklyGoal.toString())

      //---substract finished repititions from goal repititions
       for(let[k1,v1] of this.ex_finish_map_name){
           for(let[k2,v2] of this.dayCommit){
              if(k1===k2){
                this.dayCommit.set(k2,v2-v1)
                if((v2-v1)<=0){
                  this.dayCommit.set(k2, 0)
                }
              }
            }
        }
       //---clear map of logged finishes
       this.ex_finish_map_name.clear()
    

    //---commit progress of repititions finished to localstorage
    localStorage.setItem("day1commit", JSON.stringify(Array.from(this.program_ex_map_name.entries())))
    localStorage.setItem("day2commit", JSON.stringify(Array.from(this.program_ex_map_name2.entries())))
    localStorage.setItem("day3commit", JSON.stringify(Array.from(this.program_ex_map_name3.entries())))
    localStorage.setItem("day4commit", JSON.stringify(Array.from(this.program_ex_map_name4.entries())))
    localStorage.setItem("day5commit", JSON.stringify(Array.from(this.program_ex_map_name5.entries())))
    localStorage.setItem("day6commit", JSON.stringify(Array.from(this.program_ex_map_name6.entries())))
    localStorage.setItem("day7commit", JSON.stringify(Array.from(this.program_ex_map_name7.entries())))
  }
  
  //---go to details page
 toGoalDetails(){
    this.router.navigateByUrl('/goaldetails');
  }

  //---clear goal and refresh page
  uncommitGoal(){

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

  startTimer(){
  //---Update the count down every 1 second
  const sevenDayTimer = setInterval(() => {

    //---disable buttons and menues
    this.disable();

    //---Get today's date and time
    let now = new Date().getTime();
    
    //---calculate difference between end date and now
    let difference = this.countDownDate - now;

     //---Calculations for days, hours, minutes and seconds
    this.days = Math.floor(difference / (1000 * 60 * 60 * 24));
    this.hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))+1;
    this.minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    this.seconds = Math.floor((difference % (1000 * 60)) / 1000);

    //---commit end date to localstorage
    localStorage.setItem("countdown_timer", JSON.stringify(this.countDownDate))

    //---Switch to different day commits every daily cycle
   //---for day 1
   if (this.days===6 && this.hours>0 && this.minutes>0 && this.seconds>0){
     
     this.dayCommit = this.program_ex_map_name
     this.dayCommitInitial = new Map(this.program_ex_map_name_in)
     
     this.dayOne = this.oneDate.getFullYear()+"-"+(this.oneDate.getMonth()+1)+"-"+this.oneDate.getDate()
     this.dayTwo = this.twoDate.getFullYear()+"-"+(this.twoDate.getMonth()+1)+"-"+this.twoDate.getDate()
     this.dayThree = this.threeDate.getFullYear()+"-"+(this.threeDate.getMonth()+1)+"-"+this.threeDate.getDate()
     this.dayFour = this.fourDate.getFullYear()+"-"+(this.fourDate.getMonth()+1)+"-"+this.fourDate.getDate()
     this.dayFive = this.fiveDate.getFullYear()+"-"+(this.fiveDate.getMonth()+1)+"-"+this.fiveDate.getDate()
     this.daySix = this.sixDate.getFullYear()+"-"+(this.sixDate.getMonth()+1)+"-"+this.sixDate.getDate()
     this.daySeven = this.sevenDate.getFullYear()+"-"+(this.sevenDate.getMonth()+1)+"-"+this.sevenDate.getDate()
          
    }
   //---for day 2
   else if(this.days===5 && this.hours>0 && this.minutes>0 && this.seconds>0){

     if(this.days===5 && this.hours===23 && this.minutes===59 && this.seconds===59){
       localStorage.removeItem("daily_finish")
       this.dailyProgress = 0;
       this.dailyProgress_display= '';
       this.sumExInitial=0;
     }

     this.dayCommit = this.program_ex_map_name2
     this.dayCommitInitial = new Map(this.program_ex_map_name_in2)

     this.dayOne = this.mtwoDate.getFullYear()+"-"+(this.mtwoDate.getMonth()+1)+"-"+this.mtwoDate.getDate()
     this.dayTwo = this.oneDate.getFullYear()+"-"+(this.oneDate.getMonth()+1)+"-"+this.oneDate.getDate()
     this.dayThree = this.twoDate.getFullYear()+"-"+(this.twoDate.getMonth()+1)+"-"+this.twoDate.getDate()
     this.dayFour = this.threeDate.getFullYear()+"-"+(this.threeDate.getMonth()+1)+"-"+this.threeDate.getDate()
     this.dayFive = this.fourDate.getFullYear()+"-"+(this.fourDate.getMonth()+1)+"-"+this.fourDate.getDate()
     this.daySix = this.fiveDate.getFullYear()+"-"+(this.fiveDate.getMonth()+1)+"-"+this.fiveDate.getDate()
     this.daySeven = this.sixDate.getFullYear()+"-"+(this.sixDate.getMonth()+1)+"-"+this.sixDate.getDate()
    }

    //---for day 3
    else if(this.days===4 && this.hours>0 && this.minutes>0 && this.seconds>0){

     if(this.days===4 && this.hours===23 && this.minutes===59 && this.seconds===59){
       localStorage.removeItem("daily_finish")
       this.dailyProgress = 0;
       this.dailyProgress_display= '';
       this.sumExInitial=0;
     }

     this.dayCommit = this.program_ex_map_name3
     this.dayCommitInitial = new Map(this.program_ex_map_name_in3)

     this.dayOne = this.mthreeDate.getFullYear()+"-"+(this.mthreeDate.getMonth()+1)+"-"+this.mthreeDate.getDate()
     this.dayTwo = this.mtwoDate.getFullYear()+"-"+(this.mtwoDate.getMonth()+1)+"-"+this.mtwoDate.getDate()
     this.dayThree = this.oneDate.getFullYear()+"-"+(this.oneDate.getMonth()+1)+"-"+this.oneDate.getDate()
     this.dayFour = this.twoDate.getFullYear()+"-"+(this.twoDate.getMonth()+1)+"-"+this.twoDate.getDate()
     this.dayFive = this.threeDate.getFullYear()+"-"+(this.threeDate.getMonth()+1)+"-"+this.threeDate.getDate()
     this.daySix = this.fourDate.getFullYear()+"-"+(this.fourDate.getMonth()+1)+"-"+this.fourDate.getDate()
     this.daySeven = this.fiveDate.getFullYear()+"-"+(this.fiveDate.getMonth()+1)+"-"+this.fiveDate.getDate()
    }

   //---for day 4
   else if (this.days===3 && this.hours>0 && this.minutes>0 && this.seconds>0){

     if(this.days===3 && this.hours===23 && this.minutes===59 && this.seconds===59){
       localStorage.removeItem("daily_finish")
       this.dailyProgress = 0;
       this.dailyProgress_display= '';
       this.sumExInitial=0;
     }

     this.dayCommit = this.program_ex_map_name4
     this.dayCommitInitial = new Map(this.program_ex_map_name_in4)

     this.dayOne = this.mfourDate.getFullYear()+"-"+(this.mfourDate.getMonth()+1)+"-"+this.mfourDate.getDate()
     this.dayTwo = this.mthreeDate.getFullYear()+"-"+(this.mthreeDate.getMonth()+1)+"-"+this.mthreeDate.getDate()
     this.dayThree = this.mtwoDate.getFullYear()+"-"+(this.mtwoDate.getMonth()+1)+"-"+this.mtwoDate.getDate()
     this.dayFour = this.oneDate.getFullYear()+"-"+(this.oneDate.getMonth()+1)+"-"+this.oneDate.getDate()
     this.dayFive = this.twoDate.getFullYear()+"-"+(this.twoDate.getMonth()+1)+"-"+this.twoDate.getDate()
     this.daySix = this.threeDate.getFullYear()+"-"+(this.threeDate.getMonth()+1)+"-"+this.threeDate.getDate()
     this.daySeven = this.fourDate.getFullYear()+"-"+(this.fourDate.getMonth()+1)+"-"+this.fourDate.getDate()
    
    }

   //---for day 5
   else if(this.days===2 && this.hours>0 && this.minutes>0 && this.seconds>0){

     if(this.days===2 && this.hours===23 && this.minutes===59 && this.seconds===59){
       localStorage.removeItem("daily_finish")
       this.dailyProgress = 0;
       this.dailyProgress_display= '';
       this.sumExInitial=0;
     }

     this.dayCommit = this.program_ex_map_name5
     this.dayCommitInitial = new Map(this.program_ex_map_name_in5)
    
     this.dayOne = this.mfiveDate.getFullYear()+"-"+(this.mfiveDate.getMonth()+1)+"-"+this.mfiveDate.getDate()
     this.dayTwo = this.mfourDate.getFullYear()+"-"+(this.mfourDate.getMonth()+1)+"-"+this.mfourDate.getDate()
     this.dayThree = this.mthreeDate.getFullYear()+"-"+(this.mthreeDate.getMonth()+1)+"-"+this.mthreeDate.getDate()
     this.dayFour = this.mtwoDate.getFullYear()+"-"+(this.mtwoDate.getMonth()+1)+"-"+this.mtwoDate.getDate()
     this.dayFive = this.oneDate.getFullYear()+"-"+(this.oneDate.getMonth()+1)+"-"+this.oneDate.getDate()
     this.daySix = this.twoDate.getFullYear()+"-"+(this.twoDate.getMonth()+1)+"-"+this.twoDate.getDate()
     this.daySeven = this.threeDate.getFullYear()+"-"+(this.threeDate.getMonth()+1)+"-"+this.threeDate.getDate()


   }

   //---for day 6
   else if(this.days===1 && this.hours>0 && this.minutes>0 && this.seconds>0){

     if(this.days===1 && this.hours===23 && this.minutes===59 && this.seconds===59){
       localStorage.removeItem("daily_finish")
       this.dailyProgress = 0;
       this.dailyProgress_display= '';
       this.sumExInitial=0;
     }

     this.dayCommit = this.program_ex_map_name6
     this.dayCommitInitial = new Map(this.program_ex_map_name_in6)
    
     this.dayOne = this.msixDate.getFullYear()+"-"+(this.msixDate.getMonth()+1)+"-"+this.msixDate.getDate()
     this.dayTwo = this.mfiveDate.getFullYear()+"-"+(this.mfiveDate.getMonth()+1)+"-"+this.mfiveDate.getDate()
     this.dayThree = this.mfourDate.getFullYear()+"-"+(this.mfourDate.getMonth()+1)+"-"+this.mfourDate.getDate()
     this.dayFour = this.mthreeDate.getFullYear()+"-"+(this.mthreeDate.getMonth()+1)+"-"+this.mthreeDate.getDate()
     this.dayFive = this.mtwoDate.getFullYear()+"-"+(this.mtwoDate.getMonth()+1)+"-"+this.mtwoDate.getDate()
     this.daySix = this.oneDate.getFullYear()+"-"+(this.oneDate.getMonth()+1)+"-"+this.oneDate.getDate()
     this.daySeven = this.twoDate.getFullYear()+"-"+(this.twoDate.getMonth()+1)+"-"+this.twoDate.getDate()

   }

   //---for day 7
   else if(this.days===0 && this.hours>0 && this.minutes>0 && this.seconds>0){

     if(this.days===0 && this.hours===23 && this.minutes===59 && this.seconds===59){
       localStorage.removeItem("daily_finish")
       this.dailyProgress = 0;
       this.dailyProgress_display= '';
       this.sumExInitial=0;
     }

     this.dayCommit = this.program_ex_map_name7
     this.dayCommitInitial = new Map(this.program_ex_map_name_in7)

     this.dayOne = this.msevenDate.getFullYear()+"-"+(this.msevenDate.getMonth()+1)+"-"+this.msevenDate.getDate()
     this.dayTwo = this.msixDate.getFullYear()+"-"+(this.msixDate.getMonth()+1)+"-"+this.msixDate.getDate()
     this.dayThree = this.mfiveDate.getFullYear()+"-"+(this.mfiveDate.getMonth()+1)+"-"+this.mfiveDate.getDate()
     this.dayFour = this.mfourDate.getFullYear()+"-"+(this.mfourDate.getMonth()+1)+"-"+this.mfourDate.getDate()
     this.dayFive = this.mthreeDate.getFullYear()+"-"+(this.mthreeDate.getMonth()+1)+"-"+this.mthreeDate.getDate()
     this.daySix = this.mtwoDate.getFullYear()+"-"+(this.mtwoDate.getMonth()+1)+"-"+this.mtwoDate.getDate()
     this.daySeven = this.oneDate.getFullYear()+"-"+(this.oneDate.getMonth()+1)+"-"+this.oneDate.getDate()
   
   }
   //---Display message when count down is finished
   else if(difference === 0) {
     const message = "Deadline expired";
     
     this.uncommitGoal()
     }
   }, 1000);
}

 disable(){
 //---disable menues and buttons
 $('.program-options').attr('disabled','disabled');
 $('.workout-options').attr('disabled','disabled');
 $('.exercise-options').attr('disabled','disabled');
 $('.clear').attr('disabled','disabled');
 $('.commit-program').attr('disabled','disabled');
 $('.day-buttons').attr('disabled','disabled');
}}

