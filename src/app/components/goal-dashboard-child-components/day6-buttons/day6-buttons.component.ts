import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-day6-buttons',
  templateUrl: './day6-buttons.component.html',
  styleUrls: ['./day6-buttons.component.css']
})
export class Day6ButtonsComponent implements OnInit {


  @Input() program_ex_map_name6 = new Map(); 

  constructor() { }

  ngOnInit(): void {
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

}
