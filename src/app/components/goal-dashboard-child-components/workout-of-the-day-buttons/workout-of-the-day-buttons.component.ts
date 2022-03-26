import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-workout-of-the-day-buttons',
  templateUrl: './workout-of-the-day-buttons.component.html',
  styleUrls: ['./workout-of-the-day-buttons.component.css']
})
export class WorkoutOfTheDayButtonsComponent implements OnInit {

  @Input() ex_choice_map_name = new Map();
  @Input() ex_finish_map_name = new Map();
  @Output() newChoice_Map = new EventEmitter();
  @Output() newFinish_Map = new EventEmitter();
  @Input() dayCommit = new Map();


  constructor() { }

  ngOnInit(): void {
  }

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
    this.newChoice_Map.emit(this.ex_choice_map_name)
    this.newFinish_Map.emit(this.ex_finish_map_name)
  }


  //---add excersize to planed list
  updateExPlaned(name: string){

    for(let[k,v] of this.ex_finish_map_name){
      if(k === name){
        this.ex_choice_map_name.set(k,v);
        this.ex_finish_map_name.delete(k);
      }
    }
    this.newChoice_Map.emit(this.ex_choice_map_name)
    this.newFinish_Map.emit(this.ex_finish_map_name)
  }


  //---remove excersize
  remove(name: string){
    for(let[k,v] of this.ex_choice_map_name){
      if(k=== name){
        this.ex_choice_map_name.delete(k);
      }} 
  }

}
