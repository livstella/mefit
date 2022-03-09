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
    this.workout_options.set("legs",["lower legs","upper legs","lower back","upper back"]);
    this.workout_options.set("arms",["lower arms","upper arms","stomach","chest"]);

    for (let key of this.workout_options.keys()){
      this.workout_keys2.push(key);
    }
    
  }
  //---when picking excersize from dropdown-list display 
  onChangeEx(){
    let choiceEx = $("select[name='select1'] option:selected").index();
    if (this.ex_choice_list.length<5 && this.ex_finish_list.length< 5 && choiceEx != 0){
    this.ex_choice_list.push(this.excersize_options[choiceEx]);
    }else if (this.ex_choice_list.length>=5){
      alert("You cannot choice more than 5 exercizes per session!");
    }
  }

  //---when picking workout from dropdown-list display 
  onChangeWork(){
    let choiceWork = $("select[name='select2'] option:selected").index();
    this.workout_key = this.workout_keys2[choiceWork];
    this.workout_ex = this.workout_options.get(this.workout_key);
    if (this.ex_choice_list.length< 4 && this.ex_finish_list.length< 4 && choiceWork != 0){
      for (let i = 0; i<this.workout_ex.length; i++){
        this.ex_choice_list.push(this.workout_ex[i]);}
    }else if (this.ex_choice_list.length>=4){
      alert("You have to many excersizes in this session to add another workout!, keep it under 6 excersizes per session!");
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

}
