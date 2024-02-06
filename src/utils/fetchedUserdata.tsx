import { Link } from "react-router-dom";
import {
  createPointDBEntry,
  createUserDBEntry,
  useFetchPoints,
  useFetchOneUser,
  useFetchManyUsers
} from "../components/utils/api";
import { User } from "@prisma/client";

export const Userdata = () => {
  // const userData1 = useFetchOneUser(points?.[0].userId);
  // const userData2 = useFetchOneUser(points?.[1].userId);
  // const userData3 = useFetchOneUser(points?.[2].userId);
  // const userData4 = useFetchOneUser(points?.[3].userId);
  // const userData5 = useFetchOneUser(points?.[4].userId);

  const top5Users = useFetchManyUsers()

  // const top5Users: (User | null)[] = [
  //   userData1,
  //   userData2,
  //   userData3,
  //   userData4,
  //   userData5,
  // ];

  // TODO hier wird die funktion ausgeführt sobald man auf /leaderboard geht oder dort refresht

  return top5Users;
};
export const Points = () => {
  const points = useFetchPoints("/points/leaderboard/5");
  // const userData5 = useFetchOneUser(points?.[4].userId);
  // createUserDBEntry(userData5)

  // if (points?.[4]) {
  //   console.log("HIER DIE DATEN BEVOR SIE LOSGESCHICKT WERDEN");
  //   console.log(points[4]);
  //   createPointDBEntry(points[4]);
  //   return points;
  // }


  return points;
};
