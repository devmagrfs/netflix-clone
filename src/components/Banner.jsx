import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import axios from '../api/axios';
import requests from '../api/requests';

const Banner = () => {
  const [movie, setMovie] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [isVideo, setIsVideo] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const request = await axios.get(requests.fetchNowPlaying);
    const movieId = request.data.results[Math.floor(Math.random() * request.data.results.length)].id;

    const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
      params: { append_to_response: 'video' },
    });

    setMovie(movieDetail);
    setIsVideo(!movieDetail.video);
  };

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  if (!isClicked) {
    return (
      <BannerContainer style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
        backgroundPosition: 'top center',
        backgroundSize: 'cover',
      }}>
        <BannerContents>
          <BannerTitle>
            {movie.title || movie.name || movie.original_name}
          </BannerTitle>
          <BannerButtons>
            <BannerPlayButton onClick={() => setIsClicked(true)} disabled={isVideo}>
              Play
            </BannerPlayButton>
            <BannerInfoButton>
              More Information
            </BannerInfoButton>
          </BannerButtons>
          <BannerDescription>{truncate(movie.overview, 100)}</BannerDescription>
        </BannerContents>
        <BannerFadeBottom></BannerFadeBottom>
      </BannerContainer>
    )
  } else {
    return (
      <VideoContainer>
        <VideoHomeContainer>
          <Iframe
            src={`https://www.youtube.com/embed/${movie.videos?.results[0]?.key}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos?.results[0]?.key}`}
            title='Youtube Video Player'
            width='640'
            height='360'
            frameborder='0'
            allow='autoplay; fullscreen'
          ></Iframe>
        </VideoHomeContainer>
      </VideoContainer>
    )
  }
}

const BannerContainer = styled.header`
  color: white;
  object-fit: contain;
  height: 448px;

  @media (min-width: 1500px) {
    position: relative;
    height: 600px;
  }
`;

const BannerContents = styled.div`
  margin-left: 40px;
  padding-top: 140px;
  height: 190px;

  @media(max-width: 768px) {
    width: min-content !important;
    padding-left: 2.3rem;
    margin-left: 0 !important;
  }
`;

const BannerTitle = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  padding-bottom: 0.5rem;
`;

const BannerButtons = styled.div`
  display: flex;
  flex-direction: row;
`;

const BannerButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  cursor: pointer;
  outline: none;
  border: none;
  font-size: 1rem;
  font-weight: 700;
  border-radius: 0.2vw;
  padding: 0.4rem 1.8rem 0.4rem 1rem;
  margin-right: 1rem;

  &:hover {
    color: #000;
    background-color: rgba(170, 170, 170, 0.9);
    transition: all 0.2s;
  }

  @media (max-width: 768px) {
    font-size: 0.8rem !important;
    border-radius: 4px !important;
  }
`;

const BannerPlayButton = styled(BannerButton)`
  background-color: white;
  color: black;

  &:disabled {
    cursor: default;
  }
`;

const BannerInfoButton = styled(BannerButton)`
  background-color: rgba(109, 109, 110, 0.7);
  color: white;

  &:hover {
    background-color: rgb(74, 74, 74);
    color: white;
  }
  
  @media (max-width: 768px) {
    text-align: start;
    padding-right: 1.2rem;
  }
`;

const BannerDescription = styled.h1`
  width: 45rem;
  line-height: 1.3;
  padding-top: 1rem;
  font-weight: 500;
  font-size: 1rem;
  max-width: 400px;
  height: 80px;

  @media (max-width: 768px) {
    font-size: 0.8rem !important;
    width: auto !important;
  }
`;

const BannerFadeBottom = styled.div`
  height: 7.4rem;
  background-image: linear-gradient(
    180deg,
    transparent,
    rgba(37, 37, 37, 0.61),
    #111
  );

  @media(min-width: 1500px) {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 40rem;
  }
`;

const VideoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const VideoHomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.65;
  border: none;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;


export default Banner