import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import ReactPlayer from "react-player";

const ShowDetail = () => {
  const { id } = useParams();
  const [showDetails, setShowDetails] = useState(null);
  const [videoKey, setVideoKey] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const apiKey = "1ffaead37df105e34b36c449d1064b3f";

        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}`
        );

        setShowDetails(response.data);

     
        setBackgroundImage(
          response.data.backdrop_path
            ? `https://image.tmdb.org/t/p/original${response.data.backdrop_path}`
            : null
        );

        const videoResponse = await axios.get(
          `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${apiKey}`
        );

        if (videoResponse.data.results.length > 0) {
          setVideoKey(videoResponse.data.results[0].key);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchShowDetails();
  }, [id]);

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Container
        fluid
        style={{
          background: "rgba(0, 0, 0, 0.8)", 
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
        className="text-white p-5 d-flex align-items-center justify-content-center"
      >
        {showDetails ? (
          <>
            <h1>{showDetails.name}</h1>
            <p>Description: {showDetails.overview}</p>
            {videoKey && (
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${videoKey}`}
                controls
                width="800px"
                height="450px"
              />
            )}
          </>
        ) : (
          <p>Loading...</p>
        )}
      </Container>
    </div>
  );
};

export default ShowDetail;
