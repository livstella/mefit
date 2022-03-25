import { Workout } from "./workout.model";

export interface Programme {
    id: number;
    workouts: [Workout];
    name: string;
    category:string;
}

