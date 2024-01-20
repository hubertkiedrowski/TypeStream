import { Point, User } from "@prisma/client";
import { useEffect, useState } from "react";

export const useFetchUserdata = (
  endpoint: string,
  doIt: boolean
): User | null => {
  const [data, setData] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
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
  }, [endpoint, doIt]);

  return data;
};

export const useFetchPoints = (endpoint: string): Point[] | null => {
  const [data, setData] = useState<Point[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
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
    };
    fetchData();

  }, [endpoint]);

  return data;
};

export async function sendUserDataToBackendAndCreateDBEntry(userData:any) {
  try {
    const response = await fetch('http://localhost:3000/users', {
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
