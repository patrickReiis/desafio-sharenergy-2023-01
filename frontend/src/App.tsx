import './App.css';
import Login from './Login';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import RandomUsers from './RandomUsers';
import { useState, useEffect } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const requestIsAuthenticated = async () => {
      try {
        const response = await fetch('/api/v1/me');

        if (response.ok === false) {
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(true);
        }
      } 
      catch (e) {
        console.log('An error happened: ', e);
        setIsAuthenticated(false);
        return
      }
    }

    requestIsAuthenticated();
  }, [isAuthenticated]);

  return (
    <div className="App">
        <Routes>
          <Route path="/login" element={
            <Login isAuthenticated={isAuthenticated} />
          }/>
          <Route path={'/'} element={
            <PrivateRoute component={
              <RandomUsers/>} path={'/randomUsers'} isAuthenticated={isAuthenticated} />
          }/> 
          <Route path={'randomUsers'} element={
            <PrivateRoute component={
              <RandomUsers/>
            } path={'/randomUsers'} isAuthenticated={isAuthenticated} />
          }/>
        </Routes>
      </div>
  );
}

export default App;
