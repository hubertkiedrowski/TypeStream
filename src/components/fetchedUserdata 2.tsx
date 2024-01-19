import { Link } from "react-router-dom";
import { useFetchPoints as useFetchPoints, useFetchUserdata } from "./api";
import { User } from "@prisma/client";

export const Userdata = () => {
  const points = useFetchPoints("/points/leaderboard/5");

  const userData1 = useFetchUserdata(
    "/users/" + points?.[0].userId,
    points != null
  );
  const userData2 = useFetchUserdata(
    "/users/" + points?.[1].userId,
    points != null
  );
  const userData3 = useFetchUserdata(
    "/users/" + points?.[2].userId,
    points != null
  );
  const userData4 = useFetchUserdata(
    "/users/" + points?.[3].userId,
    points != null
  );
  const userData5 = useFetchUserdata(
    "/users/" + points?.[4].userId,
    points != null
  );

  const top5Users: (User | null)[] = [
    userData1,
    userData2,
    userData3,
    userData4,
    userData5,
  ];

  return top5Users;
};

export const Points = () => {
  const points = useFetchPoints("/points/leaderboard/5");

  return points;
};
