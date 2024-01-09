import { User } from "./User";

export interface Point {
  id: number;
  timePlayed: number;
  score: number;
  user: User;
  userId: number;
  createdAt: Date;
}