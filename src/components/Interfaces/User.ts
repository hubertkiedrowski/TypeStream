import { Point } from "./Point";

export interface User {
  id: number;
  email: String;
  firstName: String;
  lastName: String;
  userName: String;
  password: String;
  createdAt: Date;
  updatedAt: Date;
  Point: Point;
}