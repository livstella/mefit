import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-day5-buttons',
  templateUrl: './day5-buttons.component.html',
  styleUrls: ['./day5-buttons.component.css']
})
export class Day5ButtonsComponent implements OnInit {

  @Input() program_ex_map_name5 = new Map(); 

  constructor() { }

  ngOnInit(): void {
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


}
