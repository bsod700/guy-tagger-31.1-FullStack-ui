import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import MainPage from './containers/Home';
import UserFavoritePage from './containers/Favorites';
import Login from './containers/Login';
import './assets/styles/styles.css';

export interface User {
  userName: string;
  userId: number;
}

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      setCurrentUser(parsedUser); 
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = (userName: string, userId: number) => {
    const newUser: User = { userName, userId }; 
    setCurrentUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser)); 
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="navbar container">
        <div>
          {isLoggedIn && currentUser && <p>Welcome, {currentUser.userName}</p>}
          {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
        </div>
        <Link to="/favorites">Go to Favorites</Link>
      </div>
      <Routes>
        <Route path="/" element={isLoggedIn ? <MainPage /> : <Navigate to="/login" />} />
        <Route path="/login" element={!isLoggedIn ? <Login onLoginSuccess={handleLoginSuccess} /> : <Navigate to="/" />} />
        <Route path="/favorites" element={isLoggedIn ? <UserFavoritePage /> : <Navigate to="/login" />} />
        <Route path="*" element={isLoggedIn ? <Navigate to="/" /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
