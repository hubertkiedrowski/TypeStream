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
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};


export function useFetchJson<TData>(url: string) {
  const [data, setData] = useState<TData | undefined>(undefined)

  useEffect(() => {
    fetch(url, {
      credentials: "include",
    })
      .then((r) => r.json())
      .then((r) => setData(r));
  }, []);

  return data
}

export function useUserDataApi(userId: number) {
  return useFetchJson<User[]>(`http://localhost:3000/users/${userId}`)

}

export const useFetchBestPlayersByPoints = (bestx: number) => {
  return useFetchJson<User[]>(`http://localhost:3000/points/leaderboard/${bestx}`);
};


// TODO RENAME und aufteilen in zwei endpoints
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

export function createPointDBEntry(pointData: any) {
  return fetch('http://localhost:3000/create/points', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pointData),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((errorBody) => {
          console.error('Fehler beim Senden der Daten:', errorBody);
          throw new Error(`HTTP error! status: ${response.status}`);
        });
      }
      return response.json();
    })
    .catch((error) => {
      console.error('Es gab ein Problem mit dem Senden der Daten:', error);
      throw error;
    });
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


