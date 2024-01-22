import { Point, User } from "@prisma/client";
import { useEffect, useState } from "react";

export const useFetchOneUser = async (id: string) => {
  // const [data, setData] = useState<User | null>(null);
  let fetchedData
  try {
    const response = await fetch(`http://localhost:3000/users/${id}`, {
      credentials: "include",
    });
    fetchedData = await response.json();
    // setData(fetchedData);
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return fetchedData;
};


export const useFetchManyUsers = async () => {
  try {
    fetch(`http://localhost:3000/users/`, {
      credentials: "include",
    })
      .then((r) => r.json())
      .then((r) => {
        return r
      })


    // const response = await fetch("http://localhost:3000/users/");
    // const fetchedData = await response.json();



    // return fetchedData;
  } catch (error) {
    console.error("Error fetching data:", error);
  }

};

export const useFetchBestPlayersByPoints = async (bestx: number) => {
  fetch(`http://localhost:3000/points/leaderboard/${bestx}`, {
    credentials: "include",
  })
    .then((r) => r.json())
    .then((r) => {
      console.log(r)

      return (r);
    })
}

// TODO RENAME und aufteilen sin zwei endpoints
export const useFetchPoints = async (endpoint: string) => {
  const [data, setData] = useState<Point[] | null>(null);

  try {
    const response = await fetch("http://localhost:3000" + endpoint, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const fetchedData: { data: Point[] } = await response.json();
    if (data != null && data != undefined) {
      setData(fetchedData.data);
    }
    setData(fetchedData.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return data;

};


export async function createPointDBEntry(pointData: any) {
  try {
    const response = await fetch('http://localhost:3000/create/points', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pointData),
    });
    if (!response.ok) {
      const errorBody = await response.json();
      console.error('Fehler beim Senden der Daten:', errorBody);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Es gab ein Problem mit dem Senden der Daten:', error);
  }
}

export async function createUserDBEntry(userData: any) {
  try {
    const response = await fetch('http://localhost:3000/create/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      const errorBody = await response.json();
      console.error('Fehler beim Senden der Daten:', errorBody);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Es gab ein Problem mit dem Senden der Daten:', error);
  }
}


export default { useFetchBestPlayersByPoints }