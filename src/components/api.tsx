import React, { useEffect } from 'react';

const Fetch = (endpoint: string) => {
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000' + endpoint, {
        credentials: 'include',
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
  return null;
};

export default Fetch;
