import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-start-timer',
  templateUrl: './start-timer.component.html',
  styleUrls: ['./start-timer.component.css']
})
export class StartTimerComponent implements OnInit {

  //---Strings to be displayed in html
  dayOne: string = ''; 
  dayTwo: string ='';
  dayThree: string ='';
  dayFour: string ='';
  dayFive: string ='';
  daySix: string ='';
  daySeven: string ='';

  //---dates from 7 day head and 7 days behind
  mtwoDate = new Date();
  mthreeDate = new Date();
  mfourDate = new Date();
  mfiveDate = new Date();
  msixDate = new Date();
  msevenDate = new Date();
  oneDate = new Date();
  twoDate = new Date();
  threeDate = new Date();
  fourDate = new Date();
  fiveDate = new Date();
  sixDate = new Date();
  sevenDate = new Date();

  //---timer components
  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  countDownDate: number = 0;
  message: string | undefined;

  //---Commits logged an commits finished
  dayCommit = new Map();
  dayCommitInitial = new Map();

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

  //---progress
  @Output() daily_progress = new EventEmitter();
  @Output() daily_progress_display = new EventEmitter();
  @Output() sum_ex_initial = new EventEmitter();
  
  @Output() day_Commits = new EventEmitter();
  @Output() day_Commits_Initial = new EventEmitter();

  sumExInitial = 0;
  dailyProgress: number | string | undefined = 0;
  dailyProgress_display: number | string | undefined = 0;
  
  //---call uncommit method
  @Output("unCommit") unCommit = new EventEmitter();

  constructor() { }

  ngOnInit(): void {

  }

  startTimer(value : number){
    //---Update the count down every 1 second
    const sevenDayTimer = setInterval(() => {
  
      //---disable buttons and menues
      $('.program-options').attr('disabled','disabled');
      $('.workout-options').attr('disabled','disabled');
      $('.exercise-options').attr('disabled','disabled');
      $('.clear').attr('disabled','disabled');
      $('.commit-program').attr('disabled','disabled');
      $('.day-buttons').attr('disabled','disabled');
  
      //---Get today's date and time
      let now = new Date().getTime();
      
      this.countDownDate = value;
      //---calculate difference between end date and now
      let difference = this.countDownDate - now;
  
       //---Calculations for days, hours, minutes and seconds
      this.days = Math.floor(difference / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))+1;
      this.minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((difference % (1000 * 60)) / 1000);
  
      //---commit end date to localstorage
      localStorage.setItem("countdown_timer", JSON.stringify(this.countDownDate))
  
      //---Switch to different day commits every daily cycle
     //---for day 1
     if (this.days===6 && this.hours>0 && this.minutes>0 && this.seconds>0){
       
      //---commits of day
       this.dayCommit = this.program_ex_map_name
       this.dayCommitInitial = new Map(this.program_ex_map_name_in)
       
       this.day_Commits.emit(this.dayCommit)
       this.day_Commits_Initial.emit(this.dayCommitInitial)
       
       //--set dates
       this.dayOne = this.oneDate.getFullYear()+"-"+(this.oneDate.getMonth()+1)+"-"+this.oneDate.getDate()
       this.dayTwo = this.twoDate.getFullYear()+"-"+(this.twoDate.getMonth()+1)+"-"+this.twoDate.getDate()
       this.dayThree = this.threeDate.getFullYear()+"-"+(this.threeDate.getMonth()+1)+"-"+this.threeDate.getDate()
       this.dayFour = this.fourDate.getFullYear()+"-"+(this.fourDate.getMonth()+1)+"-"+this.fourDate.getDate()
       this.dayFive = this.fiveDate.getFullYear()+"-"+(this.fiveDate.getMonth()+1)+"-"+this.fiveDate.getDate()
       this.daySix = this.sixDate.getFullYear()+"-"+(this.sixDate.getMonth()+1)+"-"+this.sixDate.getDate()
       this.daySeven = this.sevenDate.getFullYear()+"-"+(this.sevenDate.getMonth()+1)+"-"+this.sevenDate.getDate()
            
      }
     //---for day 2
     else if(this.days===5 && this.hours>0 && this.minutes>0 && this.seconds>0){
  
      //---reset daily progrerss
       if(this.days===5 && this.hours===23 && this.minutes===59 && this.seconds===59){
         localStorage.removeItem("daily_finish")
         this.dailyProgress = 0;
         this.dailyProgress_display= '';
         this.sumExInitial=0;

         this.daily_progress.emit(this.dailyProgress)
         this.daily_progress_display.emit(this.dailyProgress_display)
         this.sum_ex_initial.emit(this.sumExInitial)
       }
  
       //---commits of day
       this.dayCommit = this.program_ex_map_name2
       this.dayCommitInitial = new Map(this.program_ex_map_name_in2)

       this.day_Commits.emit(this.dayCommit)
       this.day_Commits_Initial.emit(this.dayCommitInitial)
  
       //---set dates
       this.dayOne = this.mtwoDate.getFullYear()+"-"+(this.mtwoDate.getMonth()+1)+"-"+this.mtwoDate.getDate()
       this.dayTwo = this.oneDate.getFullYear()+"-"+(this.oneDate.getMonth()+1)+"-"+this.oneDate.getDate()
       this.dayThree = this.twoDate.getFullYear()+"-"+(this.twoDate.getMonth()+1)+"-"+this.twoDate.getDate()
       this.dayFour = this.threeDate.getFullYear()+"-"+(this.threeDate.getMonth()+1)+"-"+this.threeDate.getDate()
       this.dayFive = this.fourDate.getFullYear()+"-"+(this.fourDate.getMonth()+1)+"-"+this.fourDate.getDate()
       this.daySix = this.fiveDate.getFullYear()+"-"+(this.fiveDate.getMonth()+1)+"-"+this.fiveDate.getDate()
       this.daySeven = this.sixDate.getFullYear()+"-"+(this.sixDate.getMonth()+1)+"-"+this.sixDate.getDate()
      }
  
      //---for day 3
      else if(this.days===4 && this.hours>0 && this.minutes>0 && this.seconds>0){
  
      //---reset daily progress
       if(this.days===4 && this.hours===23 && this.minutes===59 && this.seconds===59){
         localStorage.removeItem("daily_finish")
         this.dailyProgress = 0;
         this.dailyProgress_display= '';
         this.sumExInitial=0;

         this.daily_progress.emit(this.dailyProgress)
         this.daily_progress_display.emit(this.dailyProgress_display)
         this.sum_ex_initial.emit(this.sumExInitial)
       }
  
       //---commits of day
       this.dayCommit = this.program_ex_map_name3
       this.dayCommitInitial = new Map(this.program_ex_map_name_in3)

       this.day_Commits.emit(this.dayCommit)
       this.day_Commits_Initial.emit(this.dayCommitInitial)
  
       //---set dates
       this.dayOne = this.mthreeDate.getFullYear()+"-"+(this.mthreeDate.getMonth()+1)+"-"+this.mthreeDate.getDate()
       this.dayTwo = this.mtwoDate.getFullYear()+"-"+(this.mtwoDate.getMonth()+1)+"-"+this.mtwoDate.getDate()
       this.dayThree = this.oneDate.getFullYear()+"-"+(this.oneDate.getMonth()+1)+"-"+this.oneDate.getDate()
       this.dayFour = this.twoDate.getFullYear()+"-"+(this.twoDate.getMonth()+1)+"-"+this.twoDate.getDate()
       this.dayFive = this.threeDate.getFullYear()+"-"+(this.threeDate.getMonth()+1)+"-"+this.threeDate.getDate()
       this.daySix = this.fourDate.getFullYear()+"-"+(this.fourDate.getMonth()+1)+"-"+this.fourDate.getDate()
       this.daySeven = this.fiveDate.getFullYear()+"-"+(this.fiveDate.getMonth()+1)+"-"+this.fiveDate.getDate()
      }
  
     //---for day 4
     else if (this.days===3 && this.hours>0 && this.minutes>0 && this.seconds>0){
  
      //---reset daily progress
       if(this.days===3 && this.hours===23 && this.minutes===59 && this.seconds===59){
         localStorage.removeItem("daily_finish")
         this.dailyProgress = 0;
         this.dailyProgress_display= '';
         this.sumExInitial=0;

         this.daily_progress.emit(this.dailyProgress)
         this.daily_progress_display.emit(this.dailyProgress_display)
         this.sum_ex_initial.emit(this.sumExInitial)
       }
  
       //---commits of day
       this.dayCommit = this.program_ex_map_name4
       this.dayCommitInitial = new Map(this.program_ex_map_name_in4)

       this.day_Commits.emit(this.dayCommit)
       this.day_Commits_Initial.emit(this.dayCommitInitial)
  
       //---set dates
       this.dayOne = this.mfourDate.getFullYear()+"-"+(this.mfourDate.getMonth()+1)+"-"+this.mfourDate.getDate()
       this.dayTwo = this.mthreeDate.getFullYear()+"-"+(this.mthreeDate.getMonth()+1)+"-"+this.mthreeDate.getDate()
       this.dayThree = this.mtwoDate.getFullYear()+"-"+(this.mtwoDate.getMonth()+1)+"-"+this.mtwoDate.getDate()
       this.dayFour = this.oneDate.getFullYear()+"-"+(this.oneDate.getMonth()+1)+"-"+this.oneDate.getDate()
       this.dayFive = this.twoDate.getFullYear()+"-"+(this.twoDate.getMonth()+1)+"-"+this.twoDate.getDate()
       this.daySix = this.threeDate.getFullYear()+"-"+(this.threeDate.getMonth()+1)+"-"+this.threeDate.getDate()
       this.daySeven = this.fourDate.getFullYear()+"-"+(this.fourDate.getMonth()+1)+"-"+this.fourDate.getDate()
      
      }
  
     //---for day 5
     else if(this.days===2 && this.hours>0 && this.minutes>0 && this.seconds>0){
  
      //---reset daily progress
       if(this.days===2 && this.hours===23 && this.minutes===59 && this.seconds===59){
         localStorage.removeItem("daily_finish")
         this.dailyProgress = 0;
         this.dailyProgress_display= '';
         this.sumExInitial=0;

         this.daily_progress.emit(this.dailyProgress)
         this.daily_progress_display.emit(this.dailyProgress_display)
         this.sum_ex_initial.emit(this.sumExInitial)
       }
  
       //---commits of day
       this.dayCommit = this.program_ex_map_name5
       this.dayCommitInitial = new Map(this.program_ex_map_name_in5)

       this.day_Commits.emit(this.dayCommit)
       this.day_Commits_Initial.emit(this.dayCommitInitial)
      
       //---set dates
       this.dayOne = this.mfiveDate.getFullYear()+"-"+(this.mfiveDate.getMonth()+1)+"-"+this.mfiveDate.getDate()
       this.dayTwo = this.mfourDate.getFullYear()+"-"+(this.mfourDate.getMonth()+1)+"-"+this.mfourDate.getDate()
       this.dayThree = this.mthreeDate.getFullYear()+"-"+(this.mthreeDate.getMonth()+1)+"-"+this.mthreeDate.getDate()
       this.dayFour = this.mtwoDate.getFullYear()+"-"+(this.mtwoDate.getMonth()+1)+"-"+this.mtwoDate.getDate()
       this.dayFive = this.oneDate.getFullYear()+"-"+(this.oneDate.getMonth()+1)+"-"+this.oneDate.getDate()
       this.daySix = this.twoDate.getFullYear()+"-"+(this.twoDate.getMonth()+1)+"-"+this.twoDate.getDate()
       this.daySeven = this.threeDate.getFullYear()+"-"+(this.threeDate.getMonth()+1)+"-"+this.threeDate.getDate()
  
  
     }
  
     //---for day 6
     else if(this.days===1 && this.hours>0 && this.minutes>0 && this.seconds>0){
  
      //---reset daily progress
       if(this.days===1 && this.hours===23 && this.minutes===59 && this.seconds===59){
         localStorage.removeItem("daily_finish")
         this.dailyProgress = 0;
         this.dailyProgress_display= '';
         this.sumExInitial=0;

         this.daily_progress.emit(this.dailyProgress)
         this.daily_progress_display.emit(this.dailyProgress_display)
         this.sum_ex_initial.emit(this.sumExInitial)
       }
  
       //---daily commits
       this.dayCommit = this.program_ex_map_name6
       this.dayCommitInitial = new Map(this.program_ex_map_name_in6)

       this.day_Commits.emit(this.dayCommit)
       this.day_Commits_Initial.emit(this.dayCommitInitial)
      
       //---set dates
       this.dayOne = this.msixDate.getFullYear()+"-"+(this.msixDate.getMonth()+1)+"-"+this.msixDate.getDate()
       this.dayTwo = this.mfiveDate.getFullYear()+"-"+(this.mfiveDate.getMonth()+1)+"-"+this.mfiveDate.getDate()
       this.dayThree = this.mfourDate.getFullYear()+"-"+(this.mfourDate.getMonth()+1)+"-"+this.mfourDate.getDate()
       this.dayFour = this.mthreeDate.getFullYear()+"-"+(this.mthreeDate.getMonth()+1)+"-"+this.mthreeDate.getDate()
       this.dayFive = this.mtwoDate.getFullYear()+"-"+(this.mtwoDate.getMonth()+1)+"-"+this.mtwoDate.getDate()
       this.daySix = this.oneDate.getFullYear()+"-"+(this.oneDate.getMonth()+1)+"-"+this.oneDate.getDate()
       this.daySeven = this.twoDate.getFullYear()+"-"+(this.twoDate.getMonth()+1)+"-"+this.twoDate.getDate()
  
     }
  
     //---for day 7
     else if(this.days===0 && this.hours>0 && this.minutes>0 && this.seconds>0){
  
      //---reset daily progress
       if(this.days===0 && this.hours===23 && this.minutes===59 && this.seconds===59){
         localStorage.removeItem("daily_finish")
         this.dailyProgress = 0;
         this.dailyProgress_display= '';
         this.sumExInitial=0;

         this.daily_progress.emit(this.dailyProgress)
         this.daily_progress_display.emit(this.dailyProgress_display)
         this.sum_ex_initial.emit(this.sumExInitial)
       }

       //---set daily commits
       this.dayCommit = this.program_ex_map_name7
       this.dayCommitInitial = new Map(this.program_ex_map_name_in7)

       this.day_Commits.emit(this.dayCommit)
       this.day_Commits_Initial.emit(this.dayCommitInitial)
  
       //---set dates
       this.dayOne = this.msevenDate.getFullYear()+"-"+(this.msevenDate.getMonth()+1)+"-"+this.msevenDate.getDate()
       this.dayTwo = this.msixDate.getFullYear()+"-"+(this.msixDate.getMonth()+1)+"-"+this.msixDate.getDate()
       this.dayThree = this.mfiveDate.getFullYear()+"-"+(this.mfiveDate.getMonth()+1)+"-"+this.mfiveDate.getDate()
       this.dayFour = this.mfourDate.getFullYear()+"-"+(this.mfourDate.getMonth()+1)+"-"+this.mfourDate.getDate()
       this.dayFive = this.mthreeDate.getFullYear()+"-"+(this.mthreeDate.getMonth()+1)+"-"+this.mthreeDate.getDate()
       this.daySix = this.mtwoDate.getFullYear()+"-"+(this.mtwoDate.getMonth()+1)+"-"+this.mtwoDate.getDate()
       this.daySeven = this.oneDate.getFullYear()+"-"+(this.oneDate.getMonth()+1)+"-"+this.oneDate.getDate()
     
     }
     //---Display message when count down is finished
     else if(difference === 0) {
       this.message = "Deadline expired";
       
       this.unCommit.emit()
       }
     }, 1000);
  }

}
