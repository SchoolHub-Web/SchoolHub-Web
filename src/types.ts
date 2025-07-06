export interface Grade {
  id?: number;
  value: number;
  timestamp: string;
}

export interface Absence {
  id?: number;
  excused: boolean;
  timestamp: string;
}

export interface Subject {
  id: number;
  icon: string;
  name: string;
  minGrades?: number;
  grades: number | null | undefined;
  average: number | null | undefined;
}
