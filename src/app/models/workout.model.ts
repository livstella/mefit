export interface Workout {
  id: number;
  name: string;
  type: string;
  complete: boolean;
  sets:Array<object>
}
