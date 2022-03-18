export interface Exercise {
    key(): string;
    id: number;
    name: string;
    description: string;
    targetMuscleGroup: string;
    image: string;
    videoLink:string;
  }
  