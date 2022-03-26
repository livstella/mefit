import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-commit-finish',
  templateUrl: './commit-finish.component.html',
  styleUrls: ['./commit-finish.component.css']
})
export class CommitFinishComponent implements OnInit {

  //---Used to calculated progress
  //---exercises finished and exercises initially commited to 
  //---per day and per week
  sumExCommited: number = 0;
  sumExInitial = 0;
  weeklyFinish: number =0;
  weeklyGoal = 0;

  //---progress percentage for day and week
  weeklyProgress: number | string | undefined = 0;
  dailyProgress: number | string | undefined = 0;
  weeklyProgress_display: number | string | undefined = 0;
  dailyProgress_display: number | string | undefined = 0;

  @Input() ex_finish_map_name: any;

  //---program exercises
  @Input() program_ex_map_name: any;
  @Input() program_ex_map_name2: any;
  @Input() program_ex_map_name3: any;
  @Input() program_ex_map_name4: any;
  @Input() program_ex_map_name5: any;
  @Input() program_ex_map_name6: any;
  @Input() program_ex_map_name7: any;

  @Input() program_ex_map_name_in: any;
  @Input() program_ex_map_name_in2: any;
  @Input() program_ex_map_name_in3: any;
  @Input() program_ex_map_name_in4: any;
  @Input() program_ex_map_name_in5: any;
  @Input() program_ex_map_name_in6: any;
  @Input() program_ex_map_name_in7: any;


  //---Commits logged an commits finished
  @Input() dayCommit: any;
  @Input() dayCommitInitial: any;

  //---progress
  @Output() daily_progress = new EventEmitter();
  @Output() weekly_progress = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }

  //---Commit finished excersizes
  commitFinish(){

    //---if week already initialized
    //---get finished repititions 
    if(localStorage.getItem("weekly_finish")){
      this.weeklyFinish = Number(localStorage.getItem("weekly_finish"));
    }else{
      this.weeklyFinish=0;
    }

      
    //---If day already initialized
    //---get get finished repititions 
    if(localStorage.getItem("daily_finish")){
      this.sumExCommited = Number(localStorage.getItem("daily_finish"));
    }else{
      this.sumExCommited = 0;
    }
      
     //---Read through exercises logged ad finish and and to finished repititions
     this.ex_finish_map_name.forEach((value: number) => {
          this.sumExCommited += value;
          this.weeklyFinish += value;
       });

       localStorage.setItem("daily_finish", this.sumExCommited.toString())

      //---Read through exercises goals
      //---of the day
      if(this.sumExInitial===0){ 

       this.dayCommitInitial.forEach((value: number) => {
          this.sumExInitial += value;
       });}

       //---commit daily goal to local storage
       localStorage.setItem("daily_initial_commit", this.sumExInitial.toString())
      
       //---calculate daily progress
       this.dailyProgress = Number((this.sumExCommited/this.sumExInitial)*100).toFixed(2);

       //---display daily progress
       if (Number(this.dailyProgress) < 100){
          this.dailyProgress_display = this.dailyProgress +" percent finished of your daily goal!";
       }else if(Number(this.dailyProgress) >= 100){
          this.dailyProgress_display = "You finished of your daily goal!";
       }

       //---calculating weekly progress
       //---Fetch weekly goal
       if (this.weeklyGoal === 0){

       if(this.program_ex_map_name_in.size!=0){
        this.program_ex_map_name_in.forEach((value: number)=> {
        this.weeklyGoal += value;
       })}

       if(this.program_ex_map_name_in2.size!=0){
       this.program_ex_map_name_in2.forEach((value: number)=> {
        this.weeklyGoal += value;
       });}

       if(this.program_ex_map_name_in3.size!=0){
       this.program_ex_map_name_in3.forEach((value: number)=> {
        this.weeklyGoal += value;
       });}

       if(this.program_ex_map_name_in4.size!=0){
       this.program_ex_map_name_in4.forEach((value: number)=> {
        this.weeklyGoal += value;
       });}

       if(this.program_ex_map_name_in5.size!=0){
       this.program_ex_map_name_in5.forEach((value: number)=> {
        this.weeklyGoal += value;
       });}

       if(this.program_ex_map_name_in6.size!=0){
       this.program_ex_map_name_in6.forEach((value: number)=> {
        this.weeklyGoal += value;
       });}

       if(this.program_ex_map_name_in7.size!=0){
       this.program_ex_map_name_in7.forEach((value: number)=> {
        this.weeklyGoal += value;
       });}

      }
       //---calculate weekly progress
       this.weeklyProgress = Number((this.weeklyFinish/this.weeklyGoal)*100).toFixed(2);
      
      //---display weekly progress
       if (Number(this.weeklyProgress) < 100){
          this.weeklyProgress_display = this.weeklyProgress +" percent finished of your weekly goal!";
       }else if(Number(this.weeklyProgress) >= 100){
          this.weeklyProgress_display = "You finished of your weekly goal!";
       }

       //---commit weekly progress to localstorage
       localStorage.setItem("weekly_finish", this.weeklyFinish.toString())
       localStorage.setItem("weekly_goal", this.weeklyGoal.toString())

      //---substract finished repititions from goal repititions
       for(let[k1,v1] of this.ex_finish_map_name){
           for(let[k2,v2] of this.dayCommit){
              if(k1===k2){
                this.dayCommit.set(k2,v2-v1)
                if((v2-v1)<=0){
                  this.dayCommit.set(k2, 0)
                }
              }
            }
        }
       //---clear map of logged finishes
       this.ex_finish_map_name.clear()
    

    //---commit progress of repititions finished to localstorage
    localStorage.setItem("day1commit", JSON.stringify(Array.from(this.program_ex_map_name.entries())))
    localStorage.setItem("day2commit", JSON.stringify(Array.from(this.program_ex_map_name2.entries())))
    localStorage.setItem("day3commit", JSON.stringify(Array.from(this.program_ex_map_name3.entries())))
    localStorage.setItem("day4commit", JSON.stringify(Array.from(this.program_ex_map_name4.entries())))
    localStorage.setItem("day5commit", JSON.stringify(Array.from(this.program_ex_map_name5.entries())))
    localStorage.setItem("day6commit", JSON.stringify(Array.from(this.program_ex_map_name6.entries())))
    localStorage.setItem("day7commit", JSON.stringify(Array.from(this.program_ex_map_name7.entries())))

    this.daily_progress.emit(this.dailyProgress)
    this.weekly_progress.emit(this.weeklyProgress)
  }
}
