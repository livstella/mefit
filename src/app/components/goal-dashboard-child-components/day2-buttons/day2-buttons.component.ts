import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-day2-buttons',
  templateUrl: './day2-buttons.component.html',
  styleUrls: ['./day2-buttons.component.css']
})
export class Day2ButtonsComponent implements OnInit {

  @Input() program_ex_map_name2 = new Map(); 

  constructor() { }

  ngOnInit(): void {
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


}
