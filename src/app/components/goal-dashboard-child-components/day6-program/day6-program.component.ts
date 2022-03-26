import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Exercise } from 'src/app/models/exercise.model';
import { Workout } from 'src/app/models/workout.model';
import { GoalDashbordService } from 'src/app/services/goal-dashbord.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-day6-program',
  templateUrl: './day6-program.component.html',
  styleUrls: ['./day6-program.component.css']
})
export class Day6ProgramComponent implements OnInit {

  //---For exercises
  ex: string = '';
  ex_ids: number[] = [];
  ex_id: number | undefined;
 
  //---workout id
  workout_ids: number[] = [];
  workout_id: number | undefined;
 
  //---sets
  repititions: number | undefined;
  exercises_choosen: Exercise[] | undefined | any;

  @Input() exercises: Exercise[] | undefined |any;
  @Input() workouts: Workout[] | undefined | any;
  @Input() program_ex_map_name6: any;

  @Output() program_ex_Map6 = new EventEmitter();

  constructor(private readonly goalDashBoardService: GoalDashbordService) { }

  ngOnInit(): void {
  }

  //---Sixth day
  //---clear button
  clear6(){
    this.program_ex_map_name6.clear();
  }

  //---add exercise to weakly goal
  onChangeGoalEx6(){

    this.exercises.forEach((ex: { id: number; }) => this.ex_ids.push(ex.id))

    let choiceEx = $("select[name='selectGoalEx6'] option:selected").index();
    this.ex_id = this.ex_ids[choiceEx-1];

    this.goalDashBoardService.fetchExById(this.ex_id).subscribe((exercise: Exercise[]) =>
    {
        let ex_name = JSON.parse(JSON.stringify(exercise)).name

        //---populate program exercises map of the day
        if(!this.program_ex_map_name6.has(ex_name)){
          this.program_ex_map_name6.set(ex_name,10);
        }else{
          this.program_ex_map_name6.set(ex_name, (this.program_ex_map_name6.get(ex_name) +10))
       }  
      })
      this.program_ex_Map6.emit(this.program_ex_map_name6)
  }

  //---add a workout to weekly goal
  onChangeGoalWork6(){
    this.workouts.forEach((workout: { id: number; }) => this.workout_ids.push(workout.id))

    let choiceWork = $("select[name='selectGoalWork6'] option:selected").index(); 
    this.workout_id = this.workout_ids[choiceWork-1];

    this.goalDashBoardService.fetchWorkoutById(this.workout_id).subscribe((workout: Workout[]) =>
    { 
      this.repititions = JSON.parse(JSON.stringify(workout)).sets[0].exerciseRepetitions

      this.exercises_choosen = JSON.parse(JSON.stringify(workout)).sets[0].exercises

      this.exercises_choosen.forEach((exercise: Exercise[]) => {
      
      let ex_name = JSON.parse(JSON.stringify(exercise)).name
      
      //---populate program exercises map of the day
      if(!this.program_ex_map_name6.has(ex_name)){
        this.program_ex_map_name6.set(ex_name, this.repititions);
      }else{
        this.program_ex_map_name6.set(ex_name, (this.program_ex_map_name6.get(ex_name) +this.repititions))
     }

    })
  })
  this.program_ex_Map6.emit(this.program_ex_map_name6)
  }
}
