export interface iGoal {
  id: string;
  fullName: string;
  description?: string;
}

export interface iGoalsResponse {
  goals: iGoal[];
}
