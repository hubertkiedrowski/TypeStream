import { Point, User } from "@prisma/client";
import { useEffect, useState } from "react";

export const useFetchOneUser = async (id: string) => {
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

export const getUserPointsApi = async (userID: number | null) => {

  const response = await fetch(`http://localhost:3000/points/${userID}`, {
    credentials: "include",
  })

  if (!response.ok) {
      throw new Error("Fehler beim Abrufen der Punkte");
  }
  const userData = await response.json();
  console.log(userData);
  return userData;

}

export const getSessionUserID = async () => {
  try {
    const response = await fetch("http://localhost:3000/get-session", {
      method: 'GET',
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Unauthorized");
    }
    const data = await response.json();
    const userID = Number(data.id);
    console.log("Nur der HSV ", data, userID)
    return userID;
  } catch (error) {
    console.error(error);
    return null;
  }
}

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


export const useFetchPlayerPointsApi = (bestx: number | null) => {
  return useFetchJson<Point[]>(`http://localhost:3000/points/${bestx}`);
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


