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
  choice_list: string[] = [];
  finish_list: string[] = [];

  constructor() { }

  ngOnInit(): void {
    this.excersize_options.push("Choose an excerize")
    this.excersize_options.push("lower legs")
    this.excersize_options.push("upper legs")
    this.excersize_options.push("lower arm")
    this.excersize_options.push("upper arm")
    this.excersize_options.push("lower back")
    this.excersize_options.push("upper back")
    this.excersize_options.push("stomach")
    this.excersize_options.push("chest")

  }
  //---when picking excersize from dropdown-list display 
  onChange(){
    let choice = $("select[name='select'] option:selected").index();
    if (this.choice_list.length<5 && choice != 0){
    this.choice_list.push(this.excersize_options[choice]);
    }else if (this.choice_list.length>=5){
      alert("You cannot choice more than 5 exercizes per session!");
    }
  }

  //---add excersize to finish list
  updateFinish(id:number){
    this.finish_list.push(this.choice_list[id]);
    this.choice_list.splice(id,1);
  }

  //---add excersize to planed list
  updatePlaned(id:number){
    this.choice_list.push(this.finish_list[id]);
    this.finish_list.splice(id,1);
  }


}
