import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Exercise } from 'src/app/models/exercise.model';
import { Programme } from 'src/app/models/programme.model';
import { Workout } from 'src/app/models/workout.model';
import { GoalDashbordService } from 'src/app/services/goal-dashbord.service';
import * as $ from 'jquery';
import { Sets } from 'src/app/models/sets.model';

@Component({
  selector: 'app-picking-program',
  templateUrl: './picking-program.component.html',
  styleUrls: ['./picking-program.component.css']
})
export class PickingProgramComponent implements OnInit {

  //---sets
  sets: Sets[] = [];

  //---program id
  program_ids: number[] = [];
  program_id: number | undefined;

  //---workout id
  workout_ids: number[] = [];
  workout_id: number | undefined;

  //---programs, workouts, exercises and their repititions
  repititions: number | undefined;
  exercises_choosen: Exercise[] | undefined | any;
  program_exercises_choosen: Exercise[] | undefined | any;
  workouts_choosen: Workout[] | undefined | any;

  @Input() programmes: Programme[] | undefined |any;

  @Input() program_ex_map_name: any;
  @Input() program_ex_map_name2: any;
  @Input() program_ex_map_name3: any;
  @Input() program_ex_map_name4: any;
  @Input() program_ex_map_name5: any;
  @Input() program_ex_map_name6: any;
  @Input() program_ex_map_name7: any;

  @Output() program_ex_Map = new EventEmitter();
  @Output() program_ex_Map2 = new EventEmitter();
  @Output() program_ex_Map3 = new EventEmitter();
  @Output() program_ex_Map4 = new EventEmitter();
  @Output() program_ex_Map5 = new EventEmitter();
  @Output() program_ex_Map6 = new EventEmitter();
  @Output() program_ex_Map7 = new EventEmitter();

  constructor(private readonly goalDashBoardService: GoalDashbordService) { }

  ngOnInit(): void {
  }

  //---when picking a programm from dropdown list
  onChangeProgram(){

    //---get program workouts
    this.programmes.forEach((program: { id: number; }) => this.program_ids.push(program.id))
    
    let choiceProgram = $("select[name='selectProgram'] option:selected").index();
    this.program_id = this.program_ids[choiceProgram-1];

    this.goalDashBoardService.fetchProgramById(this.program_id).subscribe((program: Programme[]) =>
    { 
      this.workouts_choosen = JSON.parse(JSON.stringify(program)).workouts;
  

      //---list each exercise from workout on its seperate day
      this.workouts_choosen.forEach((workout: { id: number; }) => this.workout_ids.push(workout.id))

      for(let i =0; i<this.workout_ids.length;i++){
      //---day1
      //---fetch exercises from workout
      if(i==0){
        this.goalDashBoardService.fetchWorkoutById(this.workout_ids[i]).subscribe((workout: Workout[]) =>
        { 
        this.sets = JSON.parse(JSON.stringify(workout)).sets
        
        for(let j=0; j<this.sets.length;j++){
          
        this.repititions = JSON.parse(JSON.stringify(workout)).sets[j].exerciseRepetitions

        this.program_exercises_choosen = JSON.parse(JSON.stringify(workout)).sets[j].exercises

        this.program_exercises_choosen.forEach((exercise: Exercise[]) => {
    
        let ex_name = JSON.parse(JSON.stringify(exercise)).name
    
        //---populate program exercises map of the day
        if(!this.program_ex_map_name.has(ex_name)){
          this.program_ex_map_name.set(ex_name, this.repititions);
        }else{
          this.program_ex_map_name.set(ex_name, (this.program_ex_map_name.get(ex_name) +this.repititions))
   }})}})

  }


      //---day2
      //---fetch exercises from workout
      else if(i==1){
        this.goalDashBoardService.fetchWorkoutById(this.workout_ids[i]).subscribe((workout: Workout[]) =>
        { 
        this.sets = JSON.parse(JSON.stringify(workout)).sets
        
        for(let j=0; j<this.sets.length;j++){

        this.repititions = JSON.parse(JSON.stringify(workout)).sets[j].exerciseRepetitions

        this.program_exercises_choosen = JSON.parse(JSON.stringify(workout)).sets[j].exercises

        this.program_exercises_choosen.forEach((exercise: Exercise[]) => {

        let ex_name = JSON.parse(JSON.stringify(exercise)).name

        //---populate program exercises map of the day
        if(!this.program_ex_map_name2.has(ex_name)){
          this.program_ex_map_name2.set(ex_name, this.repititions);
        }else{
          this.program_ex_map_name2.set(ex_name, (this.program_ex_map_name2.get(ex_name) +this.repititions))
      }
    })}})
  }

      //---day3
      //---fetch exercises from workout
      else if(i==2){
        this.goalDashBoardService.fetchWorkoutById(this.workout_ids[i]).subscribe((workout: Workout[]) =>
        { 
        this.sets = JSON.parse(JSON.stringify(workout)).sets
        
        for(let j=0; j<this.sets.length;j++){

        this.repititions = JSON.parse(JSON.stringify(workout)).sets[j].exerciseRepetitions

        this.program_exercises_choosen = JSON.parse(JSON.stringify(workout)).sets[j].exercises

        this.program_exercises_choosen.forEach((exercise: Exercise[]) => {

        let ex_name = JSON.parse(JSON.stringify(exercise)).name

        //---populate program exercises map of the day
        if(!this.program_ex_map_name3.has(ex_name)){
          this.program_ex_map_name3.set(ex_name, this.repititions);
        }else{
          this.program_ex_map_name3.set(ex_name, (this.program_ex_map_name3.get(ex_name) +this.repititions))
      }
    })}})
  }

      //---day4
      //---fetch exercises from workout
      else if(i==3){
        this.goalDashBoardService.fetchWorkoutById(this.workout_ids[i]).subscribe((workout: Workout[]) =>
        { 

        this.sets = JSON.parse(JSON.stringify(workout)).sets
        
        for(let j=0; j<this.sets.length;j++){
        
          this.repititions = JSON.parse(JSON.stringify(workout)).sets[j].exerciseRepetitions
  
        this.program_exercises_choosen = JSON.parse(JSON.stringify(workout)).sets[j].exercises
  
        this.program_exercises_choosen.forEach((exercise: Exercise[]) => {
  
        let ex_name = JSON.parse(JSON.stringify(exercise)).name
  
        //---populate program exercises map of the day
        if(!this.program_ex_map_name4.has(ex_name)){
          this.program_ex_map_name4.set(ex_name, this.repititions);
        }else{
          this.program_ex_map_name4.set(ex_name, (this.program_ex_map_name4.get(ex_name) +this.repititions))
      }})}})
    }

      //---day5
      //---fetch exercises from workout
      else if(i==4){
        this.goalDashBoardService.fetchWorkoutById(this.workout_ids[i]).subscribe((workout: Workout[]) =>
        { 

        this.sets = JSON.parse(JSON.stringify(workout)).sets
        
        for(let j=0; j<this.sets.length;j++){
        
          this.repititions = JSON.parse(JSON.stringify(workout)).sets[j].exerciseRepetitions
    
        this.program_exercises_choosen = JSON.parse(JSON.stringify(workout)).sets[j].exercises
    
        this.program_exercises_choosen.forEach((exercise: Exercise[]) => {
    
        let ex_name = JSON.parse(JSON.stringify(exercise)).name
                
        //---populate program exercises map of the day
        if(!this.program_ex_map_name5.has(ex_name)){
          this.program_ex_map_name5.set(ex_name, this.repititions);
        }else{
          this.program_ex_map_name5.set(ex_name, (this.program_ex_map_name5.get(ex_name) +this.repititions))
        }
      })}})
    }

      //---day6
      //---fetch exercises from workout
      else if(i==5){
        this.goalDashBoardService.fetchWorkoutById(this.workout_ids[i]).subscribe((workout: Workout[]) =>
        { 
        
        this.sets = JSON.parse(JSON.stringify(workout)).sets
        
        for(let j=0; j<this.sets.length;j++){
        
          this.repititions = JSON.parse(JSON.stringify(workout)).sets[j].exerciseRepetitions
      
        this.program_exercises_choosen = JSON.parse(JSON.stringify(workout)).sets[j].exercises
      
        this.program_exercises_choosen.forEach((exercise: Exercise[]) => {
      
        let ex_name = JSON.parse(JSON.stringify(exercise)).name
      
        //---populate program exercises map of the day
        if(!this.program_ex_map_name6.has(ex_name)){
          this.program_ex_map_name6.set(ex_name, this.repititions);
        }else{
          this.program_ex_map_name6.set(ex_name, (this.program_ex_map_name6.get(ex_name) +this.repititions))
        }
      })}})

    }

      //---day7
      //---fetch exercises from workout
      else if(i==6){
        this.goalDashBoardService.fetchWorkoutById(this.workout_ids[i]).subscribe((workout: Workout[]) =>
        { 
        
        this.sets = JSON.parse(JSON.stringify(workout)).sets
        
        for(let j=0; j<this.sets.length;j++){
        
        this.repititions = JSON.parse(JSON.stringify(workout)).sets[j].exerciseRepetitions
        
        this.program_exercises_choosen = JSON.parse(JSON.stringify(workout)).sets[j].exercises
        
        this.program_exercises_choosen.forEach((exercise: Exercise[]) => {
        
        let ex_name = JSON.parse(JSON.stringify(exercise)).name
        
        //---populate program exercises map of the day
        if(!this.program_ex_map_name7.has(ex_name)){
          this.program_ex_map_name7.set(ex_name, this.repititions);
        }else{
          this.program_ex_map_name7.set(ex_name, (this.program_ex_map_name7.get(ex_name) +this.repititions))
      }
    })}})
  }
   
  }})
  this.program_ex_Map.emit(this.program_ex_map_name)
  this.program_ex_Map2.emit(this.program_ex_map_name2)
  this.program_ex_Map3.emit(this.program_ex_map_name3)
  this.program_ex_Map4.emit(this.program_ex_map_name4)
  this.program_ex_Map5.emit(this.program_ex_map_name5)
  this.program_ex_Map6.emit(this.program_ex_map_name6)
  this.program_ex_Map7.emit(this.program_ex_map_name7)

  this.workout_ids=[];
}
}
