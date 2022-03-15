import { getLocaleDateFormat } from '@angular/common';
import { SelectorMatcher } from '@angular/compiler';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { GoalDashbordService } from 'src/app/services/goal-dashbord.service';
import { exercisePageService } from 'src/app/services/exercise-page.service';
import { Exercise } from 'src/app/models/exercise.model';


@Component({
  selector: 'app-goal-dashboard',
  templateUrl: './goal-dashboard.component.html',
  styleUrls: ['./goal-dashboard.component.css']
})
export class GoalDashboardComponent implements OnInit {

  username: string = "Michel"; //placeholder for username
  date = new Date();
  ex: string = '';
  ex_options: string[] = [];
  ex_choice_list: string[] = [];
  ex_finish_list: string[] = [];
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

  constructor(private router: Router, private readonly exercisepageservice :exercisePageService, ) { }

  ngOnInit(): void {
    //Fetches all exercises
    this.exercisepageservice.fetchExercise();
    
    //this.excersize_options.push("Choose an exercise");
    // this.excersize_options.push("lower legs");
    // this.excersize_options.push("upper legs");
    // this.excersize_options.push("lower arms");
    // this.excersize_options.push("upper arms");
    // this.excersize_options.push("lower back");
    // this.excersize_options.push("upper back");
    // this.excersize_options.push("stomach");
    // this.excersize_options.push("chest");
    // this.excersize_options.push("hips");
    // this.excersize_options.push("shoulders");

    this.workout_options.set(["Choose a workout"],null);
    this.workout_options.set("legs",["lower legs","upper legs","lower back","upper back", "hips"]);
    this.workout_options.set("arms",["lower arms","upper arms","stomach","chest", "shoulders"]);

    for (let key of this.workout_options.keys()){
      this.workout_keys.push(key);
    }
    
    this.program_options.set(["Choose a program"],null);
    this.program_options.set("Balance",["legs","arms","legs","arms", "legs","arms"]);
    this.program_options.set("Arms week",["arms","arms","arms"]);
    this.program_options.set("Legs week",["legs","legs","legs"]);
   
    for (let key of this.program_options.keys()){
      this.program_keys.push(key);
    }

  }
  
  get exercises(): Exercise[] {
    return this.exercisepageservice.exercise();
  }


  //---Morning
  //---when picking excersize from dropdown-list display 
  onChangeEx(){
    let choiceEx = $("select[name='select1.1'] option:selected").index();
    if((this.ex_finish_list.length+this.ex_finish_list2.length+this.ex_finish_list3.length)<5 && choiceEx != 0 && (this.ex_choice_list.length+this.ex_choice_list2.length+this.ex_choice_list3.length)<5){
      this.ex_choice_list.push(this.exercises[choiceEx-1].name);
    }
  }

  //---when picking workout from dropdown-list display 
  onChangeWork(){
    let choiceWork = $("select[name='select1.2'] option:selected").index();
    this.workout_key = this.workout_keys[choiceWork];
    this.workout_ex = this.workout_options.get(this.workout_key);
    if (this.ex_choice_list.length == 0 && this.ex_finish_list.length == 0 && choiceWork != 0 && (this.ex_choice_list.length+this.ex_choice_list2.length+this.ex_choice_list3.length)<5){
      for (let i = 0; i<this.workout_ex.length; i++){
        this.ex_choice_list.push(this.workout_ex[i]);}
    }
  }


  //---add excersize to finish list
  updateExFinish(id:number){
    this.ex_finish_list.push(this.ex_choice_list[id]);
    this.ex_choice_list.splice(id,1);
  }

  //---add excersize to planed list
  updateExPlaned(id:number){
    this.ex_choice_list.push(this.ex_finish_list[id]);
    this.ex_finish_list.splice(id,1);
  }

  //---remove excersize
  remove(id:number){
    this.ex_choice_list.splice(id,1);
  }


  //---noon
  //---when picking excersize from dropdown-list display 
  onChangeEx2(){
    let choiceEx = $("select[name='select2.1'] option:selected").index();
    if ((this.ex_finish_list.length+this.ex_finish_list2.length+this.ex_finish_list3.length)<5 && choiceEx != 0 && (this.ex_choice_list.length+this.ex_choice_list2.length+this.ex_choice_list3.length)<5){
      this.ex_choice_list2.push(this.exercises[choiceEx-1].name);
    }
  }

  //---when picking workout from dropdown-list display 
  onChangeWork2(){
    let choiceWork = $("select[name='select2.2'] option:selected").index();
    this.workout_key = this.workout_keys[choiceWork];
    this.workout_ex = this.workout_options.get(this.workout_key);
    if (this.ex_choice_list2.length == 0 && this.ex_finish_list2.length == 0 && choiceWork != 0 && (this.ex_choice_list.length+this.ex_choice_list2.length+this.ex_choice_list3.length)<5){
      for (let i = 0; i<this.workout_ex.length; i++){
        this.ex_choice_list2.push(this.workout_ex[i]);}
    }
  }

  //---add excersize to finish list
  updateExFinish2(id:number){
    this.ex_finish_list2.push(this.ex_choice_list2[id]);
    this.ex_choice_list2.splice(id,1);
  }

  //---add excersize to planed list
  updateExPlaned2(id:number){
    this.ex_choice_list2.push(this.ex_finish_list2[id]);
    this.ex_finish_list2.splice(id,1);
  }

  //---remove excersize
  remove2(id:number){
    this.ex_choice_list2.splice(id,1);
  }

  //---Evening
  //---when picking excersize from dropdown-list display 
  onChangeEx3(){
    let choiceEx = $("select[name='select3.1'] option:selected").index();
    if ((this.ex_finish_list.length+this.ex_finish_list2.length+this.ex_finish_list3.length)<5 && choiceEx != 0 && (this.ex_choice_list.length+this.ex_choice_list2.length+this.ex_choice_list3.length)<5){
    this.ex_choice_list3.push(this.exercises[choiceEx-1].name);
    }
  }

  //---when picking workout from dropdown-list display 
  onChangeWork3(){
    let choiceWork = $("select[name='select3.2'] option:selected").index();
    this.workout_key = this.workout_keys[choiceWork];
    this.workout_ex = this.workout_options.get(this.workout_key);
    if (this.ex_choice_list3.length == 0 && this.ex_finish_list3.length == 0 && choiceWork != 0 && (this.ex_choice_list.length+this.ex_choice_list2.length+this.ex_choice_list3.length)<5){
      for (let i = 0; i<this.workout_ex.length; i++){
        this.ex_choice_list3.push(this.workout_ex[i]);}
    }
  }

  //---add excersize to finish list
  updateExFinish3(id:number){
    this.ex_finish_list3.push(this.ex_choice_list3[id]);
    this.ex_choice_list3.splice(id,1);
  }

  //---add excersize to planed list
  updateExPlaned3(id:number){
    this.ex_choice_list3.push(this.ex_finish_list3[id]);
    this.ex_finish_list3.splice(id,1);
  }

  //---remove excersize
  remove3(id:number){
    this.ex_choice_list3.splice(id,1);
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
    let choiceEx = $("select[name='selectEx'] option:selected").index();
    this.ex = this.ex_options[choiceEx];
    
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

      if( this.mapCount != null){
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

       this.progress = ((this.finishHistory.length/this.mapCount.size)*100).toFixed(2);

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
              if(Number(newValue2)==NaN||Number(newValue2)==0){
                this.mapCountWeekCommitDisplay.set(this.mapCountKeys[i], ["(Initially "+InValue+" routines) All routines Finished"])
              }else{
                this.mapCountWeekCommitDisplay.set(this.mapCountKeys[i], ["(Initially "+InValue+" routines) "+newValue2+": routines left ", " ("+((1-(newValue2/InValue))*100).toFixed(2)+") Percent finished"])
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
  
           // $('#commit').attr('disabled','disabled');
           // $('.NotFinish').attr('disabled','disabled');
  
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


