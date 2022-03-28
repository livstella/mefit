import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-day1-buttons',
  templateUrl: './day1-buttons.component.html',
  styleUrls: ['./day1-buttons.component.css']
})
export class Day1ButtonsComponent implements OnInit {

  //---exercise program per day
  @Input() program_ex_map_name = new Map();  

  constructor() { }

  ngOnInit(): void {
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

}
