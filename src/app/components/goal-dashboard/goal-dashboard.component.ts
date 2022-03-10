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
  workout_keys2: string[]|any = [];
  workout_key: string | undefined;
  workout_ex: string[] = [];


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
      this.workout_keys2.push(key);
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
    this.workout_key = this.workout_keys2[choiceWork];
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
    this.workout_key = this.workout_keys2[choiceWork];
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
    this.workout_key = this.workout_keys2[choiceWork];
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

}
