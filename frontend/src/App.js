import React, {useState, useEffect} from 'react';
import {Routes, Route, NavLink, useResolvedPath} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import Login from "./components/login.js";
import MoviesList from "./components/movies-list.js";
import Movie from "./components/movie.js";
import AddReview from "./components/add-review.js";

function App() { 
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  useEffect(() => {
    setUser(user);
  });

  async function login(user = null){// default user to null
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  async function logout(){
    setUser(null);
    localStorage.removeItem('user');
  }

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href='/'>MoviesReview</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav'></Navbar.Toggle>
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav.Link href="/movies">Movies</Nav.Link>
          {
            user ? (
              <Nav.Link 
                href="/logout" 
                onClick={e => {
                  e.preventDefault();
                  logout();
                }}
              >Logout</Nav.Link>
            ) : (
                <NavLink className="nav-link" to={"/login"}>Login</NavLink>
            )
          }
        </Navbar.Collapse>
      </Navbar>
        
      <Routes>
        {
          ['/', '/movies'].map(
            (path, index) => <Route key={index} path={path} element={<MoviesList/>}></Route>
          )
        }
        <Route path="/movies/:id/" element={<Movie user={user}/>}></Route>
        <Route path="/movies/:id/review" element={<AddReview user={user}/>}></Route>
        <Route path="/login" element={<Login login={login} />}></Route>
      </Routes>

    </div>
  );
}

export default App;
 