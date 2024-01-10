import React, { useState, useEffect } from "react";
import "./mainscreen.css";
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from "react-router-dom";

const MainScreen = () => {
  const [data, setData] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);


  const fetchData = async () => {
    try {
      const apiKey = "1ffaead37df105e34b36c449d1064b3f";
      const resp = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`
      );
      const firstMovieId = resp.data.results[0]?.id;

      if (firstMovieId) {
        const singleMovieResp = await axios.get(
          `https://api.themoviedb.org/3/movie/${firstMovieId}?api_key=${apiKey}`
        );

        setData([singleMovieResp.data]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPopularMovies = async () => {
    try {
      const apiKey = "1ffaead37df105e34b36c449d1064b3f";
      const timeWindow = "week"; 
  
      const response = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/${timeWindow}?api_key=${apiKey}`
      );
  
      setPopularMovies(response.data.results);
      console.log(response.data.results)
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTopRatedMovies = async () => {
    try {
      const apiKey = "1ffaead37df105e34b36c449d1064b3f";
  
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`
      );
  
      setTopRatedMovies(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
    fetchPopularMovies();
    fetchTopRatedMovies();
  }, []);

  return (
    <Container
      fluid
      style={{
        background: 'linear-gradient(to right, black, gray)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column', 
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      }}
      className="text-white p-5 d-flex align-items-center justify-content-center"
    >
      <Container>
        <Row className="text-center mb-4">
          <Col>
            <h2 className="fw-bold">MOST WATCHED RECENTLY</h2>
          </Col>
        </Row>
        <Row className="text-center mb-4">
          <Col>
            <h1 className="display-1">{data.length > 0 && data[0].title}</h1>
          </Col>
        </Row>
        {data.map((movie) => (
          <Card key={movie.id} style={{ width: "60%", height: "550px", minWidth: "60", margin: "0 auto" }} className="mx-auto mb-4">
            <Card.Img variant="top" style={{ height: "400px" }} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
            <Card.Body className="d-flex flex-column align-items-center justify-content-between">
              <div>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.overview.slice(0, 70)}...</Card.Text>
              </div>
              <Button variant="danger" as={Link} to={`/movie/${movie.id}`}>PLAY NOW</Button>{' '}
            </Card.Body>
          </Card>
        ))}
      </Container>
      <Container style={{ background: "inherit", height: "800px", width: "100%", display: "flex", justifyContent: "center",flexDirection:"column" }}>
      <h2 className="fw-bold text-center" >TRENDING NOW</h2>
        <Carousel style={{width:"85%", alignSelf:"center"}}>
          {popularMovies.map((movie) => (
            <Carousel.Item key={movie.id}>
              <img
                className="d-block w-100"
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                style={{height:"700px",width:"80%"}}
                alt={movie.title}
              />
              <Carousel.Caption>
                <h3>{movie.title}</h3>
                <p>{movie.overview}</p>
                <Button variant="danger" as={Link} to={`/movie/${movie.id}`}>PLAY NOW</Button>{' '}       
                       </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
      <Container style={{ background: "inherit", height: "800px", width: "100%", display: "flex", justifyContent: "center",flexDirection:"column" }}>
      <h2 className="fw-bold text-center" >TOP RATED</h2>
        <Carousel style={{width:"85%", alignSelf:"center"}}>
          {topRatedMovies.map((movie) => (
            <Carousel.Item key={movie.id}>
              <img
                className="d-block w-100"
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                style={{height:"700px",width:"80%"}}
                alt={movie.title}
              />
              <Carousel.Caption>
                <h3>{movie.title}</h3>
                <p>{movie.overview}</p>
                <Button variant="danger" as={Link} to={`/movie/${movie.id}`}>PLAY NOW</Button>{' '}
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </Container>
  );
};

export default MainScreen;
