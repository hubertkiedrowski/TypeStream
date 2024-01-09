import React, { useEffect } from 'react';

const Fetch = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/users/1', {
          credentials: 'include',
        });
        const data = await response.json();
        console.log(data);
        return data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return null;
};

export default Fetch;
