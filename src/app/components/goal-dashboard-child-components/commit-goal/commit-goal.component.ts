import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-commit-goal',
  templateUrl: './commit-goal.component.html',
  styleUrls: ['./commit-goal.component.css']
})
export class CommitGoalComponent implements OnInit {

  //---intial values
  program_ex_map_name_in = new Map();
  program_ex_map_name_in2 = new Map();
  program_ex_map_name_in3 = new Map();
  program_ex_map_name_in4 = new Map();
  program_ex_map_name_in5 = new Map();
  program_ex_map_name_in6 = new Map();
  program_ex_map_name_in7 = new Map();

  //---timer component
  countDownDate: number = 0;

  //---program exercises
  @Input() program_ex_map_name: any;
  @Input() program_ex_map_name2: any;
  @Input() program_ex_map_name3: any;
  @Input() program_ex_map_name4: any;
  @Input() program_ex_map_name5: any;
  @Input() program_ex_map_name6: any;
  @Input() program_ex_map_name7: any;

  @Output("callTimer") callTimer = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  //---commit to build
  commitGoal(){

    //---commit weekly goal to localstorage
    localStorage.setItem("day1commit", JSON.stringify(Array.from(this.program_ex_map_name.entries())))
    localStorage.setItem("day2commit", JSON.stringify(Array.from(this.program_ex_map_name2.entries())))
    localStorage.setItem("day3commit", JSON.stringify(Array.from(this.program_ex_map_name3.entries())))
    localStorage.setItem("day4commit", JSON.stringify(Array.from(this.program_ex_map_name4.entries())))
    localStorage.setItem("day5commit", JSON.stringify(Array.from(this.program_ex_map_name5.entries())))
    localStorage.setItem("day6commit", JSON.stringify(Array.from(this.program_ex_map_name6.entries())))
    localStorage.setItem("day7commit", JSON.stringify(Array.from(this.program_ex_map_name7.entries())))
    

    //---weekly goal initials
    this.program_ex_map_name_in = new Map(JSON.parse(JSON.stringify(Array.from(this.program_ex_map_name))))
    this.program_ex_map_name_in2 = new Map(JSON.parse(JSON.stringify(Array.from(this.program_ex_map_name2))))
    this.program_ex_map_name_in3 = new Map(JSON.parse(JSON.stringify(Array.from(this.program_ex_map_name3))))
    this.program_ex_map_name_in4 = new Map(JSON.parse(JSON.stringify(Array.from(this.program_ex_map_name4))))
    this.program_ex_map_name_in5 = new Map(JSON.parse(JSON.stringify(Array.from(this.program_ex_map_name5))))
    this.program_ex_map_name_in6 = new Map(JSON.parse(JSON.stringify(Array.from(this.program_ex_map_name6))))
    this.program_ex_map_name_in7 = new Map(JSON.parse(JSON.stringify(Array.from(this.program_ex_map_name7))))

    //---set to local storage
    localStorage.setItem("day1commitInitial", JSON.stringify(Array.from(this.program_ex_map_name_in.entries())))
    localStorage.setItem("day2commitInitial", JSON.stringify(Array.from(this.program_ex_map_name_in2.entries())))
    localStorage.setItem("day3commitInitial", JSON.stringify(Array.from(this.program_ex_map_name_in3.entries())))
    localStorage.setItem("day4commitInitial", JSON.stringify(Array.from(this.program_ex_map_name_in4.entries())))
    localStorage.setItem("day5commitInitial", JSON.stringify(Array.from(this.program_ex_map_name_in5.entries())))
    localStorage.setItem("day6commitInitial", JSON.stringify(Array.from(this.program_ex_map_name_in6.entries())))
    localStorage.setItem("day7commitInitial", JSON.stringify(Array.from(this.program_ex_map_name_in7.entries())))


     //---start timer
     //---if timer already started, fetch the end date
     //---otherwise set end date
     if(localStorage.getItem("countdown_timer")){
      this.countDownDate = Number(localStorage.getItem("countdown_timer"))
     }else{
      this.countDownDate = new Date().setDate(new Date().getDate()+7);
     }
     this.callTimer.emit({param:this.countDownDate});

     location.reload();
    }
    

}
