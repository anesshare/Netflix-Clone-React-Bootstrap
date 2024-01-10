import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './navbar.css';
import { Link, useLocation } from 'react-router-dom';

const Navigation = ({onLogout}) => {
  const location = useLocation();
  const [activePage, setActivePage] = useState(location.pathname);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
 

  const handleNavItemClick = (path) => {
    setActivePage(path);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/search?query=${searchQuery}`);
      const data = await response.json();
      setSearchResults(data.results);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };
  const handleLogoutClick = () => {
    
    onLogout();
    
  };

  return (
    <Navbar expand="lg" className="bg-black" style={{ backgroundColor: 'black', position: 'sticky', top: '0', zIndex: '1000' }}>
      <Container>
        <Navbar.Brand href="/">
          <img src='/img/ntf.png' alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="navbar-toggler"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              as={Link}
              to={"/"}
              className={activePage === "/" ? 'active' : ''}
              onClick={() => handleNavItemClick("/")}
              style={{ color: 'white', borderBottom: activePage === "/" ? '1px solid white' : 'none' }}
            >
              Home
            </Nav.Link>
            <NavDropdown title="Categories" id="basic-nav-dropdown">
              <NavDropdown.Item
                as={Link}
                to={"/movies"}
                className={activePage.includes("/movies") ? 'active' : ''}
                onClick={() => handleNavItemClick("/movies")}
              >
                Movies
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to={"/trending"}
                className={activePage.includes("/trending") ? 'active' : ''}
                onClick={() => handleNavItemClick("/trending")}
              >
                Trending
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to={"/tvshows"}
                className={activePage.includes("/tvshows") ? 'active' : ''}
                onClick={() => handleNavItemClick("/tvshows")}
              >
                TV Shows
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                as={Link}
                to={"/countries"}
                className={activePage.includes("/countries") ? 'active' : ''}
                onClick={() => handleNavItemClick("/countries")}
              >
                Countries
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Button variant="danger" onClick={handleLogoutClick}>
  LOGOUT
</Button>
            <img style={{borderRadius:"50%", width:"50px", height:'50px'}} src='https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg '></img>
            <h4 className="fw-bold text-center" style={{color:'white'}}>anesshare</h4>
          <Form className="d-flex" onSubmit={handleSearchSubmit}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </Form>

          {searchResults.length > 0 && (
            <div className="search-results">
              <h3>Search Results:</h3>
              <ul>
                {searchResults.map((result) => (
                  <li key={result.id}>{result.title}</li>
                  
                ))}
              </ul>
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
