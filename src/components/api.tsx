import axios from "axios";
import { User } from "./Interfaces/User";
import { Point } from "./Interfaces/Point";

const axiosInstance = axios.create({
  baseURL: "https://localhost:3000",
});

export async function getUsers(): Promise<User[]> {
  try {
    const response = await axiosInstance.get<User[]>("https://localhost:3000/users/1", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}