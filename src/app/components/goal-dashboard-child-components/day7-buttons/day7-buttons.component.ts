import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-day7-buttons',
  templateUrl: './day7-buttons.component.html',
  styleUrls: ['./day7-buttons.component.css']
})
export class Day7ButtonsComponent implements OnInit {

  @Input() program_ex_map_name7 = new Map();

  constructor() { }

  ngOnInit(): void {
  }

  
   //---day7
   //---increment exercise choice by 10
   increment_day7_10(name:string){
    for(let[k,v] of this.program_ex_map_name7){
      if(k === name){
        this.program_ex_map_name7.set(k,v+10);
    }}
  }

  //---decrement exercise choice by 10
  decrement_day7_10(name:string){
    for(let[k,v] of this.program_ex_map_name7){
      if(k === name){
        this.program_ex_map_name7.set(k,v-10);
        if((v-10)<=0){
          this.program_ex_map_name7.delete(k);
        }
    }}
  }

  //---increment exercise choice by 1
  increment_day7_1(name:string){
    for(let[k,v] of this.program_ex_map_name7){
      if(k === name){
        this.program_ex_map_name7.set(k,v+1);
    }}
  }

  //---decrement exercise choice by 1
  decrement_day7_1(name:string){
    for(let[k,v] of this.program_ex_map_name7){
      if(k === name){
        this.program_ex_map_name7.set(k,v-1);
        if((v-1)<=0){
          this.program_ex_map_name7.delete(k);
        }
    }}
  }
  
   //---remove excersize
   remove_day7(name: string){
    for(let[k,v] of this.program_ex_map_name7){
      if(k=== name){
        this.program_ex_map_name7.delete(k);
      }} 
  }
}
