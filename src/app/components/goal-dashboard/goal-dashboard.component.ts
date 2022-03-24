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
  //workout_sets: Sets[] | undefined ;

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
      
      if (Number(this.weeklyProgress) <= 100){
          this.weeklyProgress_display = this.weeklyProgress;
      }
    }

    //---get daily submitted progress from local storage
    if(localStorage.getItem("daily_finish")){

      this.sumExCommited = Number(localStorage.getItem("daily_finish"))
      this.sumExInitial = Number(localStorage.getItem("daily_initial_commit"))
   
      this.dailyProgress = Number((this.sumExCommited/this.sumExInitial)*100).toFixed(2);

    if (Number(this.dailyProgress) <= 100){
      this.dailyProgress_display = this.dailyProgress;
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

    //---Fetch all programs
    this.programPageService.fetchProgramme();
 
    //---If a goal has allready been commited too.
    if(localStorage.getItem('day1commit')!=null){

      //---disable menus and buttons
      this.disable();

      //---get all daily goals of the week
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

  //---decrement exercise choice by 10
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

  //---decrement exercise choice by 1
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

  //---buttons for each day
  //---day1
   //---increment exercise choice by 10
   increment_day1_10(name:string){
    for(let[k,v] of this.program_ex_map_name){
      if(k === name){
        this.program_ex_map_name.set(k,v+10);
    }}
  }

  //---decrement exercise choice by 10
  decrement_day1_10(name:string){
    for(let[k,v] of this.program_ex_map_name){
      if(k === name){
        this.program_ex_map_name.set(k,v-10);
        if((v-10)<=0){
          this.program_ex_map_name.delete(k);
        }
    }}
  }

  //---increment exercise choice by 1
  increment_day1_1(name:string){
    for(let[k,v] of this.program_ex_map_name){
      if(k === name){
        this.program_ex_map_name.set(k,v+1);
    }}
  }

  //---decrement exercise choice by 1
  decrement_day1_1(name:string){
    for(let[k,v] of this.program_ex_map_name){
      if(k === name){
        this.program_ex_map_name.set(k,v-1);
        if((v-1)<=0){
          this.program_ex_map_name.delete(k);
        }
    }}
  }
  
   //---remove excersize
   remove_day1(name: string){
    for(let[k,v] of this.program_ex_map_name){
      if(k=== name){
        this.program_ex_map_name.delete(k);
      }} 
  }

  //---day2
   //---increment exercise choice by 10
   increment_day2_10(name:string){
    for(let[k,v] of this.program_ex_map_name2){
      if(k === name){
        this.program_ex_map_name2.set(k,v+10);
    }}
  }

  //---decrement exercise choice by 10
  decrement_day2_10(name:string){
    for(let[k,v] of this.program_ex_map_name2){
      if(k === name){
        this.program_ex_map_name2.set(k,v-10);
        if((v-10)<=0){
          this.program_ex_map_name2.delete(k);
        }
    }}
  }

  //---increment exercise choice by 1
  increment_day2_1(name:string){
    for(let[k,v] of this.program_ex_map_name2){
      if(k === name){
        this.program_ex_map_name2.set(k,v+1);
    }}
  }

  //---decrement exercise choice by 1
  decrement_day2_1(name:string){
    for(let[k,v] of this.program_ex_map_name2){
      if(k === name){
        this.program_ex_map_name2.set(k,v-1);
        if((v-1)<=0){
          this.program_ex_map_name2.delete(k);
        }
    }}
  }
  
   //---remove excersize
   remove_day2(name: string){
    for(let[k,v] of this.program_ex_map_name2){
      if(k=== name){
        this.program_ex_map_name2.delete(k);
      }} 
  }

  //---day3
   //---increment exercise choice by 10
   increment_day3_10(name:string){
    for(let[k,v] of this.program_ex_map_name3){
      if(k === name){
        this.program_ex_map_name3.set(k,v+10);
    }}
  }

  //---decrement exercise choice by 10
  decrement_day3_10(name:string){
    for(let[k,v] of this.program_ex_map_name3){
      if(k === name){
        this.program_ex_map_name3.set(k,v-10);
        if((v-10)<=0){
          this.program_ex_map_name3.delete(k);
        }
    }}
  }

  //---increment exercise choice by 1
  increment_day3_1(name:string){
    for(let[k,v] of this.program_ex_map_name3){
      if(k === name){
        this.program_ex_map_name3.set(k,v+1);
    }}
  }

  //---decrement exercise choice by 1
  decrement_day3_1(name:string){
    for(let[k,v] of this.program_ex_map_name3){
      if(k === name){
        this.program_ex_map_name3.set(k,v-1);
        if((v-1)<=0){
          this.program_ex_map_name3.delete(k);
        }
    }}
  }
  
   //---remove excersize
   remove_day3(name: string){
    for(let[k,v] of this.program_ex_map_name3){
      if(k=== name){
        this.program_ex_map_name3.delete(k);
      }} 
  }

  //---day4
   //---increment exercise choice by 10
   increment_day4_10(name:string){
    for(let[k,v] of this.program_ex_map_name4){
      if(k === name){
        this.program_ex_map_name4.set(k,v+10);
    }}
  }

  //---decrement exercise choice by 10
  decrement_day4_10(name:string){
    for(let[k,v] of this.program_ex_map_name4){
      if(k === name){
        this.program_ex_map_name4.set(k,v-10);
        if((v-10)<=0){
          this.program_ex_map_name4.delete(k);
        }
    }}
  }

  //---increment exercise choice by 1
  increment_day4_1(name:string){
    for(let[k,v] of this.program_ex_map_name4){
      if(k === name){
        this.program_ex_map_name4.set(k,v+1);
    }}
  }

  //---decrement exercise choice by 1
  decrement_day4_1(name:string){
    for(let[k,v] of this.program_ex_map_name4){
      if(k === name){
        this.program_ex_map_name4.set(k,v-1);
        if((v-1)<=0){
          this.program_ex_map_name4.delete(k);
        }
    }}
  }
  
   //---remove excersize
   remove_day4(name: string){
    for(let[k,v] of this.program_ex_map_name4){
      if(k=== name){
        this.program_ex_map_name4.delete(k);
      }} 
  }

  //---day5
   //---increment exercise choice by 10
   increment_day5_10(name:string){
    for(let[k,v] of this.program_ex_map_name5){
      if(k === name){
        this.program_ex_map_name5.set(k,v+10);
    }}
  }

  //---decrement exercise choice by 10
  decrement_day5_10(name:string){
    for(let[k,v] of this.program_ex_map_name5){
      if(k === name){
        this.program_ex_map_name5.set(k,v-10);
        if((v-10)<=0){
          this.program_ex_map_name5.delete(k);
        }
    }}
  }

  //---increment exercise choice by 1
  increment_day5_1(name:string){
    for(let[k,v] of this.program_ex_map_name5){
      if(k === name){
        this.program_ex_map_name5.set(k,v+1);
    }}
  }

  //---decrement exercise choice by 1
  decrement_day5_1(name:string){
    for(let[k,v] of this.program_ex_map_name5){
      if(k === name){
        this.program_ex_map_name5.set(k,v-1);
        if((v-1)<=0){
          this.program_ex_map_name5.delete(k);
        }
    }}
  }
  
   //---remove excersize
   remove_day5(name: string){
    for(let[k,v] of this.program_ex_map_name5){
      if(k=== name){
        this.program_ex_map_name5.delete(k);
      }} 
  }

  //---day6
   //---increment exercise choice by 10
   increment_day6_10(name:string){
    for(let[k,v] of this.program_ex_map_name6){
      if(k === name){
        this.program_ex_map_name6.set(k,v+10);
    }}
  }

  //---decrement exercise choice by 10
  decrement_day6_10(name:string){
    for(let[k,v] of this.program_ex_map_name6){
      if(k === name){
        this.program_ex_map_name6.set(k,v-10);
        if((v-10)<=0){
          this.program_ex_map_name6.delete(k);
        }
    }}
  }

  //---increment exercise choice by 1
  increment_day6_1(name:string){
    for(let[k,v] of this.program_ex_map_name6){
      if(k === name){
        this.program_ex_map_name6.set(k,v+1);
    }}
  }

  //---decrement exercise choice by 1
  decrement_day6_1(name:string){
    for(let[k,v] of this.program_ex_map_name6){
      if(k === name){
        this.program_ex_map_name6.set(k,v-1);
        if((v-1)<=0){
          this.program_ex_map_name6.delete(k);
        }
    }}
  }
  
   //---remove excersize
   remove_day6(name: string){
    for(let[k,v] of this.program_ex_map_name6){
      if(k=== name){
        this.program_ex_map_name6.delete(k);
      }} 
  }

   //---day7
   //---increment exercise choice by 10
   increment_day7_10(name:string){
    for(let[k,v] of this.program_ex_map_name7){
      if(k === name){
        this.program_ex_map_name7.set(k,v+10);
    }}
  }

  //---decrement exercise choice by 10
  decrement_day7_10(name:string){
    for(let[k,v] of this.program_ex_map_name7){
      if(k === name){
        this.program_ex_map_name7.set(k,v-10);
        if((v-10)<=0){
          this.program_ex_map_name7.delete(k);
        }
    }}
  }

  //---increment exercise choice by 1
  increment_day7_1(name:string){
    for(let[k,v] of this.program_ex_map_name7){
      if(k === name){
        this.program_ex_map_name7.set(k,v+1);
    }}
  }

  //---decrement exercise choice by 1
  decrement_day7_1(name:string){
    for(let[k,v] of this.program_ex_map_name7){
      if(k === name){
        this.program_ex_map_name7.set(k,v-1);
        if((v-1)<=0){
          this.program_ex_map_name7.delete(k);
        }
    }}
  }
  
   //---remove excersize
   remove_day7(name: string){
    for(let[k,v] of this.program_ex_map_name7){
      if(k=== name){
        this.program_ex_map_name7.delete(k);
      }} 
  }

  //---Weekly goals
  //---when picking a programm from dropdown list
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
      //---day1
      //---fetch exercises from workout
      if(i==0){
        this.goalDashBoardService.fetchWorkoutById(this.workout_ids[i]).subscribe((workout: Workout[]) =>
        { 
        this.repititions = JSON.parse(JSON.stringify(workout)).sets[0].exerciseRepetitions

        this.program_exercises_choosen = JSON.parse(JSON.stringify(workout)).sets[0].exercises
        console.log(this.program_exercises_choosen)

        this.program_exercises_choosen.forEach((exercise: Exercise[]) => {
    
        let ex_name = JSON.parse(JSON.stringify(exercise)).name
    
        //---populate program exercises map of the day
        if(!this.program_ex_map_name.has(ex_name)){
          this.program_ex_map_name.set(ex_name, this.repititions);
        }else{
          this.program_ex_map_name.set(ex_name, (this.program_ex_map_name.get(ex_name) +this.repititions))
   }})})}


        //---day2
        //---fetch exercises from workout
        else if(i==1){
          this.goalDashBoardService.fetchWorkoutById(this.workout_ids[i]).subscribe((workout: Workout[]) =>
        { 
          this.repititions = JSON.parse(JSON.stringify(workout)).sets[0].exerciseRepetitions

          this.program_exercises_choosen = JSON.parse(JSON.stringify(workout)).sets[0].exercises
          console.log(this.program_exercises_choosen)

          this.program_exercises_choosen.forEach((exercise: Exercise[]) => {

          let ex_name = JSON.parse(JSON.stringify(exercise)).name

          //---populate program exercises map of the day
          if(!this.program_ex_map_name2.has(ex_name)){
            this.program_ex_map_name2.set(ex_name, this.repititions);
          }else{
            this.program_ex_map_name2.set(ex_name, (this.program_ex_map_name2.get(ex_name) +this.repititions))
          }})})}

        //---day3
        //---fetch exercises from workout
        else if(i==2){
          this.goalDashBoardService.fetchWorkoutById(this.workout_ids[i]).subscribe((workout: Workout[]) =>
        { 
          this.repititions = JSON.parse(JSON.stringify(workout)).sets[0].exerciseRepetitions

          this.program_exercises_choosen = JSON.parse(JSON.stringify(workout)).sets[0].exercises
          console.log(this.program_exercises_choosen)

          this.program_exercises_choosen.forEach((exercise: Exercise[]) => {

          let ex_name = JSON.parse(JSON.stringify(exercise)).name

          //---populate program exercises map of the day
          if(!this.program_ex_map_name3.has(ex_name)){
            this.program_ex_map_name3.set(ex_name, this.repititions);
          }else{
            this.program_ex_map_name3.set(ex_name, (this.program_ex_map_name3.get(ex_name) +this.repititions))
          }})})}

        //---day4
        //---fetch exercises from workout
        else if(i==3){
            this.goalDashBoardService.fetchWorkoutById(this.workout_ids[i]).subscribe((workout: Workout[]) =>
          { 
            this.repititions = JSON.parse(JSON.stringify(workout)).sets[0].exerciseRepetitions
  
            this.program_exercises_choosen = JSON.parse(JSON.stringify(workout)).sets[0].exercises
            console.log(this.program_exercises_choosen)
  
            this.program_exercises_choosen.forEach((exercise: Exercise[]) => {
  
            let ex_name = JSON.parse(JSON.stringify(exercise)).name
  
            //---populate program exercises map of the day
            if(!this.program_ex_map_name4.has(ex_name)){
              this.program_ex_map_name4.set(ex_name, this.repititions);
            }else{
              this.program_ex_map_name4.set(ex_name, (this.program_ex_map_name4.get(ex_name) +this.repititions))
            }})})}

        //---day5
        //---fetch exercises from workout
        else if(i==4){
              this.goalDashBoardService.fetchWorkoutById(this.workout_ids[i]).subscribe((workout: Workout[]) =>
            { 
              this.repititions = JSON.parse(JSON.stringify(workout)).sets[0].exerciseRepetitions
    
              this.program_exercises_choosen = JSON.parse(JSON.stringify(workout)).sets[0].exercises
              console.log(this.program_exercises_choosen)
    
              this.program_exercises_choosen.forEach((exercise: Exercise[]) => {
    
              let ex_name = JSON.parse(JSON.stringify(exercise)).name
                
              //---populate program exercises map of the day
              if(!this.program_ex_map_name5.has(ex_name)){
                this.program_ex_map_name5.set(ex_name, this.repititions);
              }else{
                this.program_ex_map_name5.set(ex_name, (this.program_ex_map_name5.get(ex_name) +this.repititions))
              }})})}

        //---day6
        //---fetch exercises from workout
        else if(i==5){
                this.goalDashBoardService.fetchWorkoutById(this.workout_ids[i]).subscribe((workout: Workout[]) =>
              { 
                this.repititions = JSON.parse(JSON.stringify(workout)).sets[0].exerciseRepetitions
      
                this.program_exercises_choosen = JSON.parse(JSON.stringify(workout)).sets[0].exercises
                console.log(this.program_exercises_choosen)
      
                this.program_exercises_choosen.forEach((exercise: Exercise[]) => {
      
                let ex_name = JSON.parse(JSON.stringify(exercise)).name
      
                //---populate program exercises map of the day
                if(!this.program_ex_map_name6.has(ex_name)){
                  this.program_ex_map_name6.set(ex_name, this.repititions);
                }else{
                  this.program_ex_map_name6.set(ex_name, (this.program_ex_map_name6.get(ex_name) +this.repititions))
                }})})}

        //---day7
        //---fetch exercises from workout
        else if(i==6){
                  this.goalDashBoardService.fetchWorkoutById(this.workout_ids[i]).subscribe((workout: Workout[]) =>
                { 
                  this.repititions = JSON.parse(JSON.stringify(workout)).sets[0].exerciseRepetitions
        
                  this.program_exercises_choosen = JSON.parse(JSON.stringify(workout)).sets[0].exercises
                  console.log(this.program_exercises_choosen)
        
                  this.program_exercises_choosen.forEach((exercise: Exercise[]) => {
        
                  let ex_name = JSON.parse(JSON.stringify(exercise)).name
        
                  //---populate program exercises map of the day
                  if(!this.program_ex_map_name7.has(ex_name)){
                    this.program_ex_map_name7.set(ex_name, this.repititions);
                  }else{
                    this.program_ex_map_name7.set(ex_name, (this.program_ex_map_name7.get(ex_name) +this.repititions))
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

        //---populate program exercises map of the day
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
      
      //---populate program exercises map of the day
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

        //---populate program exercises map of the day
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
      
      //---populate program exercises map of the day
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

        //---populate program exercises map of the day
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
      
      //---populate program exercises map of the day
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

        //---populate program exercises map of the day
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
      
      //---populate program exercises map of the day
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

        //---populate program exercises map of the day
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
      
      //---populate program exercises map of the day
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

        //---populate program exercises map of the day
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
      
      //---populate program exercises map of the day
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

        //---populate program exercises map of the day
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
      
      //---populate program exercises map of the day
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

    //---disable menus and buttons
    this.disable();

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

    //--disable menus and buttons
    this.disable();

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
          console.log("day finish keys: "+k1)
          console.log(this.dayCommit)
           for(let[k2,v2] of this.dayCommit){
              console.log("day commit keys: "+k2)
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
   if (this.days===6 && this.hours===23 && this.minutes===59 && this.seconds>0){
     
     this.dayCommit = this.program_ex_map_name
     this.dayCommitInitial = new Map(this.program_ex_map_name_in)
     
     this.dayOne = this.oneDate.getFullYear()+"-"+this.oneDate.getMonth()+"-"+this.oneDate.getDate()
     this.dayTwo = this.twoDate.getFullYear()+"-"+this.twoDate.getMonth()+"-"+this.twoDate.getDate()
     this.dayThree = this.threeDate.getFullYear()+"-"+this.threeDate.getMonth()+"-"+this.threeDate.getDate()
     this.dayFour = this.fourDate.getFullYear()+"-"+this.fourDate.getMonth()+"-"+this.fourDate.getDate()
     this.dayFive = this.fiveDate.getFullYear()+"-"+this.fiveDate.getMonth()+"-"+this.fiveDate.getDate()
     this.daySix = this.sixDate.getFullYear()+"-"+this.sixDate.getMonth()+"-"+this.sixDate.getDate()
     this.daySeven = this.sevenDate.getFullYear()+"-"+this.sevenDate.getMonth()+"-"+this.sevenDate.getDate()
          
    }
   //---for day 2
   else if(this.days===5 && this.hours===23 && this.minutes===59 && this.seconds>0){

     if(this.days===5 && this.hours===23 && this.minutes===59 && this.seconds===59){
       localStorage.removeItem("daily_finish")
       this.dailyProgress = 0;
       this.dailyProgress_display= '';
       this.sumExInitial=0;
     }

     this.dayCommit = this.program_ex_map_name2
     this.dayCommitInitial = new Map(this.program_ex_map_name_in2)

     this.dayOne = this.mtwoDate.getFullYear()+"-"+this.mtwoDate.getMonth()+"-"+this.mtwoDate.getDate()
     this.dayTwo = this.oneDate.getFullYear()+"-"+this.oneDate.getMonth()+"-"+this.oneDate.getDate()
     this.dayThree = this.twoDate.getFullYear()+"-"+this.twoDate.getMonth()+"-"+this.twoDate.getDate()
     this.dayFour = this.threeDate.getFullYear()+"-"+this.threeDate.getMonth()+"-"+this.threeDate.getDate()
     this.dayFive = this.fourDate.getFullYear()+"-"+this.fourDate.getMonth()+"-"+this.fourDate.getDate()
     this.daySix = this.fiveDate.getFullYear()+"-"+this.fiveDate.getMonth()+"-"+this.fiveDate.getDate()
     this.daySeven = this.sixDate.getFullYear()+"-"+this.sixDate.getMonth()+"-"+this.sixDate.getDate()
    }

    //---for day 3
    else if(this.days===4 && this.hours===23 && this.minutes===59 && this.seconds>0){

     if(this.days===4 && this.hours===23 && this.minutes===59 && this.seconds===59){
       localStorage.removeItem("daily_finish")
       this.dailyProgress = 0;
       this.dailyProgress_display= '';
       this.sumExInitial=0;
     }

     this.dayCommit = this.program_ex_map_name3
     this.dayCommitInitial = new Map(this.program_ex_map_name_in3)

     this.dayOne = this.mthreeDate.getFullYear()+"-"+this.mthreeDate.getMonth()+"-"+this.mthreeDate.getDate()
     this.dayTwo = this.mtwoDate.getFullYear()+"-"+this.mtwoDate.getMonth()+"-"+this.mtwoDate.getDate()
     this.dayThree = this.oneDate.getFullYear()+"-"+this.oneDate.getMonth()+"-"+this.oneDate.getDate()
     this.dayFour = this.twoDate.getFullYear()+"-"+this.twoDate.getMonth()+"-"+this.twoDate.getDate()
     this.dayFive = this.threeDate.getFullYear()+"-"+this.threeDate.getMonth()+"-"+this.threeDate.getDate()
     this.daySix = this.fourDate.getFullYear()+"-"+this.fourDate.getMonth()+"-"+this.fourDate.getDate()
     this.daySeven = this.fiveDate.getFullYear()+"-"+this.fiveDate.getMonth()+"-"+this.fiveDate.getDate()
    }

   //---for day 4
   else if (this.days===3 && this.hours===23 && this.minutes===59 && this.seconds>0){

     if(this.days===3 && this.hours===23 && this.minutes===59 && this.seconds===59){
       localStorage.removeItem("daily_finish")
       this.dailyProgress = 0;
       this.dailyProgress_display= '';
       this.sumExInitial=0;
     }

     this.dayCommit = this.program_ex_map_name4
     this.dayCommitInitial = new Map(this.program_ex_map_name_in4)

     this.dayOne = this.mfourDate.getFullYear()+"-"+this.mfourDate.getMonth()+"-"+this.mfourDate.getDate()
     this.dayTwo = this.mthreeDate.getFullYear()+"-"+this.mthreeDate.getMonth()+"-"+this.mthreeDate.getDate()
     this.dayThree = this.mtwoDate.getFullYear()+"-"+this.mtwoDate.getMonth()+"-"+this.mtwoDate.getDate()
     this.dayFour = this.oneDate.getFullYear()+"-"+this.oneDate.getMonth()+"-"+this.oneDate.getDate()
     this.dayFive = this.twoDate.getFullYear()+"-"+this.twoDate.getMonth()+"-"+this.twoDate.getDate()
     this.daySix = this.threeDate.getFullYear()+"-"+this.threeDate.getMonth()+"-"+this.threeDate.getDate()
     this.daySeven = this.fourDate.getFullYear()+"-"+this.fourDate.getMonth()+"-"+this.fourDate.getDate()
    
    }

   //---for day 5
   else if(this.days===2 && this.hours===23 && this.minutes===59 && this.seconds>0){

     if(this.days===2 && this.hours===23 && this.minutes===59 && this.seconds===59){
       localStorage.removeItem("daily_finish")
       this.dailyProgress = 0;
       this.dailyProgress_display= '';
       this.sumExInitial=0;
     }

     this.dayCommit = this.program_ex_map_name5
     this.dayCommitInitial = new Map(this.program_ex_map_name_in5)
    
     this.dayOne = this.mfiveDate.getFullYear()+"-"+this.mfiveDate.getMonth()+"-"+this.mfiveDate.getDate()
     this.dayTwo = this.mfourDate.getFullYear()+"-"+this.mfourDate.getMonth()+"-"+this.mfourDate.getDate()
     this.dayThree = this.mthreeDate.getFullYear()+"-"+this.mthreeDate.getMonth()+"-"+this.mthreeDate.getDate()
     this.dayFour = this.mtwoDate.getFullYear()+"-"+this.mtwoDate.getMonth()+"-"+this.mtwoDate.getDate()
     this.dayFive = this.oneDate.getFullYear()+"-"+this.oneDate.getMonth()+"-"+this.oneDate.getDate()
     this.daySix = this.twoDate.getFullYear()+"-"+this.twoDate.getMonth()+"-"+this.twoDate.getDate()
     this.daySeven = this.threeDate.getFullYear()+"-"+this.threeDate.getMonth()+"-"+this.threeDate.getDate()


   }

   //---for day 6
   else if(this.days===1 && this.hours===23 && this.minutes===59 && this.seconds>0){

     if(this.days===1 && this.hours===23 && this.minutes===59 && this.seconds===59){
       localStorage.removeItem("daily_finish")
       this.dailyProgress = 0;
       this.dailyProgress_display= '';
       this.sumExInitial=0;
     }

     this.dayCommit = this.program_ex_map_name6
     this.dayCommitInitial = new Map(this.program_ex_map_name_in6)
    
     this.dayOne = this.msixDate.getFullYear()+"-"+this.msixDate.getMonth()+"-"+this.msixDate.getDate()
     this.dayTwo = this.mfiveDate.getFullYear()+"-"+this.mfiveDate.getMonth()+"-"+this.mfiveDate.getDate()
     this.dayThree = this.mfourDate.getFullYear()+"-"+this.mfourDate.getMonth()+"-"+this.mfourDate.getDate()
     this.dayFour = this.mthreeDate.getFullYear()+"-"+this.mthreeDate.getMonth()+"-"+this.mthreeDate.getDate()
     this.dayFive = this.mtwoDate.getFullYear()+"-"+this.mtwoDate.getMonth()+"-"+this.mtwoDate.getDate()
     this.daySix = this.oneDate.getFullYear()+"-"+this.oneDate.getMonth()+"-"+this.oneDate.getDate()
     this.daySeven = this.twoDate.getFullYear()+"-"+this.twoDate.getMonth()+"-"+this.twoDate.getDate()

   }

   //---for day 7
   else if(this.days===0 && this.hours===23 && this.minutes===59 && this.seconds>0){

     if(this.days===0 && this.hours===23 && this.minutes===59 && this.seconds===59){
       localStorage.removeItem("daily_finish")
       this.dailyProgress = 0;
       this.dailyProgress_display= '';
       this.sumExInitial=0;
     }

     this.dayCommit = this.program_ex_map_name7
     this.dayCommitInitial = new Map(this.program_ex_map_name_in7)

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

