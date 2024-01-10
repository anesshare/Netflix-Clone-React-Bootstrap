import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import CardTitle from "react-bootstrap/esm/CardTitle";
import CardImg from "react-bootstrap/esm/CardImg";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";


const TVShows = () => {
    const [shows, setShows] = useState([]);

    useEffect(() => {
        const fetchTVShows = async () => {
            try {
                const apiKey = "1ffaead37df105e34b36c449d1064b3f";

               
                const response = await axios.get(
                    `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}`
                );

                setShows(response.data.results);
                console.log(response.data.results);
            } catch (error) {
                console.log(error);
            }
        };

        fetchTVShows();
    }, []);

    return (
        <Container fluid style={{ background: 'linear-gradient(to right, black, gray)', height: '100%' }}>
            <Container className="text-center py-4">
                <h1 className="text-white">All TV Shows</h1>
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
 {shows.map((show) => (
    <Card key={show.id} style={{ width: "400px", margin: "1rem" }}>
        <CardImg style={{ width: '100%', height: "300px" }} src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`} alt={show.name} />
        <CardTitle className="text-black" style={{ alignSelf: 'center' }}>{show.name}</CardTitle>
        <Button variant="danger" as={Link} to={`/tvshow/${show.id}`}>WATCH NOW</Button>{' '}
    </Card>
        ))}
            </Container>
        </Container>
    );
}

export default TVShows;
