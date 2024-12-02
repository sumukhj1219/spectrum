'use client'
import { jwtVerify } from 'jose';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';

const SECRET_KEY = "Sumukh@1219"; // Use consistent secret key

const getDecodedToken = async () => {
  try {
    // Multiple token retrieval methods
    const rawToken = Cookies.get('token');
    console.log('Raw Token:', rawToken);

    if (!rawToken) {
      console.error('No token found in cookies');
      return null;
    }

    // Verify token
    const { payload } = await jwtVerify(
      rawToken, 
      new TextEncoder().encode(SECRET_KEY)
    );

    console.log('Decoded Payload:', payload);
    return payload;
  } catch (error) {
    console.error('Detailed Token Error:', {
      name: error.name,
      message: error.message,
      code: error.code
    });
    return null;
  }
};

const Dashboard = () => {
  const [userName, setUserName] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const decoded = await getDecodedToken();
        if (decoded) {
          setUserName(decoded.name || "Guest");
        } else {
          setError("Token verification failed");
        }
      } catch (err) {
        setError("Authentication error");
      }
    };

    fetchUserInfo();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Welcome, {userName}!</h1>
    </div>
  );
};

export default Dashboard;