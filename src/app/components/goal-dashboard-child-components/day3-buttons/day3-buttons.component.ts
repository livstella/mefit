import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-day3-buttons',
  templateUrl: './day3-buttons.component.html',
  styleUrls: ['./day3-buttons.component.css']
})
export class Day3ButtonsComponent implements OnInit {

  @Input() program_ex_map_name3 = new Map(); 

  constructor() { }

  ngOnInit(): void {
  }

  //---day3
   //---increment exercise choice by 10
   increment_day3_10(name:string){
    for(let[k,v] of this.program_ex_map_name3){
      if(k === name){
        this.program_ex_map_name3.set(k,v+10);
    }}
  }

  //---decrement exercise choice by 10
  decrement_day3_10(name:string){
    for(let[k,v] of this.program_ex_map_name3){
      if(k === name){
        this.program_ex_map_name3.set(k,v-10);
        if((v-10)<=0){
          this.program_ex_map_name3.delete(k);
        }
    }}
  }

  //---increment exercise choice by 1
  increment_day3_1(name:string){
    for(let[k,v] of this.program_ex_map_name3){
      if(k === name){
        this.program_ex_map_name3.set(k,v+1);
    }}
  }

  //---decrement exercise choice by 1
  decrement_day3_1(name:string){
    for(let[k,v] of this.program_ex_map_name3){
      if(k === name){
        this.program_ex_map_name3.set(k,v-1);
        if((v-1)<=0){
          this.program_ex_map_name3.delete(k);
        }
    }}
  }
  
   //---remove excersize
   remove_day3(name: string){
    for(let[k,v] of this.program_ex_map_name3){
      if(k=== name){
        this.program_ex_map_name3.delete(k);
      }} 
  }

}
