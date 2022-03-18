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


@Component({
  selector: 'app-goal-dashboard',
  templateUrl: './goal-dashboard.component.html',
  styleUrls: ['./goal-dashboard.component.css']
})
export class GoalDashboardComponent implements OnInit {

  username: string = "Michel"; //placeholder for username
  date = new Date();
  ex: string = '';
  ex_options_names: string[] = [];
  ex_choice_list: string[] = [];
  ex_finish_list: string[] = [];
  ex_choice_map = new Map();
  ex_finish_map = new Map();

  ex_choice_list2: string[] = [];
  ex_finish_list2: string[] = [];
  ex_choice_list3: string[] = [];
  ex_finish_list3: string[] = [];
  
  workout_options = new Map();
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
  finishHistory: string[]=[];

  progress: number | string | undefined = 0;
  progress_display: number | string | undefined = 0;

  mapCountKeys: string[]|any = []; 

  message: string | undefined;
  
  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;

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


  constructor(private router: Router, private readonly exercisePageService :exercisePageService, private readonly workoutPageService: WorkoutPageService, private readonly programPageService: ProgrammePageService) { }

  ngOnInit(): void {
    
    //---Fetch all exercises
    this.exercisePageService.fetchExercise();

    //---Fetch all workouts
    this.workoutPageService.fetchWorkout();

    //---Fetch all programs
    this.programPageService.fetchProgramme();

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
    this.exercises.forEach(ex => this.ex_options_names.push(ex.name))

    let choiceEx = $("select[name='select1.1'] option:selected").index();
    this.ex = this.ex_options_names[choiceEx-1];
    if (this.ex_choice_map.has(this.ex)) {
         this.ex_choice_map.set(this.ex, this.ex_choice_map.get(this.ex) + 1);
    } else {
         this.ex_choice_map.set(this.ex,1); // Map to capture Count of elements
    }
    
  }
  

  //---when picking workout from dropdown-list display 
  onChangeWork(){
    let choiceWork = $("select[name='select1.2'] option:selected").index();
    if((this.ex_finish_list.length+this.ex_finish_list2.length+this.ex_finish_list3.length)<5 && choiceWork != 0 && (this.ex_choice_list.length+this.ex_choice_list2.length+this.ex_choice_list3.length)<5){
      this.ex_choice_list.push(this.workouts[choiceWork-1].name);
    }
  }

  // onChangeWork(){
  //   let choiceWork = $("select[name='select1.2'] option:selected").index();
  //   this.workout_key = this.workout_keys[choiceWork];
  //   this.workout_ex = this.workout_options.get(this.workout_key);
  //   if (this.ex_choice_list.length == 0 && this.ex_finish_list.length == 0 && choiceWork != 0 && (this.ex_choice_list.length+this.ex_choice_list2.length+this.ex_choice_list3.length)<5){
  //     for (let i = 0; i<this.workout_ex.length; i++){
  //       this.ex_choice_list.push(this.workout_ex[i]);}
  //   }
  // }


  //---add excersize to finish list
  updateExFinish(name:string){
    if (this.ex_finish_map.has(name)) {
      this.ex_finish_map.set(name, this.ex_finish_map.get(name) + 1);
    }else {
      this.ex_finish_map.set(name,1); // Map to capture Count of elements
    }
    this.ex_choice_map.set(name, this.ex_choice_map.get(name)-1);
    if(this.ex_choice_map.get(name)==0){
      this.ex_choice_map.delete(name);
    }
  }

  //---add excersize to planed list
  updateExPlaned(name:string){
    if (this.ex_choice_map.has(name)) {
      this.ex_choice_map.set(name, this.ex_choice_map.get(name) + 1);
    }else {
      this.ex_choice_map.set(name,1); // Map to capture Count of elements
    }
    this.ex_finish_map.set(name, this.ex_finish_map.get(name)-1);
    if(this.ex_finish_map.get(name)==0){
      this.ex_finish_map.delete(name);
    }
  }

  //---remove excersize
  remove(name:string){
    this.ex_choice_map.set(name, this.ex_choice_map.get(name)-1);
    if(this.ex_choice_map.get(name)==0){
      this.ex_choice_map.delete(name);

    }
  }


  //---Weekly goals
  onChangeProgram(){

    let choiceProgram = $("select[name='selectProgram'] option:selected").index();
    this.program_key = this.program_keys[choiceProgram];
    this.program_work = this.program_options.get(this.program_key); //---have a list of workouts

    for(let i = 0; i <this.program_work.length;i++){
      this.program_ex.push(this.workout_options.get(this.program_work[i]));
    }
    this.program_ex = this.program_ex.flat();

    for (let i = 0; i < this.program_ex.length; i++) {
            if (this.mapCount.has(this.program_ex[i])) {
                this.mapCount.set(this.program_ex[i], this.mapCount.get(this.program_ex[i]) + 1);
            }
            else {
                this.mapCount.set(this.program_ex[i],1); // Map to capture Count of elements
            }
        }
  }

  onChangeWorkout(){
    let choiceworkout = $("select[name='selectWorkout'] option:selected").index();
    this.workout_key = this.workout_keys[choiceworkout];
    this.workout_ex_commit = this.workout_options.get(this.workout_key);

    for (let i = 0; i < this.workout_ex_commit.length; i++) {
      if (this.mapCount.has(this.workout_ex_commit[i])) {
          this.mapCount.set(this.workout_ex_commit[i], this.mapCount.get(this.workout_ex_commit[i]) + 1);
      }
      else {
          this.mapCount.set(this.workout_ex_commit[i],1); // Map to capture Count of elements
      }
  }
  }

  onChangeExcersize(){

    this.exercises.forEach(ex => this.ex_options_names.push(ex.name))

    let choiceEx = $("select[name='selectEx'] option:selected").index();
    this.ex = this.ex_options_names[choiceEx-1];
    
    if (this.mapCount.has(this.ex)) {
        this.mapCount.set(this.ex, this.mapCount.get(this.ex) + 1);
      }
      else {
        this.mapCount.set(this.ex,1); // Map to capture Count of elements
      }
  }

  //---clear program
  clearProgram(){
    this.mapCount.clear();
    this.program_ex.length = 0;
  } 
  
  //---commit program
  commitProgram(){
    if (this.mapCountWeekCommit.size == 0){

    if(this.mapCount.size != 0){
      //---Copy maps of excersizes for further processing
      this.mapCountWeekInitial = new Map(JSON.parse(JSON.stringify(Array.from(this.mapCount))));
      this.mapCountWeekCommit = new Map(JSON.parse(JSON.stringify(Array.from(this.mapCount))));
      this.mapCountWeekCommitDisplay = new Map(JSON.parse(JSON.stringify(Array.from(this.mapCount))));

      //---start timer
     const countDownDate = new Date().setDate(new Date().getDate()+7);

     //---Update the count down every 1 second
     const sevenDayTimer = setInterval(() => {

       //---Get today's date and time
       let now = new Date().getTime();

       //---Find the distance between now and the count down date
       let difference = countDownDate - now;

       //---Calculations for days, hours, minutes and seconds
       this.days = Math.floor(difference / (1000 * 60 * 60 * 24));
       this.hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
       this.minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
       this.seconds = Math.floor((difference % (1000 * 60)) / 1000);

       //---Open goal dashboard every time cycle
       if (this.seconds==30){
          $('#commit').removeAttr('disabled');
          $('.NotFinish').removeAttr('disabled');
          this.ex_finish_list = [];
          this.ex_finish_list2 = [];
          this.ex_finish_list3 = [];
          this.total_finish_list = [];         
       }

       //---Display message when count down is finished
       if (difference == 0) {
        const message = "Deadline expired";
        }
       }, 1000);

      }else{
        alert("Please pick a program!")
      }
      }else{
        alert("You can only be commited to one program per week!")
    }
    
  }

  //---Commit finished excersizes
  commitFinish(){
    if(this.mapCountWeekCommit.size != 0){
       this.total_finish_list = this.ex_finish_list.concat(this.ex_finish_list2);
       this.total_finish_list = this.total_finish_list.concat(this.ex_finish_list3);
      
       this.finishHistory = this.finishHistory.concat(this.total_finish_list);

       let sumEx = 0;

       this.mapCountWeekInitial.forEach(value => {
          sumEx += value;
       });

       this.progress = ((this.finishHistory.length/sumEx)*100).toFixed(2);
      

       if (Number(this.progress) <= 100){
          this.progress_display = this.progress +" percent finished of you weekly goal!";

          //---update goals based on finish commits
          if(this.total_finish_list.length == 5 && this.ex_choice_list.length == 0 && this.ex_choice_list2.length == 0 && this.ex_choice_list3.length == 0){

            for (let i = 0; i < this.total_finish_list.length;i++){
              let newValue = this.mapCountWeekCommit.get(this.total_finish_list[i])-1;
                this.mapCountWeekCommit.set(this.total_finish_list[i], newValue)
                
            }
  
            for (let key of this.mapCountWeekCommit.keys()){
              this.mapCountKeys.push(key);
            }
  
            for(let i = 0; i<this.mapCountKeys.length;i++){
              let InValue = this.mapCountWeekInitial.get(this.mapCountKeys[i]) 
              let newValue2 = this.mapCountWeekCommit.get(this.mapCountKeys[i])
              this.progress_small = Number(((1-(newValue2/InValue))*100).toFixed(2))
              if(Number(newValue2)==NaN||Number(newValue2)==0){
                this.mapCountWeekCommitDisplay.set(this.mapCountKeys[i], ["(Initially "+InValue+" routines) All routines Finished"])
              }else{
                this.mapCountWeekCommitDisplay.set(this.mapCountKeys[i], ["(Initially "+InValue+" routines) "+newValue2+": routines left ", " ("+this.progress_small+") Percent finished"])
              }
            }
                
            if (Number(this.progress) == 100){
                  this.body = {
                               timeStamp: new Date().getFullYear()+"-"+new Date().getMonth()+"-"+new Date().getDate(),
                               program: this.program_key, 
                               ex: JSON.stringify(Object.fromEntries(this.mapCountWeekInitial)),
                              };
              
                  let index = 'first';
                  this.finishedGoals.set(index, this.body);

                  localStorage.setItem("finished-goals", JSON.stringify(Object.fromEntries(this.finishedGoals)))
                 
                  //this.response = localStorage.getItem('finished-goals')||'{}'

                  // alert("code 1")
                  
                  
                  // alert(this.response) //---works

                  // this.newObj = JSON.parse(this.response)
                 
                  // alert("code 2")

                  // alert(this.newObj)

                  // //this.newMap = new Map(this.newObj.map((entry: { timeStamp: any; program: any; }) => [entry.timeStamp, entry.program]))   
                  // this.newMap = new Map(Object.entries(this.newObj))

                  // alert("code 3")
                  // alert(this.newMap)

                  // alert(this.newMap.get('first').ex) //--works

                  // alert("code 4")
                  // //let responseEx = this.newMap.get('first').ex

                  // //---alert an exercise
                  // //this.newObj2 = JSON.parse(responseEx)
                  // //this.newMap2 = new Map(Object.entries(this.newObj2))

                  // //alert(this.newMap2.get("upper arms"))
            }
  
            //$('#commit').attr('disabled','disabled');
            //$('.NotFinish').attr('disabled','disabled');
  
         }else{
            alert("only commit finished when workout is finished! Choose all allowed excersizes")
      }


       }else{
          this.progress_display = "You finished your weekly goal!"
       }
      }else{
          alert("Choose a weekly goal first!")
       }
  }
  
  toGoalDetails(){
    this.router.navigateByUrl('/goaldetails');
  }
}


