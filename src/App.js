// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navigation from './Components/NavBar';
import MainScreen from './Screens/MainScreen';
import TVShows from './Screens/TVShows';
import Movies from './Screens/Movies';
import Countries from './Screens/Countries';
import Trending from './Screens/Trending';
import "./App.css";
import Footer from './Components/footer';
import MovieDetail from './Screens/MovieDetails';
import ShowDetail from './Screens/ShowsDetails';
import Login from './Screens/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    
    setIsAuthenticated(true);
  };
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div className="App">
      <Router>
        {isAuthenticated ? (
          <>
             <Navigation onLogout={handleLogout} />
            <Routes>
              <Route path="/" element={<MainScreen />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/trending" element={<Trending />} />
              <Route path="/tvshows" element={<TVShows />} />
              <Route path="/countries" element={<Countries />} />
              <Route path="/movie/:id" element={<MovieDetail />} />
              <Route path='/tvshow/:id' element={<ShowDetail />} />
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
            </Routes>
            <Footer />
          </>
        ) : (
          <Routes>
            <Route
              path="/"
              element={<Login onLogin={handleLogin} />}
            />
            <Route path="/*" element={<Navigate replace to="/login" />} />
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
