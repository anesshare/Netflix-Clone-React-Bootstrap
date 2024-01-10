import React, { useEffect, useState } from "react";
import axios from "axios";
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import CardTitle from "react-bootstrap/esm/CardTitle";
import CardImg from "react-bootstrap/esm/CardImg";
import Container from "react-bootstrap/Container";

const Countries = () => {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const fetchAllCountries = async () => {
            try {
                const response = await axios.get(`https://flagcdn.com/en/codes.json`);
                const countriesData = response.data;

                
                const countriesArray = Object.keys(countriesData).map((code) => ({
                    code: code,
                    name: countriesData[code],
                    flagUrl: `https://flagcdn.com/w1600/${code.toLowerCase()}.png`, 
                }));

                setCountries(countriesArray);
            } catch (error) {
                console.log(error);
            }
        };

        
        fetchAllCountries();
    }, []);

    return (
        <Container fluid style={{ background: 'linear-gradient(to right, black, gray)', minHeight: '100vh', padding: '2rem' }}>
            <h1 className="text-white text-center mb-4">Supported Countries</h1>
            <Carousel>
                {countries.map((country) => (
                    <Carousel.Item key={country.code}>
                        <Card style={{ width: "300px", margin: "0 auto" }}>
                            <CardImg style={{ width: '100%', height: "200px", objectFit: 'cover' }} src={country.flagUrl} alt={country.name} />
                            <CardTitle className="text-black" style={{ textAlign: 'center', padding: '1rem' }}>{country.name}</CardTitle>
                        </Card>
                    </Carousel.Item>
                ))}
            </Carousel>
        </Container>
    );
};

export default Countries;
