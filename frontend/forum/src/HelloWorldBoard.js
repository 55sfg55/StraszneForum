// src/HelloWorld.js
import React, { useEffect, useState } from 'react';
import './boardview.css';

function HelloWorldBoardView() {
  const [userdata, setUserdata] = useState([]); // State to hold user data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [username, setUsername] = useState(null); // State for username

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:3000/helloworld/user/allEntries0');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        if (result.success) {
          setUserdata(result.data);
        } else {
          throw new Error(result.message);
        }
      } catch (error) {
        console.error('Fetch error:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchUsername = async () => {
      try {
        const response = await fetch('http://127.0.0.1:3000/helloworld/user/0');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        if (result.success) {
          setUsername(result.data.username);
        } else {
          throw new Error(result.message);
        }
      } catch (error) {
        console.error('Fetch error:', error);
        setError(error.message);
      }
    };

    fetchUserData();
    fetchUsername();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <h1>User Data</h1>
      <div className="squares-containerboard">
        {userdata.map(user => (
          <div className="squareboard" key={user.id}>
            {/* Uncomment if you want to display User ID */}
            {/* <h2>User ID: {user.userId}</h2> */}
            <h2>{username}</h2>
            <p>{user.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HelloWorldBoardView;
