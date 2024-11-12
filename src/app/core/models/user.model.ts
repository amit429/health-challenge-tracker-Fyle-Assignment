export interface Workout {
    type: string;
    minutes: number;
  }
  
  export interface User {
    id: number;
    name: string;
    workouts: Workout[];
  }

  export interface TableData{
    name : string;
    workouts: string;
    numberOfWorkouts: number;
    totalMinutes: number;
  }
  