import { Point, User } from "@prisma/client";
import { useEffect, useState } from "react";

export const useFetchUserdata = ( // TODO: Jox async hierher 
  endpoint: string,
  doIt: boolean // TODO: JOX wieso brauchen wir das? => FE "zu schnell" lol
): User | null => {
  const [data, setData] = useState<User | null>(null);

  const fetchData = async () => { // TODO: JOX brauchen wir diese funktion?
    try {
      const response = await fetch("http://localhost:3000" + endpoint, {
        credentials: "include",
      });
      const fetchedData = await response.json();
      setData(fetchedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  if (doIt) {
    fetchData();
  }

  return data;
};

export const useFetchPoints = async (endpoint: string): Promise<{ id: number; timePlayed: number; score: number; userId: number; createdAt: Date; }[] | null> => {
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