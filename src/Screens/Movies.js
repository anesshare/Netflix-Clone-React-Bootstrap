import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import CardTitle from "react-bootstrap/esm/CardTitle";
import CardImg from "react-bootstrap/esm/CardImg";
import Button from "react-bootstrap/esm/Button";

const Movies = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchAllMovies = async () => {
            try {
                const apiKey = "1ffaead37df105e34b36c449d1064b3f";

                
                const response = await axios.get(
                    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`
                );

                setMovies(response.data.results);
                console.log(response.data.results);
            } catch (error) {
                console.log(error);
            }
        };

        
        fetchAllMovies();
    }, []); 

    return (
        <Container fluid style={{ background: 'linear-gradient(to right, black, gray)', height: '100%' }}>
            <Container className="text-center py-4">
                <h1 className="text-white">All Movies</h1>
            </Container>
            <Container
                fluid
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',  
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    width: '100%',
                }}
            >
                {movies.map((movie) => (
                    <Link key={movie.id} to={`/movie/${movie.id}`} style={{ textDecoration: 'none' }}>
                        <Card style={{ width: "400px", margin: "1rem" }}>
                            <CardImg style={{ width: '100%', height: "300px" }} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                            <CardTitle className="text-black" style={{ alignSelf: 'center' }}>{movie.title}</CardTitle>
                            <Button style={{ width: '70%', alignSelf: 'center' }} variant="danger">PLAY NOW</Button>{' '}
                        </Card>
                    </Link>
                ))}
            </Container>
        </Container>
    );
}

export default Movies;
