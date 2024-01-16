import { Point, User } from '@prisma/client';
import React, { useEffect, useState } from 'react';



export const fetchUserdata = (endpoint: string) => {
  const [data, setData] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (endpoint !== "password") {
        try {
          const response = await fetch('http://localhost:3000' + endpoint, {
            credentials: 'include',
          });
          const fetchedData = await response.json();
          setData(fetchedData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [endpoint]);

  return data;
};

export const fetchPoints = (endpoint: string) => {
  const [data, setData] = useState<Point[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000' + endpoint, {
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const fetchedData: { data: Point[] } = await response.json();
        setData(fetchedData.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [endpoint]);

  return data;
};


// hier ein beispiel wird auf die userdaten zugegriffen 
// mit der userid also 1 ,2 usw findet man die nutzer.


const userData = fetchUserdata("/users/1");
console.log(userData);


// hier kann man auf die punktestände zugreifen
// mit der id hinter leaderboard kann man sich die topX der besten 
// punkteständ anzeigen lassen

const points = fetchPoints("/points/leaderboard/2");
console.log(points);
console.log(points?.[0].userId);

// grade wird alles noch mehrfach geloggt , da weiß 
//ich aber zurzeit noch keine lösubng 