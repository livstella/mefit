import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Exercise } from 'src/app/models/exercise.model';
import { Workout } from 'src/app/models/workout.model';
import { exercisePageService } from 'src/app/services/exercise-page.service';
import { GoalDashbordService } from 'src/app/services/goal-dashbord.service';
import { WorkoutPageService } from 'src/app/services/workout-page.service';
import * as $ from 'jquery';


@Component({
  selector: 'app-workout-of-the-day-options',
  templateUrl: './workout-of-the-day-options.component.html',
  styleUrls: ['./workout-of-the-day-options.component.css']
})
export class WorkoutOfTheDayOptionsComponent implements OnInit {

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

  @Output() newChoice_Map = new EventEmitter();
  ex_choice_map_name = new Map();

  
  @Input() exercises: Exercise[] | undefined |any;
  @Input() workouts: Workout[] | undefined | any;

  constructor(private readonly goalDashBoardService: GoalDashbordService, private readonly exercisePageService :exercisePageService, private readonly workoutPageService: WorkoutPageService ) { }


  ngOnInit(): void {
  
  }

  //---Workouts of the day
  //---when picking excersize from dropdown-list display 
  onChangeEx(){
    this.exercises.forEach((ex: { id: number; }) => this.ex_ids.push(ex.id))

    let choiceEx = $("select[name='select1.1'] option:selected").index();
    this.ex_id = this.ex_ids[choiceEx-1];

    this.goalDashBoardService.fetchExById(this.ex_id).subscribe((exercise: Exercise[]) =>
    {
        let ex_name = JSON.parse(JSON.stringify(exercise)).name

        if(!this.ex_choice_map_name.has(ex_name)){
          this.ex_choice_map_name.set(ex_name,10);
        }else{
          this.ex_choice_map_name.set(ex_name, (this.ex_choice_map_name.get(ex_name) +10))
       }  
      })
      this.newChoice_Map.emit(this.ex_choice_map_name)
    }

  //---when picking workout from dropdown-list display 
  onChangeWork(){

    this.workouts.forEach((workout: { id: number; }) => this.workout_ids.push(workout.id))

    let choiceWork = $("select[name='select1.2'] option:selected").index(); 
    this.workout_id = this.workout_ids[choiceWork-1];

    this.goalDashBoardService.fetchWorkoutById(this.workout_id).subscribe((workout: Workout[]) =>
    { 
      this.repititions = JSON.parse(JSON.stringify(workout)).sets[0].exerciseRepetitions

      this.exercises_choosen = JSON.parse(JSON.stringify(workout)).sets[0].exercises

      this.exercises_choosen.forEach((exercise: Exercise[]) => {
      
      let ex_name = JSON.parse(JSON.stringify(exercise)).name
      
      if(!this.ex_choice_map_name.has(ex_name)){
        this.ex_choice_map_name.set(ex_name, this.repititions);
      }else{
        this.ex_choice_map_name.set(ex_name, (this.ex_choice_map_name.get(ex_name) +this.repititions))
     }

    })
  })
  this.newChoice_Map.emit(this.ex_choice_map_name)
}


}
