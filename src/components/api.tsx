import { Point, User } from '@prisma/client';
import React, { useEffect, useState } from 'react';



export const fetchUserdata = (endpoint: string) => {
  const [data, setData] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (endpoint !== "passwort") {
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