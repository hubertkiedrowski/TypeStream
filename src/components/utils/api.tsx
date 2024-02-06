import { Point, User } from "@prisma/client";
import { useEffect, useState } from "react";

/**
 * Fetches a single user from the server.
 * @param id - The ID of the user to fetch.
 * @returns A Promise that resolves to the fetched user data.
 */
export const useFetchOneUser = async (id: string) => {
  let fetchedData;
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

/**
 * Fetches multiple users from the server.
 * @returns {Promise<any>} A promise that resolves to the fetched data.
 */
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

/**
 * Custom hook for fetching JSON data from a specified URL.
 * @template TData - The type of the data to be fetched.
 * @param {string} url - The URL to fetch the JSON data from.
 * @returns {TData | undefined} - The fetched JSON data or undefined if not yet fetched.
 */

export const getUserPointsApi = async (userID: number | null) => {

  const response = await fetch(`http://localhost:3000/points/${userID}`, {
    credentials: "include",
  })

  if (!response.ok) {
    throw new Error("Fehler beim Abrufen der Punkte");
  }
  const userData = await response.json();
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
    return userID;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export function useFetchJson<TData>(url: string) {
  const [data, setData] = useState<TData | undefined>(undefined)

  useEffect(() => {
    fetch(url, { credentials: "include" })
      .then((response) => response.json())
      .then((jsonData) => setData(jsonData))
      .catch(() => {
        new Error('Network error');
        setData(undefined);
      });
  }, [url]);

  return data
}


/**
 * Custom hook to fetch user data from an API.
 * @param userId - The ID of the user.
 * @returns An array of User objects.
 */
export function useUserDataApi(userId: number) {
  return useFetchJson<User[]>(`http://localhost:3000/users/${userId}`)
}

/**
 * Fetches the best players by points from the server.
 * 
 * @param bestXPlayer The number of best players to fetch.
 * @returns An array of User objects representing the best players.
 */
export const useFetchBestPlayersByPoints = (bestXPlayer: number) => {
  return useFetchJson<User[]>(`http://localhost:3000/points/leaderboard/${bestXPlayer}`);
};

/**
 * Custom hook to fetch points from an API endpoint.
 * @param endpoint - The API endpoint to fetch points from.
 * @returns The fetched points data.
 */
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

/**
 * Creates a new entry in the point database.
 * @param pointData - The data for the new entry.
 * @returns A Promise that resolves to the response from the server.
 * @throws If there is an error sending the data or if the server returns an error response.
 */
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

/**
 * Creates a new user database entry.
 * @param userData - The user data to be stored in the database.
 * @returns A Promise that resolves to the response data from the server.
 * @throws An error if there is an HTTP error or an error occurs while sending the data.
 */
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


