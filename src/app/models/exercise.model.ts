export interface Exercise {
    key(): string;
    id: number;
    set:number;
    name: string;
    description: string;
    targetMuscleGroup: string;
    image: string;
    videoLink:string;
  }
  