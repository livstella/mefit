import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-goal-dashboard',
  templateUrl: './goal-dashboard.component.html',
  styleUrls: ['./goal-dashboard.component.css']
})
export class GoalDashboardComponent implements OnInit {

  username: string = "Michel"; //placeholder for username
  date = new Date();
  excersize_options: string[] = [];
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
  
  program_options = new Map();
  program_keys: string[]|any = [] ;
  program_key: string | undefined;
  program_work: string[] = [];
  program_ex: string[] = [];
  
  mapCount = new Map();
  mapCountCommit = new Map();

  constructor() { }

  ngOnInit(): void {
    this.excersize_options.push("Choose an excerize");
    this.excersize_options.push("lower legs");
    this.excersize_options.push("upper legs");
    this.excersize_options.push("lower arms");
    this.excersize_options.push("upper arms");
    this.excersize_options.push("lower back");
    this.excersize_options.push("upper back");
    this.excersize_options.push("stomach");
    this.excersize_options.push("chest");

    this.workout_options.set(["Choose a workout"],null);
    this.workout_options.set("legs",["lower legs","upper legs","lower back","upper back", "hips"]);
    this.workout_options.set("arms",["lower arms","upper arms","stomach","chest", "shoulders"]);

    for (let key of this.workout_options.keys()){
      this.workout_keys.push(key);
    }
    
    this.program_options.set(["Choose a program"],null);
    this.program_options.set("Balance",["legs","arms","legs","arms", "legs","arms"]);
    this.program_options.set("Only arms",["arms","arms","arms"]);
    this.program_options.set("Only legs",["legs","legs","legs"]);
   
    for (let key of this.program_options.keys()){
      this.program_keys.push(key);
    }

  }
  //---Morning
  //---when picking excersize from dropdown-list display 
  onChangeEx(){
    let choiceEx = $("select[name='select1.1'] option:selected").index();
    if (this.ex_choice_list.length<5 && this.ex_finish_list.length == 0 && choiceEx != 0 && (this.ex_choice_list.length+this.ex_choice_list2.length+this.ex_choice_list3.length)<5){
    this.ex_choice_list.push(this.excersize_options[choiceEx]);
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
    if (this.ex_choice_list2.length<5 && this.ex_finish_list2.length == 0 && choiceEx != 0 && (this.ex_choice_list.length+this.ex_choice_list2.length+this.ex_choice_list3.length)<5){
    this.ex_choice_list2.push(this.excersize_options[choiceEx]);
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
    if (this.ex_choice_list3.length<5 && this.ex_finish_list3.length == 0 && choiceEx != 0 && (this.ex_choice_list.length+this.ex_choice_list2.length+this.ex_choice_list3.length)<5){
    this.ex_choice_list3.push(this.excersize_options[choiceEx]);
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

    this.mapCount.clear();
    this.program_ex.length = 0; 

    let choiceProgram = $("select[name='selectProgram'] option:selected").index();
    this.program_key = this.program_keys[choiceProgram];
    this.program_work = this.program_options.get(this.program_key); //---have a list of workouts

    for(let i = 0; i <this.program_work.length;i++){
      this.program_ex.push(this.workout_options.get(this.program_work[i]));
    }
    this.program_ex = this.program_ex.flat();

    this.mapCount.clear();
    for (let i = 0; i < this.program_ex.length; i++) {
            if (this.mapCount.has(this.program_ex[i])) {
                this.mapCount.set(this.program_ex[i], this.mapCount.get(this.program_ex[i]) + 1);
            }
            else {
                this.mapCount.set(this.program_ex[i],1); // Map to capture Count of elements
            }
        }
  }
  //---remove program
  commitProgram(){
    if (this.mapCountCommit.size == 0){
      this.mapCountCommit = new Map(JSON.parse(JSON.stringify(Array.from(this.mapCount))));
    }else{
      alert("You can only be commited to one program per week!")
    }
    
  }
}