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

// DEN!!!!!!!!
export function getUserPointsApi(userID: number | null) {

    fetch(`http://localhost:3000/points/${userID}`, {
      credentials: "include",
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Fehler beim Abrufen der Punkte");
      }
      return response.json();
    });
}


export function getUserDataApi(userID: number) {
  useEffect(() => {
    fetch(`http://localhost:3000/users/${userID}`, {
      credentials: "include",
    })
      .then((r) => r.json())
      .then((r) => {
        return (r);
      });
  }, []);
}

// DEN!!!!!!!!!
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
// export const getSessionUserID = async () => {
//   fetch("http://localhost:3000/get-session", {
//     method: 'GET',
//     credentials: "include",
//   })
//   .then((response) => {
//     if (response.ok) {
//         console.log("Scheiß St. Pauli ",response.json())
//         return response.json();
//       } else {
//         throw new Error("Unauthorized");
//       }
//     })
//     .then(async (data) => {
//         const userID = data.id;
//         console.log("Nur der HSV ",data, userID)
//         return userID;
//     });
// }

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

// export const getSessionUserID= async () => {
//   return useFetchJson<Number>(`http://localhost:3000/get-session`)

// }
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


// export async function createPointDBEntry(pointData: any) {
//   try {
//     const response = await fetch('http://localhost:3000/create/points', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(pointData),
//     });
//     if (!response.ok) {
//       const errorBody = await response.json();
//       console.error('Fehler beim Senden der Daten:', errorBody);
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     return await response.json();
//   } catch (error) {
//     console.error('Es gab ein Problem mit dem Senden der Daten:', error);
//   }
// }

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


