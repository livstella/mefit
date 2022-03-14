import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-goal-details',
  templateUrl: './goal-details.component.html',
  styleUrls: ['./goal-details.component.css']
})
export class GoalDetailsComponent implements OnInit {

  username = "Michel";
  finishedGoals: any | undefined | null;

  GoalMap: any;
  Goal: any;
  GoalObj: any;
  ExMap: any;
  ExObj: any;
  
  GoalItems: any;

  constructor(private router: Router) { }

  ngOnInit(): void {

    //---load finished goals
    this.finishedGoals = localStorage.getItem('finished-goals')||'{}'

    //---make a map of goals
    this.GoalObj = JSON.parse(this.finishedGoals)
    this.GoalMap = new Map(Object.entries(this.GoalObj)) 
    this.Goal = this.GoalMap.get("first")

    //let responseEx = this.GoalMap.get('first').ex
    //this.ExObj = JSON.parse(responseEx)
    //this.ExMap = new Map(Object.entries(this.ExObj))           

    

              
                  

  
  }

  toGoalDashbord(){
    this.router.navigateByUrl('/dashboard');
  }
}
