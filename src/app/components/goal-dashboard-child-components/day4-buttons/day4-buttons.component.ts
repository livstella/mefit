import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-day4-buttons',
  templateUrl: './day4-buttons.component.html',
  styleUrls: ['./day4-buttons.component.css']
})
export class Day4ButtonsComponent implements OnInit {

  @Input() program_ex_map_name4 = new Map(); 

  constructor() { }

  ngOnInit(): void {
  }
  //---day4
   //---increment exercise choice by 10
   increment_day4_10(name:string){
    for(let[k,v] of this.program_ex_map_name4){
      if(k === name){
        this.program_ex_map_name4.set(k,v+10);
    }}
  }

  //---decrement exercise choice by 10
  decrement_day4_10(name:string){
    for(let[k,v] of this.program_ex_map_name4){
      if(k === name){
        this.program_ex_map_name4.set(k,v-10);
        if((v-10)<=0){
          this.program_ex_map_name4.delete(k);
        }
    }}
  }

  //---increment exercise choice by 1
  increment_day4_1(name:string){
    for(let[k,v] of this.program_ex_map_name4){
      if(k === name){
        this.program_ex_map_name4.set(k,v+1);
    }}
  }

  //---decrement exercise choice by 1
  decrement_day4_1(name:string){
    for(let[k,v] of this.program_ex_map_name4){
      if(k === name){
        this.program_ex_map_name4.set(k,v-1);
        if((v-1)<=0){
          this.program_ex_map_name4.delete(k);
        }
    }}
  }
  
   //---remove excersize
   remove_day4(name: string){
    for(let[k,v] of this.program_ex_map_name4){
      if(k=== name){
        this.program_ex_map_name4.delete(k);
      }} 
  }


}
