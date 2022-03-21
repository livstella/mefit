import { getLocaleDateFormat } from '@angular/common';
import { SelectorMatcher } from '@angular/compiler';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
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
import { Sets } from 'src/app/models/sets.model';


@Component({
  selector: 'app-goal-dashboard',
  templateUrl: './goal-dashboard.component.html',
  styleUrls: ['./goal-dashboard.component.css']
})
export class GoalDashboardComponent implements OnInit {

  username: string = "Michel"; //placeholder for username
  
  dayOne: string = ''; 
  dayTwo: string ='';
  dayThree: string ='';
  dayFour: string ='';
  dayFive: string ='';
  daySix: string ='';
  daySeven: string ='';

  
  
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

  ex: string = '';
  ex_options_names: string[] = [];
  ex_ids: number[] = [];
  ex_id: number | undefined;
  ex_choice_map_name = new Map();
  ex_finish_map_name = new Map();
  ex_choice_map = new Map();
  ex_finish_map = new Map();

  program_ex_map_name = new Map();
  program_ex_map_name2 = new Map();
  program_ex_map_name3 = new Map();
  program_ex_map_name4 = new Map();
  program_ex_map_name5 = new Map();
  program_ex_map_name6 = new Map();
  program_ex_map_name7 = new Map();

  dayCommit = new Map();
  dayCommitDisplay = new Map();
  dayCommitInitial = new Map();

  // day2Commit = new Map();
  // day2CommitDisplay = new Map();
  // day2CommitInitial = new Map();

  // day3Commit = new Map();
  // day3CommitDisplay = new Map();
  // day3CommitInitial = new Map();

  // day4Commit = new Map();
  // day4CommitDisplay = new Map();
  // day4CommitInitial = new Map();

  // day5Commit = new Map();
  // day5CommitDisplay = new Map();
  // day5CommitInitial = new Map();

  // day6Commit = new Map();
  // day6CommitDisplay = new Map();
  // day6CommitInitial = new Map();

  // day7Commit = new Map();
  // day7CommitDisplay = new Map();
  // day7CommitInitial = new Map();
  // ex_choice_list2: string[] = [];
  // ex_finish_list2: string[] = [];
  // ex_choice_list3: string[] = [];
  // ex_finish_list3: string[] = [];

  
  sets = [{}];
  workout_ids: number[] = [];
  workout_id: number | undefined;
  workout_sets: Sets[] | undefined ;

  program_ids: number[] = [];
  program_id: number | undefined;

  ex_fromWorkout_map = new Map();
  repititions: number | undefined;
  exercises_choosen: Exercise[] | undefined | any;
  program_exercises_choosen: Exercise[] | undefined | any;
  workouts_choosen: Workout[] | undefined | any;
  exercises_choosen_total= new Map();

  workout_options = new Map();
  workout_options_names: string[] =[];
  

  workout_keys: string[]|any = [] ;
  workout_key: string | undefined;
  workout_ex: string[] = [];
  workout_ex_commit: string[] = [];
  
  program_options = new Map();
  program_options_names: string[] =[];

  program_keys: string[]|any = [] ;
  program_key: string | undefined;
  program_work: string[] = [];
  program_ex: string[] = [];
  
  mapCount = new Map();
  mapCountWeekCommit = new Map();
  mapCountWeekCommitDisplay = new Map();
  mapCountWeekInitial = new Map();

  total_finish_list: string[]=[];
  finishHistory = new Map();

  overallProgress: number | string | undefined = 0;
  dailyProgress: number | string | undefined = 0;
  overallProgress_display: number | string | undefined = 0;
  dailyProgress_display: number | string | undefined = 0;

  mapCountKeys: string[]|any = []; 

  message: string | undefined;
  
  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  countDownDate: number = 0;

  currentGoal: any = new Map();
  finishedGoals: any = new Map(); 
  unfinishedGoals: any = new Map();
  newMap: any;
  newObj: any;
  newMap2: any;
  newObj2: any;

  body: any|undefined;
  timeStamp: any|undefined;
  response: any;
  responseProgram: any;
  exerciselist: Exercise[] | undefined;
  progress_small: Number | undefined;
  
  sumExCommited: number = 0;

  constructor(private router: Router, private readonly goalDashBoardService: GoalDashbordService ,private readonly exercisePageService :exercisePageService, private readonly workoutPageService: WorkoutPageService, private readonly programPageService: ProgrammePageService) { }

  ngOnInit(): void {

    //---Stores daily submitted history to local storage
    if(localStorage.getItem("daily_finish")){
      this.sumExCommited = Number(localStorage.getItem("daily_finish"))
    
      const initialcommit = new Map(JSON.parse(localStorage.getItem("daily_initial_commit")||'{}'));
      this.dayCommitInitial = initialcommit
    
    this.finishHistory.forEach(value=> {
          this.sumExCommited += value;
    });

    let sumExInitial = 0;
    this.dayCommitInitial.forEach(value => {
          sumExInitial += value;
    });
       
    this.dailyProgress = Number((this.sumExCommited/sumExInitial)*100).toFixed(2);

    if (Number(this.dailyProgress) < 100){
      this.dailyProgress_display = this.dailyProgress +" percent finished of you daily goal!";
    }else if(Number(this.dailyProgress) >= 100){
      this.dailyProgress_display = "You finished of your daily goal!";
    }
  }
  
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
    this.dayOne = this.oneDate.getFullYear()+"-"+this.oneDate.getMonth()+"-"+this.oneDate.getDate()
    this.dayTwo = this.twoDate.getFullYear()+"-"+this.twoDate.getMonth()+"-"+this.twoDate.getDate()
    this.dayThree = this.threeDate.getFullYear()+"-"+this.threeDate.getMonth()+"-"+this.threeDate.getDate()
    this.dayFour = this.fourDate.getFullYear()+"-"+this.fourDate.getMonth()+"-"+this.fourDate.getDate()
    this.dayFive = this.fiveDate.getFullYear()+"-"+this.fiveDate.getMonth()+"-"+this.fiveDate.getDate()
    this.daySix = this.sixDate.getFullYear()+"-"+this.sixDate.getMonth()+"-"+this.sixDate.getDate()
    this.daySeven = this.sevenDate.getFullYear()+"-"+this.sevenDate.getMonth()+"-"+this.sevenDate.getDate()

    //---Fetch all exercises
    this.exercisePageService.fetchExercise();

    //---Fetch all workouts
    this.workoutPageService.fetchWorkout();

    //---Fetch all programs
    this.programPageService.fetchProgramme();
 
    //---If a goal has allready been commited too.
    if(localStorage.getItem('day1commit')!=null){
      const day1 = new Map(JSON.parse(localStorage.getItem("day1commit")||'{}'));
      const day2 = new Map(JSON.parse(localStorage.getItem("day2commit")||'{}'));
      const day3 = new Map(JSON.parse(localStorage.getItem("day3commit")||'{}'));
      const day4 = new Map(JSON.parse(localStorage.getItem("day4commit")||'{}'));
      const day5 = new Map(JSON.parse(localStorage.getItem("day5commit")||'{}'));
      const day6 = new Map(JSON.parse(localStorage.getItem("day6commit")||'{}'));
      const day7 = new Map(JSON.parse(localStorage.getItem("day7commit")||'{}'));

      this.program_ex_map_name = day1
      this.program_ex_map_name2 = day2
      this.program_ex_map_name3 = day3
      this.program_ex_map_name4 = day4
      this.program_ex_map_name5 = day5
      this.program_ex_map_name6 = day6
      this.program_ex_map_name7 = day7
      
      $('.program-options').attr('disabled','disabled');
      $('.workout-options').attr('disabled','disabled');
      $('.exercise-options').attr('disabled','disabled');
      $('.clear').attr('disabled','disabled');
      $('.commit-program').attr('disabled','disabled');

      // //---start timer
      this.countDownDate = Number(localStorage.getItem("countdown_timer"))
       
      //---Update the count down every 1 second
      const sevenDayTimer = setInterval(() => {

       //---Get today's date and time
       let now = new Date().getTime();
       
       let difference = this.countDownDate - now;

        //---Calculations for days, hours, minutes and seconds
       this.days = Math.floor(difference / (1000 * 60 * 60 * 24));
       this.hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
       this.minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
       this.seconds = Math.floor((difference % (1000 * 60)) / 1000);

      //localStorage.setItem("countdown_timer", JSON.stringify(this.countDownDate))

      //---Switch to different day commits every daily cycle
      if (this.days==6 && this.hours==22 && this.minutes==59 && this.seconds==58){
         
        this.dayCommit = this.program_ex_map_name
        this.dayCommitDisplay = this.program_ex_map_name
        this.dayCommitInitial = new Map(JSON.parse(JSON.stringify(this.program_ex_map_name)))

        this.dayOne = this.oneDate.getFullYear()+"-"+this.oneDate.getMonth()+"-"+this.oneDate.getDate()
        this.dayTwo = this.twoDate.getFullYear()+"-"+this.twoDate.getMonth()+"-"+this.twoDate.getDate()
        this.dayThree = this.threeDate.getFullYear()+"-"+this.threeDate.getMonth()+"-"+this.threeDate.getDate()
        this.dayFour = this.fourDate.getFullYear()+"-"+this.fourDate.getMonth()+"-"+this.fourDate.getDate()
        this.dayFive = this.fiveDate.getFullYear()+"-"+this.fiveDate.getMonth()+"-"+this.fiveDate.getDate()
        this.daySix = this.sixDate.getFullYear()+"-"+this.sixDate.getMonth()+"-"+this.sixDate.getDate()
        this.daySeven = this.sevenDate.getFullYear()+"-"+this.sevenDate.getMonth()+"-"+this.sevenDate.getDate()
             
       }else if(this.days==6 && this.hours==22 && this.minutes==59 && this.seconds==30){

        this.dayCommit = this.program_ex_map_name2
        this.dayCommitDisplay = this.program_ex_map_name2
        this.dayCommitInitial = new Map(JSON.parse(JSON.stringify(this.program_ex_map_name2)))

        localStorage.removeItem("daily_finish")
        this.dailyProgress = 0;
        this.dailyProgress_display= '';

        this.dayOne = this.mtwoDate.getFullYear()+"-"+this.mtwoDate.getMonth()+"-"+this.mtwoDate.getDate()
        this.dayTwo = this.oneDate.getFullYear()+"-"+this.oneDate.getMonth()+"-"+this.oneDate.getDate()
        this.dayThree = this.twoDate.getFullYear()+"-"+this.twoDate.getMonth()+"-"+this.twoDate.getDate()
        this.dayFour = this.threeDate.getFullYear()+"-"+this.threeDate.getMonth()+"-"+this.threeDate.getDate()
        this.dayFive = this.fourDate.getFullYear()+"-"+this.fourDate.getMonth()+"-"+this.fourDate.getDate()
        this.daySix = this.fiveDate.getFullYear()+"-"+this.fiveDate.getMonth()+"-"+this.fiveDate.getDate()
        this.daySeven = this.sixDate.getFullYear()+"-"+this.sixDate.getMonth()+"-"+this.sixDate.getDate()
      
       }else if(this.days===5){
        this.dayCommit = this.program_ex_map_name3
        this.dayCommitDisplay = this.program_ex_map_name3
        this.dayCommitInitial = new Map(JSON.parse(JSON.stringify(this.program_ex_map_name3)))

        this.dayOne = this.mthreeDate.getFullYear()+"-"+this.mthreeDate.getMonth()+"-"+this.mthreeDate.getDate()
        this.dayTwo = this.mtwoDate.getFullYear()+"-"+this.mtwoDate.getMonth()+"-"+this.mtwoDate.getDate()
        this.dayThree = this.oneDate.getFullYear()+"-"+this.oneDate.getMonth()+"-"+this.oneDate.getDate()
        this.dayFour = this.twoDate.getFullYear()+"-"+this.twoDate.getMonth()+"-"+this.twoDate.getDate()
        this.dayFive = this.threeDate.getFullYear()+"-"+this.threeDate.getMonth()+"-"+this.threeDate.getDate()
        this.daySix = this.fourDate.getFullYear()+"-"+this.fourDate.getMonth()+"-"+this.fourDate.getDate()
        this.daySeven = this.fiveDate.getFullYear()+"-"+this.fiveDate.getMonth()+"-"+this.fiveDate.getDate()
       
       }else if(this.days===4){
        this.dayCommit = this.program_ex_map_name4
        this.dayCommitDisplay = this.program_ex_map_name4
        this.dayCommitInitial = new Map(JSON.parse(JSON.stringify(this.program_ex_map_name4)))

        this.dayOne = this.mfourDate.getFullYear()+"-"+this.mfourDate.getMonth()+"-"+this.mfourDate.getDate()
        this.dayTwo = this.mthreeDate.getFullYear()+"-"+this.mthreeDate.getMonth()+"-"+this.mthreeDate.getDate()
        this.dayThree = this.mtwoDate.getFullYear()+"-"+this.mtwoDate.getMonth()+"-"+this.mtwoDate.getDate()
        this.dayFour = this.oneDate.getFullYear()+"-"+this.oneDate.getMonth()+"-"+this.oneDate.getDate()
        this.dayFive = this.twoDate.getFullYear()+"-"+this.twoDate.getMonth()+"-"+this.twoDate.getDate()
        this.daySix = this.threeDate.getFullYear()+"-"+this.threeDate.getMonth()+"-"+this.threeDate.getDate()
        this.daySeven = this.fourDate.getFullYear()+"-"+this.fourDate.getMonth()+"-"+this.fourDate.getDate()
       
       }else if(this.days===3){
        this.dayCommit = this.program_ex_map_name5
        this.dayCommitDisplay = this.program_ex_map_name5
        this.dayCommitInitial = new Map(JSON.parse(JSON.stringify(this.program_ex_map_name5)))
       
        this.dayOne = this.mfiveDate.getFullYear()+"-"+this.mfiveDate.getMonth()+"-"+this.mfiveDate.getDate()
        this.dayTwo = this.mfourDate.getFullYear()+"-"+this.mfourDate.getMonth()+"-"+this.mfourDate.getDate()
        this.dayThree = this.mthreeDate.getFullYear()+"-"+this.mthreeDate.getMonth()+"-"+this.mthreeDate.getDate()
        this.dayFour = this.mtwoDate.getFullYear()+"-"+this.mtwoDate.getMonth()+"-"+this.mtwoDate.getDate()
        this.dayFive = this.oneDate.getFullYear()+"-"+this.oneDate.getMonth()+"-"+this.oneDate.getDate()
        this.daySix = this.twoDate.getFullYear()+"-"+this.twoDate.getMonth()+"-"+this.twoDate.getDate()
        this.daySeven = this.threeDate.getFullYear()+"-"+this.threeDate.getMonth()+"-"+this.threeDate.getDate()


      }else if(this.days===2){
        this.dayCommit = this.program_ex_map_name6
        this.dayCommitDisplay = this.program_ex_map_name6
        this.dayCommitInitial = new Map(JSON.parse(JSON.stringify(this.program_ex_map_name6)))
       
        this.dayOne = this.msixDate.getFullYear()+"-"+this.msixDate.getMonth()+"-"+this.msixDate.getDate()
        this.dayTwo = this.mfiveDate.getFullYear()+"-"+this.mfiveDate.getMonth()+"-"+this.mfiveDate.getDate()
        this.dayThree = this.mfourDate.getFullYear()+"-"+this.mfourDate.getMonth()+"-"+this.mfourDate.getDate()
        this.dayFour = this.mthreeDate.getFullYear()+"-"+this.mthreeDate.getMonth()+"-"+this.mthreeDate.getDate()
        this.dayFive = this.mtwoDate.getFullYear()+"-"+this.mtwoDate.getMonth()+"-"+this.mtwoDate.getDate()
        this.daySix = this.oneDate.getFullYear()+"-"+this.oneDate.getMonth()+"-"+this.oneDate.getDate()
        this.daySeven = this.twoDate.getFullYear()+"-"+this.twoDate.getMonth()+"-"+this.twoDate.getDate()

      }else if(this.days===1){
        this.dayCommit = this.program_ex_map_name7
        this.dayCommitDisplay = this.program_ex_map_name7
        this.dayCommitInitial = new Map(JSON.parse(JSON.stringify(this.program_ex_map_name7)))

        this.dayOne = this.msevenDate.getFullYear()+"-"+this.msevenDate.getMonth()+"-"+this.msevenDate.getDate()
        this.dayTwo = this.msixDate.getFullYear()+"-"+this.msixDate.getMonth()+"-"+this.msixDate.getDate()
        this.dayThree = this.mfiveDate.getFullYear()+"-"+this.mfiveDate.getMonth()+"-"+this.mfiveDate.getDate()
        this.dayFour = this.mfourDate.getFullYear()+"-"+this.mfourDate.getMonth()+"-"+this.mfourDate.getDate()
        this.dayFive = this.mthreeDate.getFullYear()+"-"+this.mthreeDate.getMonth()+"-"+this.mthreeDate.getDate()
        this.daySix = this.mtwoDate.getFullYear()+"-"+this.mtwoDate.getMonth()+"-"+this.mtwoDate.getDate()
        this.daySeven = this.oneDate.getFullYear()+"-"+this.oneDate.getMonth()+"-"+this.oneDate.getDate()
      
      }
       //---Display message when count down is finished
       else if(difference === 0) {
        const message = "Deadline expired";
         $('#commit').removeAttr('disabled');
         $('.NotFinish').removeAttr('disabled');
        localStorage.removeItem("day1commit")
        localStorage.removeItem("day2commit")
        localStorage.removeItem("day3commit")
        localStorage.removeItem("day4commit")
        localStorage.removeItem("day5commit")
        localStorage.removeItem("day6commit")
        localStorage.removeItem("day7commit")
        localStorage.removeItem("countdown_timer");
        }
      }, 1000);
  }
    
}   

  get exercises(): Exercise[] {
    return this.exercisePageService.exercise();
  }
  get workouts(): Workout[] {
    return this.workoutPageService.workout();
  }
  get programmes(): Programme[] {
    return this.programPageService.programme();
  }

  //---Workouts of the day
  //---when picking excersize from dropdown-list display 
  onChangeEx(){
    this.exercises.forEach(ex => this.ex_ids.push(ex.id))

    let choiceEx = $("select[name='select1.1'] option:selected").index();
    this.ex_id = this.ex_ids[choiceEx-1];

    this.goalDashBoardService.fetchExById(this.ex_id).subscribe((exercise: Exercise[]) =>
    {
        let ex_name = JSON.parse(JSON.stringify(exercise)).name

        console.log(ex_name)
        if(!this.ex_choice_map_name.has(ex_name)){
          this.ex_choice_map_name.set(ex_name,10);
        }else{
          this.ex_choice_map_name.set(ex_name, (this.ex_choice_map_name.get(ex_name) +10))
       }  
      })
    }
  
  

  //---when picking workout from dropdown-list display 
  onChangeWork(){

    this.workouts.forEach(workout => this.workout_ids.push(workout.id))

    let choiceWork = $("select[name='select1.2'] option:selected").index(); 
    this.workout_id = this.workout_ids[choiceWork-1];

    this.goalDashBoardService.fetchWorkoutById(this.workout_id).subscribe((workout: Workout[]) =>
    { 
      this.repititions = JSON.parse(JSON.stringify(workout)).sets[0].exerciseRepetitions
      console.log(this.repititions)

      this.exercises_choosen = JSON.parse(JSON.stringify(workout)).sets[0].exercises
      console.log(this.exercises_choosen)

      this.exercises_choosen.forEach((exercise: Exercise[]) => {
      
      let ex_name = JSON.parse(JSON.stringify(exercise)).name
      
      if(!this.ex_choice_map_name.has(ex_name)){
        this.ex_choice_map_name.set(ex_name, this.repititions);
      }else{
        this.ex_choice_map_name.set(ex_name, (this.ex_choice_map_name.get(ex_name) +this.repititions))
     }

    })
  })}

  //---increment exercise choice by 10
  increment10(name:string){
    for(let[k,v] of this.ex_choice_map_name){
      if(k === name){
        this.ex_choice_map_name.set(k,v+10);
    }}
  }

  //---increment exercise choice by 10
  decrement10(name:string){
    for(let[k,v] of this.ex_choice_map_name){
      if(k === name){
        this.ex_choice_map_name.set(k,v-10);
        if((v-10)<=0){
          this.ex_choice_map_name.delete(k);
        }
    }}
  }

  //---increment exercise choice by 1
  increment1(name:string){
    for(let[k,v] of this.ex_choice_map_name){
      if(k === name){
        this.ex_choice_map_name.set(k,v+1);
    }}
  }

  //---increment exercise choice by 1
  decrement1(name:string){
    for(let[k,v] of this.ex_choice_map_name){
      if(k === name){
        this.ex_choice_map_name.set(k,v-1);
        if((v-1)<=0){
          this.ex_choice_map_name.delete(k);
        }
    }}
  }


  //---add excersize to finish list
  updateExFinish(name: string){

    for(let[k,v] of this.ex_choice_map_name){
      for(let[k2,v2] of this.dayCommit)
        if(k === name && k2 ===name){
          if(v<=v2){
            this.ex_finish_map_name.set(k,v);
            this.ex_choice_map_name.delete(k);
          }else{
            alert("you picked to many repititions.")
          }
        }else if(k != name && k2 !=name){
            alert("You did not sign up for this exercise.")
        }
    }
  }


  //---add excersize to planed list
  updateExPlaned(name: string){

    for(let[k,v] of this.ex_finish_map_name){
      if(k === name){
        this.ex_choice_map_name.set(k,v);
        this.ex_finish_map_name.delete(k);
      }
    }
  }


  //---remove excersize
  remove(name: string){
    for(let[k,v] of this.ex_choice_map_name){
      if(k=== name){
        this.ex_choice_map_name.delete(k);
      }} 
  }


  //---Weekly goals
  //---when a program is chosen its workouts are shown in dropdown list
  onChangeProgram(){

    //---get program workouts
    this.programmes.forEach(program => this.program_ids.push(program.id))
    
    let choiceProgram = $("select[name='selectProgram'] option:selected").index();
    this.program_id = this.program_ids[choiceProgram-1];

    this.goalDashBoardService.fetchProgramById(this.program_id).subscribe((program: Programme[]) =>
    { 
      this.workouts_choosen = JSON.parse(JSON.stringify(program)).workouts;
      console.log(this.workouts_choosen)
  

      //---list each exercise from workout on its seperate day
      this.workouts_choosen.forEach((workout: { id: number; }) => this.workout_ids.push(workout.id))

      for(let i =0; i<this.workout_ids.length;i++){
      if(i==0){
        this.goalDashBoardService.fetchWorkoutById(this.workout_ids[i]).subscribe((workout: Workout[]) =>
        { 
        this.repititions = JSON.parse(JSON.stringify(workout)).sets[0].exerciseRepetitions

        this.program_exercises_choosen = JSON.parse(JSON.stringify(workout)).sets[0].exercises
        console.log(this.program_exercises_choosen)

        this.program_exercises_choosen.forEach((exercise: Exercise[]) => {
    
        let ex_name = JSON.parse(JSON.stringify(exercise)).name
    
        if(!this.program_ex_map_name.has(ex_name)){
          this.program_ex_map_name.set(ex_name, this.repititions);
        }else{
          this.program_ex_map_name.set(ex_name, (this.program_ex_map_name.get(ex_name) +this.repititions))
   }})})}
        else if(i==1){
          this.goalDashBoardService.fetchWorkoutById(this.workout_ids[i]).subscribe((workout: Workout[]) =>
        { 
          this.repititions = JSON.parse(JSON.stringify(workout)).sets[0].exerciseRepetitions

          this.program_exercises_choosen = JSON.parse(JSON.stringify(workout)).sets[0].exercises
          console.log(this.program_exercises_choosen)

          this.program_exercises_choosen.forEach((exercise: Exercise[]) => {

          let ex_name = JSON.parse(JSON.stringify(exercise)).name

          if(!this.program_ex_map_name2.has(ex_name)){
            this.program_ex_map_name2.set(ex_name, this.repititions);
          }else{
            this.program_ex_map_name2.set(ex_name, (this.program_ex_map_name2.get(ex_name) +this.repititions))
          }})})}

        else if(i==2){
          this.goalDashBoardService.fetchWorkoutById(this.workout_ids[i]).subscribe((workout: Workout[]) =>
        { 
          this.repititions = JSON.parse(JSON.stringify(workout)).sets[0].exerciseRepetitions

          this.program_exercises_choosen = JSON.parse(JSON.stringify(workout)).sets[0].exercises
          console.log(this.program_exercises_choosen)

          this.program_exercises_choosen.forEach((exercise: Exercise[]) => {

          let ex_name = JSON.parse(JSON.stringify(exercise)).name

          if(!this.program_ex_map_name3.has(ex_name)){
            this.program_ex_map_name3.set(ex_name, this.repititions);
          }else{
            this.program_ex_map_name3.set(ex_name, (this.program_ex_map_name3.get(ex_name) +this.repititions))
          }})})}
   
  }})
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


  //---first day
  //---clear button
  clear1(){
    this.program_ex_map_name.clear();
  }
  //---add an exercise to weekly goal
  onChangeGoalEx1(){

    this.exercises.forEach(ex => this.ex_ids.push(ex.id))

    let choiceEx = $("select[name='selectGoalEx1'] option:selected").index();
    this.ex_id = this.ex_ids[choiceEx-1];

    this.goalDashBoardService.fetchExById(this.ex_id).subscribe((exercise: Exercise[]) =>
    {
        let ex_name = JSON.parse(JSON.stringify(exercise)).name

        console.log(ex_name)
        if(!this.program_ex_map_name.has(ex_name)){
          this.program_ex_map_name.set(ex_name,10);
        }else{
          this.program_ex_map_name.set(ex_name, (this.program_ex_map_name.get(ex_name) +10))
       }  
      })
  }

  //---add a workout to weekly goal
  onChangeGoalWork1(){
    this.workouts.forEach(workout => this.workout_ids.push(workout.id))

    let choiceWork = $("select[name='selectGoalWork1'] option:selected").index(); 
    this.workout_id = this.workout_ids[choiceWork-1];

    this.goalDashBoardService.fetchWorkoutById(this.workout_id).subscribe((workout: Workout[]) =>
    { 
      this.repititions = JSON.parse(JSON.stringify(workout)).sets[0].exerciseRepetitions
      console.log(this.repititions)

      this.exercises_choosen = JSON.parse(JSON.stringify(workout)).sets[0].exercises
      console.log(this.exercises_choosen)

      this.exercises_choosen.forEach((exercise: Exercise[]) => {
      
      let ex_name = JSON.parse(JSON.stringify(exercise)).name
      
      if(!this.program_ex_map_name.has(ex_name)){
        this.program_ex_map_name.set(ex_name, this.repititions);
      }else{
        this.program_ex_map_name.set(ex_name, (this.program_ex_map_name.get(ex_name) +this.repititions))
     }

    })
  })
  }

  //---second day
  //---clear button
  clear2(){
    this.program_ex_map_name2.clear();
  }
  //---add an exercise to weekly goal
  onChangeGoalEx2(){

    this.exercises.forEach(ex => this.ex_ids.push(ex.id))

    let choiceEx = $("select[name='selectGoalEx2'] option:selected").index();
    this.ex_id = this.ex_ids[choiceEx-1];

    this.goalDashBoardService.fetchExById(this.ex_id).subscribe((exercise: Exercise[]) =>
    {
        let ex_name = JSON.parse(JSON.stringify(exercise)).name

        console.log(ex_name)
        if(!this.program_ex_map_name2.has(ex_name)){
          this.program_ex_map_name2.set(ex_name,10);
        }else{
          this.program_ex_map_name2.set(ex_name, (this.program_ex_map_name.get(ex_name) +10))
       }  
      })
  }

  //---add a workout to weekly goal
  onChangeGoalWork2(){
    this.workouts.forEach(workout => this.workout_ids.push(workout.id))

    let choiceWork = $("select[name='selectGoalWork2'] option:selected").index(); 
    this.workout_id = this.workout_ids[choiceWork-1];

    this.goalDashBoardService.fetchWorkoutById(this.workout_id).subscribe((workout: Workout[]) =>
    { 
      this.repititions = JSON.parse(JSON.stringify(workout)).sets[0].exerciseRepetitions
      console.log(this.repititions)

      this.exercises_choosen = JSON.parse(JSON.stringify(workout)).sets[0].exercises
      console.log(this.exercises_choosen)

      this.exercises_choosen.forEach((exercise: Exercise[]) => {
      
      let ex_name = JSON.parse(JSON.stringify(exercise)).name
      
      if(!this.program_ex_map_name.has(ex_name)){
        this.program_ex_map_name2.set(ex_name, this.repititions);
      }else{
        this.program_ex_map_name2.set(ex_name, (this.program_ex_map_name2.get(ex_name) +this.repititions))
     }

    })
  })
  }
  
  //---Third day
  //---clear button
  clear3(){
    this.program_ex_map_name3.clear();
  }

  //---add exercise to weakly goal
  onChangeGoalEx3(){

    this.exercises.forEach(ex => this.ex_ids.push(ex.id))

    let choiceEx = $("select[name='selectGoalEx3'] option:selected").index();
    this.ex_id = this.ex_ids[choiceEx-1];

    this.goalDashBoardService.fetchExById(this.ex_id).subscribe((exercise: Exercise[]) =>
    {
        let ex_name = JSON.parse(JSON.stringify(exercise)).name

        console.log(ex_name)
        if(!this.program_ex_map_name3.has(ex_name)){
          this.program_ex_map_name3.set(ex_name,10);
        }else{
          this.program_ex_map_name3.set(ex_name, (this.program_ex_map_name3.get(ex_name) +10))
       }  
      })
  }

  //---add a workout to weekly goal
  onChangeGoalWork3(){
    this.workouts.forEach(workout => this.workout_ids.push(workout.id))

    let choiceWork = $("select[name='selectGoalWork3'] option:selected").index(); 
    this.workout_id = this.workout_ids[choiceWork-1];

    this.goalDashBoardService.fetchWorkoutById(this.workout_id).subscribe((workout: Workout[]) =>
    { 
      this.repititions = JSON.parse(JSON.stringify(workout)).sets[0].exerciseRepetitions
      console.log(this.repititions)

      this.exercises_choosen = JSON.parse(JSON.stringify(workout)).sets[0].exercises
      console.log(this.exercises_choosen)

      this.exercises_choosen.forEach((exercise: Exercise[]) => {
      
      let ex_name = JSON.parse(JSON.stringify(exercise)).name
      
      if(!this.program_ex_map_name3.has(ex_name)){
        this.program_ex_map_name3.set(ex_name, this.repititions);
      }else{
        this.program_ex_map_name3.set(ex_name, (this.program_ex_map_name3.get(ex_name) +this.repititions))
     }

    })
  })
  }

  //---Fourth day
  //---clear button
  clear4(){
    this.program_ex_map_name4.clear();
  }

  //---add exercise to weakly goal
  onChangeGoalEx4(){

    this.exercises.forEach(ex => this.ex_ids.push(ex.id))

    let choiceEx = $("select[name='selectGoalEx4'] option:selected").index();
    this.ex_id = this.ex_ids[choiceEx-1];

    this.goalDashBoardService.fetchExById(this.ex_id).subscribe((exercise: Exercise[]) =>
    {
        let ex_name = JSON.parse(JSON.stringify(exercise)).name

        console.log(ex_name)
        if(!this.program_ex_map_name4.has(ex_name)){
          this.program_ex_map_name4.set(ex_name,10);
        }else{
          this.program_ex_map_name4.set(ex_name, (this.program_ex_map_name4.get(ex_name) +10))
       }  
      })
  }

  //---add a workout to weekly goal
  onChangeGoalWork4(){
    this.workouts.forEach(workout => this.workout_ids.push(workout.id))

    let choiceWork = $("select[name='selectGoalWork4'] option:selected").index(); 
    this.workout_id = this.workout_ids[choiceWork-1];

    this.goalDashBoardService.fetchWorkoutById(this.workout_id).subscribe((workout: Workout[]) =>
    { 
      this.repititions = JSON.parse(JSON.stringify(workout)).sets[0].exerciseRepetitions
      console.log(this.repititions)

      this.exercises_choosen = JSON.parse(JSON.stringify(workout)).sets[0].exercises
      console.log(this.exercises_choosen)

      this.exercises_choosen.forEach((exercise: Exercise[]) => {
      
      let ex_name = JSON.parse(JSON.stringify(exercise)).name
      
      if(!this.program_ex_map_name4.has(ex_name)){
        this.program_ex_map_name4.set(ex_name, this.repititions);
      }else{
        this.program_ex_map_name4.set(ex_name, (this.program_ex_map_name4.get(ex_name) +this.repititions))
     }

    })
  })
  }

  //---Fifth day
  //---clear button
  clear5(){
    this.program_ex_map_name5.clear();
  }

  //---add exercise to weakly goal
  onChangeGoalEx5(){

    this.exercises.forEach(ex => this.ex_ids.push(ex.id))

    let choiceEx = $("select[name='selectGoalEx5'] option:selected").index();
    this.ex_id = this.ex_ids[choiceEx-1];

    this.goalDashBoardService.fetchExById(this.ex_id).subscribe((exercise: Exercise[]) =>
    {
        let ex_name = JSON.parse(JSON.stringify(exercise)).name

        console.log(ex_name)
        if(!this.program_ex_map_name5.has(ex_name)){
          this.program_ex_map_name5.set(ex_name,10);
        }else{
          this.program_ex_map_name5.set(ex_name, (this.program_ex_map_name5.get(ex_name) +10))
       }  
      })
  }

  //---add a workout to weekly goal
  onChangeGoalWork5(){
    this.workouts.forEach(workout => this.workout_ids.push(workout.id))

    let choiceWork = $("select[name='selectGoalWork5'] option:selected").index(); 
    this.workout_id = this.workout_ids[choiceWork-1];

    this.goalDashBoardService.fetchWorkoutById(this.workout_id).subscribe((workout: Workout[]) =>
    { 
      this.repititions = JSON.parse(JSON.stringify(workout)).sets[0].exerciseRepetitions
      console.log(this.repititions)

      this.exercises_choosen = JSON.parse(JSON.stringify(workout)).sets[0].exercises
      console.log(this.exercises_choosen)

      this.exercises_choosen.forEach((exercise: Exercise[]) => {
      
      let ex_name = JSON.parse(JSON.stringify(exercise)).name
      
      if(!this.program_ex_map_name5.has(ex_name)){
        this.program_ex_map_name5.set(ex_name, this.repititions);
      }else{
        this.program_ex_map_name5.set(ex_name, (this.program_ex_map_name5.get(ex_name) +this.repititions))
     }

    })
  })
  }

  //---Sixth day
  //---clear button
  clear6(){
    this.program_ex_map_name6.clear();
  }

  //---add exercise to weakly goal
  onChangeGoalEx6(){

    this.exercises.forEach(ex => this.ex_ids.push(ex.id))

    let choiceEx = $("select[name='selectGoalEx6'] option:selected").index();
    this.ex_id = this.ex_ids[choiceEx-1];

    this.goalDashBoardService.fetchExById(this.ex_id).subscribe((exercise: Exercise[]) =>
    {
        let ex_name = JSON.parse(JSON.stringify(exercise)).name

        console.log(ex_name)
        if(!this.program_ex_map_name6.has(ex_name)){
          this.program_ex_map_name6.set(ex_name,10);
        }else{
          this.program_ex_map_name6.set(ex_name, (this.program_ex_map_name6.get(ex_name) +10))
       }  
      })
  }

  //---add a workout to weekly goal
  onChangeGoalWork6(){
    this.workouts.forEach(workout => this.workout_ids.push(workout.id))

    let choiceWork = $("select[name='selectGoalWork6'] option:selected").index(); 
    this.workout_id = this.workout_ids[choiceWork-1];

    this.goalDashBoardService.fetchWorkoutById(this.workout_id).subscribe((workout: Workout[]) =>
    { 
      this.repititions = JSON.parse(JSON.stringify(workout)).sets[0].exerciseRepetitions
      console.log(this.repititions)

      this.exercises_choosen = JSON.parse(JSON.stringify(workout)).sets[0].exercises
      console.log(this.exercises_choosen)

      this.exercises_choosen.forEach((exercise: Exercise[]) => {
      
      let ex_name = JSON.parse(JSON.stringify(exercise)).name
      
      if(!this.program_ex_map_name6.has(ex_name)){
        this.program_ex_map_name6.set(ex_name, this.repititions);
      }else{
        this.program_ex_map_name6.set(ex_name, (this.program_ex_map_name6.get(ex_name) +this.repititions))
     }

    })
  })
  }

  //---Seventh day
  //---clear button
  clear7(){
    this.program_ex_map_name7.clear();
  }

  //---add exercise to weakly goal
  onChangeGoalEx7(){

    this.exercises.forEach(ex => this.ex_ids.push(ex.id))

    let choiceEx = $("select[name='selectGoalEx7'] option:selected").index();
    this.ex_id = this.ex_ids[choiceEx-1];

    this.goalDashBoardService.fetchExById(this.ex_id).subscribe((exercise: Exercise[]) =>
    {
        let ex_name = JSON.parse(JSON.stringify(exercise)).name

        console.log(ex_name)
        if(!this.program_ex_map_name7.has(ex_name)){
          this.program_ex_map_name7.set(ex_name,10);
        }else{
          this.program_ex_map_name7.set(ex_name, (this.program_ex_map_name7.get(ex_name) +10))
       }  
      })
  }

  //---add a workout to weekly goal
  onChangeGoalWork7(){
    this.workouts.forEach(workout => this.workout_ids.push(workout.id))

    let choiceWork = $("select[name='selectGoalWork7'] option:selected").index(); 
    this.workout_id = this.workout_ids[choiceWork-1];

    this.goalDashBoardService.fetchWorkoutById(this.workout_id).subscribe((workout: Workout[]) =>
    { 
      this.repititions = JSON.parse(JSON.stringify(workout)).sets[0].exerciseRepetitions
      console.log(this.repititions)

      this.exercises_choosen = JSON.parse(JSON.stringify(workout)).sets[0].exercises
      console.log(this.exercises_choosen)

      this.exercises_choosen.forEach((exercise: Exercise[]) => {
      
      let ex_name = JSON.parse(JSON.stringify(exercise)).name
      
      if(!this.program_ex_map_name7.has(ex_name)){
        this.program_ex_map_name7.set(ex_name, this.repititions);
      }else{
        this.program_ex_map_name7.set(ex_name, (this.program_ex_map_name7.get(ex_name) +this.repititions))
     }

    })
  })
  }

  //---commit to build
  commitGoal(){

    $('.program-options').attr('disabled','disabled');
    $('.workout-options').attr('disabled','disabled');
    $('.exercise-options').attr('disabled','disabled');
    $('.clear').attr('disabled','disabled');
    $('.commit-program').attr('disabled','disabled');

    
    localStorage.setItem("day1commit", JSON.stringify(Array.from(this.program_ex_map_name.entries())))
    localStorage.setItem("day2commit", JSON.stringify(Array.from(this.program_ex_map_name2.entries())))
    localStorage.setItem("day3commit", JSON.stringify(Array.from(this.program_ex_map_name3.entries())))
    localStorage.setItem("day4commit", JSON.stringify(Array.from(this.program_ex_map_name4.entries())))
    localStorage.setItem("day5commit", JSON.stringify(Array.from(this.program_ex_map_name5.entries())))
    localStorage.setItem("day6commit", JSON.stringify(Array.from(this.program_ex_map_name6.entries())))
    localStorage.setItem("day7commit", JSON.stringify(Array.from(this.program_ex_map_name7.entries())))
    
     //---start timer
     if(localStorage.getItem("countdown_timer")){
      this.countDownDate = Number(localStorage.getItem("countdown_timer"))
     }else{
      this.countDownDate = new Date().setDate(new Date().getDate()+7);
     }

     //---Update the count down every 1 second
     const sevenDayTimer = setInterval(() => {

       //---Get today's date and time
       let now = new Date().getTime();
       
       let difference = this.countDownDate - now;

        //---Calculations for days, hours, minutes and seconds
       this.days = Math.floor(difference / (1000 * 60 * 60 * 24));
       this.hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
       this.minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
       this.seconds = Math.floor((difference % (1000 * 60)) / 1000);

       localStorage.setItem("countdown_timer", JSON.stringify(this.countDownDate))
       
       //---Switch to different day commits every daily cycle
       if (this.days==6 && this.hours==22 && this.minutes==59 && this.seconds==58){
         
        this.dayCommit = this.program_ex_map_name
        this.dayCommitDisplay = this.program_ex_map_name
        this.dayCommitInitial = this.program_ex_map_name

        this.dayOne = this.oneDate.getFullYear()+"-"+this.oneDate.getMonth()+"-"+this.oneDate.getDate()
        this.dayTwo = this.twoDate.getFullYear()+"-"+this.twoDate.getMonth()+"-"+this.twoDate.getDate()
        this.dayThree = this.threeDate.getFullYear()+"-"+this.threeDate.getMonth()+"-"+this.threeDate.getDate()
        this.dayFour = this.fourDate.getFullYear()+"-"+this.fourDate.getMonth()+"-"+this.fourDate.getDate()
        this.dayFive = this.fiveDate.getFullYear()+"-"+this.fiveDate.getMonth()+"-"+this.fiveDate.getDate()
        this.daySix = this.sixDate.getFullYear()+"-"+this.sixDate.getMonth()+"-"+this.sixDate.getDate()
        this.daySeven = this.sevenDate.getFullYear()+"-"+this.sevenDate.getMonth()+"-"+this.sevenDate.getDate()
             
       }else if(this.days==6 && this.hours==22 && this.minutes==59 && this.seconds==30){

        this.dayCommit = this.program_ex_map_name2
        this.dayCommitDisplay = this.program_ex_map_name2
        this.dayCommitInitial = this.program_ex_map_name2

        localStorage.removeItem("daily_finish")
        this.dailyProgress = 0;
        this.dailyProgress_display= '';

        this.dayOne = this.mtwoDate.getFullYear()+"-"+this.mtwoDate.getMonth()+"-"+this.mtwoDate.getDate()
        this.dayTwo = this.oneDate.getFullYear()+"-"+this.oneDate.getMonth()+"-"+this.oneDate.getDate()
        this.dayThree = this.twoDate.getFullYear()+"-"+this.twoDate.getMonth()+"-"+this.twoDate.getDate()
        this.dayFour = this.threeDate.getFullYear()+"-"+this.threeDate.getMonth()+"-"+this.threeDate.getDate()
        this.dayFive = this.fourDate.getFullYear()+"-"+this.fourDate.getMonth()+"-"+this.fourDate.getDate()
        this.daySix = this.fiveDate.getFullYear()+"-"+this.fiveDate.getMonth()+"-"+this.fiveDate.getDate()
        this.daySeven = this.sixDate.getFullYear()+"-"+this.sixDate.getMonth()+"-"+this.sixDate.getDate()
      
       }else if(this.days===5){
        this.dayCommit = this.program_ex_map_name3
        this.dayCommitDisplay = this.program_ex_map_name3
        this.dayCommitInitial = this.program_ex_map_name3

        this.dayOne = this.mthreeDate.getFullYear()+"-"+this.mthreeDate.getMonth()+"-"+this.mthreeDate.getDate()
        this.dayTwo = this.mtwoDate.getFullYear()+"-"+this.mtwoDate.getMonth()+"-"+this.mtwoDate.getDate()
        this.dayThree = this.oneDate.getFullYear()+"-"+this.oneDate.getMonth()+"-"+this.oneDate.getDate()
        this.dayFour = this.twoDate.getFullYear()+"-"+this.twoDate.getMonth()+"-"+this.twoDate.getDate()
        this.dayFive = this.threeDate.getFullYear()+"-"+this.threeDate.getMonth()+"-"+this.threeDate.getDate()
        this.daySix = this.fourDate.getFullYear()+"-"+this.fourDate.getMonth()+"-"+this.fourDate.getDate()
        this.daySeven = this.fiveDate.getFullYear()+"-"+this.fiveDate.getMonth()+"-"+this.fiveDate.getDate()
       
       }else if(this.days===4){
        this.dayCommit = this.program_ex_map_name4
        this.dayCommitDisplay = this.program_ex_map_name4
        this.dayCommitInitial = this.program_ex_map_name4

        this.dayOne = this.mfourDate.getFullYear()+"-"+this.mfourDate.getMonth()+"-"+this.mfourDate.getDate()
        this.dayTwo = this.mthreeDate.getFullYear()+"-"+this.mthreeDate.getMonth()+"-"+this.mthreeDate.getDate()
        this.dayThree = this.mtwoDate.getFullYear()+"-"+this.mtwoDate.getMonth()+"-"+this.mtwoDate.getDate()
        this.dayFour = this.oneDate.getFullYear()+"-"+this.oneDate.getMonth()+"-"+this.oneDate.getDate()
        this.dayFive = this.twoDate.getFullYear()+"-"+this.twoDate.getMonth()+"-"+this.twoDate.getDate()
        this.daySix = this.threeDate.getFullYear()+"-"+this.threeDate.getMonth()+"-"+this.threeDate.getDate()
        this.daySeven = this.fourDate.getFullYear()+"-"+this.fourDate.getMonth()+"-"+this.fourDate.getDate()
       
       }else if(this.days===3){
        this.dayCommit = this.program_ex_map_name5
        this.dayCommitDisplay = this.program_ex_map_name5
        this.dayCommitInitial = this.program_ex_map_name5
       
        this.dayOne = this.mfiveDate.getFullYear()+"-"+this.mfiveDate.getMonth()+"-"+this.mfiveDate.getDate()
        this.dayTwo = this.mfourDate.getFullYear()+"-"+this.mfourDate.getMonth()+"-"+this.mfourDate.getDate()
        this.dayThree = this.mthreeDate.getFullYear()+"-"+this.mthreeDate.getMonth()+"-"+this.mthreeDate.getDate()
        this.dayFour = this.mtwoDate.getFullYear()+"-"+this.mtwoDate.getMonth()+"-"+this.mtwoDate.getDate()
        this.dayFive = this.oneDate.getFullYear()+"-"+this.oneDate.getMonth()+"-"+this.oneDate.getDate()
        this.daySix = this.twoDate.getFullYear()+"-"+this.twoDate.getMonth()+"-"+this.twoDate.getDate()
        this.daySeven = this.threeDate.getFullYear()+"-"+this.threeDate.getMonth()+"-"+this.threeDate.getDate()


      }else if(this.days===2){
        this.dayCommit = this.program_ex_map_name6
        this.dayCommitDisplay = this.program_ex_map_name6
        this.dayCommitInitial = this.program_ex_map_name6
       
        this.dayOne = this.msixDate.getFullYear()+"-"+this.msixDate.getMonth()+"-"+this.msixDate.getDate()
        this.dayTwo = this.mfiveDate.getFullYear()+"-"+this.mfiveDate.getMonth()+"-"+this.mfiveDate.getDate()
        this.dayThree = this.mfourDate.getFullYear()+"-"+this.mfourDate.getMonth()+"-"+this.mfourDate.getDate()
        this.dayFour = this.mthreeDate.getFullYear()+"-"+this.mthreeDate.getMonth()+"-"+this.mthreeDate.getDate()
        this.dayFive = this.mtwoDate.getFullYear()+"-"+this.mtwoDate.getMonth()+"-"+this.mtwoDate.getDate()
        this.daySix = this.oneDate.getFullYear()+"-"+this.oneDate.getMonth()+"-"+this.oneDate.getDate()
        this.daySeven = this.twoDate.getFullYear()+"-"+this.twoDate.getMonth()+"-"+this.twoDate.getDate()

      }else if(this.days===1){
        this.dayCommit = this.program_ex_map_name7
        this.dayCommitDisplay = this.program_ex_map_name7
        this.dayCommitInitial = this.program_ex_map_name7

        this.dayOne = this.msevenDate.getFullYear()+"-"+this.msevenDate.getMonth()+"-"+this.msevenDate.getDate()
        this.dayTwo = this.msixDate.getFullYear()+"-"+this.msixDate.getMonth()+"-"+this.msixDate.getDate()
        this.dayThree = this.mfiveDate.getFullYear()+"-"+this.mfiveDate.getMonth()+"-"+this.mfiveDate.getDate()
        this.dayFour = this.mfourDate.getFullYear()+"-"+this.mfourDate.getMonth()+"-"+this.mfourDate.getDate()
        this.dayFive = this.mthreeDate.getFullYear()+"-"+this.mthreeDate.getMonth()+"-"+this.mthreeDate.getDate()
        this.daySix = this.mtwoDate.getFullYear()+"-"+this.mtwoDate.getMonth()+"-"+this.mtwoDate.getDate()
        this.daySeven = this.oneDate.getFullYear()+"-"+this.oneDate.getMonth()+"-"+this.oneDate.getDate()
      
      }
       //---Display message when count down is finished
       else if(difference === 0) {
        const message = "Deadline expired";
         $('#commit').removeAttr('disabled');
         $('.NotFinish').removeAttr('disabled');
        localStorage.removeItem("day1commit")
        localStorage.removeItem("day2commit")
        localStorage.removeItem("day3commit")
        localStorage.removeItem("day4commit")
        localStorage.removeItem("day5commit")
        localStorage.removeItem("day6commit")
        localStorage.removeItem("day7commit")
        localStorage.removeItem("countdown_timer");
        }
      }, 1000);
  }
 

  //---Commit finished excersizes
  commitFinish(){

      //---calcualting progress
      if(localStorage.getItem("daily_finish")){
        this.sumExCommited = Number(localStorage.getItem("daily_finish"));
      }else{
        this.sumExCommited = 0;
      }
     
     // this.finishHistory = new Map([...this.finishHistory, ...])
      
      localStorage.setItem("daily_initial_commit", JSON.stringify(Array.from(this.dayCommitInitial.entries())))
      
       this.ex_finish_map_name.forEach(value=> {
          this.sumExCommited += value;
       });


       localStorage.setItem("daily_finish", this.sumExCommited.toString())

       console.log("total finished repititions "+this.sumExCommited)
     

       let sumExInitial = 0;

       this.dayCommitInitial.forEach(value => {
          sumExInitial += value;
       });

       console.log("total initial repititions "+sumExInitial)

       this.dailyProgress = Number((this.sumExCommited/sumExInitial)*100).toFixed(2);
      

       if (Number(this.dailyProgress) < 100){
          this.dailyProgress_display = this.dailyProgress +" percent finished of your daily goal!";
       }else if(Number(this.dailyProgress) >= 100){
          this.dailyProgress_display = "You finished of your daily goal!";
       }


      //---substract finished repititions from goal
       for(let[k1,v1] of this.ex_finish_map_name){
          console.log("day finish keys: "+k1)
          console.log(this.dayCommit)
           for(let[k2,v2] of this.dayCommit){
              console.log("day commit keys: "+k2)
              if(k1===k2){
                this.dayCommit.set(k2,v2-v1)
                if((v2-v1)<=0){
                  this.dayCommit.set(k2,"Completed all ")
                }
              }
            }
        }
       
       this.ex_finish_map_name.clear()
      

       
    localStorage.setItem("day1commit", JSON.stringify(Array.from(this.program_ex_map_name.entries())))
    localStorage.setItem("day2commit", JSON.stringify(Array.from(this.program_ex_map_name2.entries())))
    localStorage.setItem("day3commit", JSON.stringify(Array.from(this.program_ex_map_name3.entries())))
    localStorage.setItem("day4commit", JSON.stringify(Array.from(this.program_ex_map_name4.entries())))
    localStorage.setItem("day5commit", JSON.stringify(Array.from(this.program_ex_map_name5.entries())))
    localStorage.setItem("day6commit", JSON.stringify(Array.from(this.program_ex_map_name6.entries())))
    localStorage.setItem("day7commit", JSON.stringify(Array.from(this.program_ex_map_name7.entries())))
  }
  

 toGoalDetails(){
    this.router.navigateByUrl('/goaldetails');
  }
}

