import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import axios from '../api/axios';
import MovieModal from './MovieModal';
import './Row.css';


const Row = ({ title, id, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState({});

  const handleClick = (movie) => {
    setModalOpen(true);
    setMovieSelected(movie);
  };

  useEffect(() => {
    fetchMovieData();
  }, []);

  const fetchMovieData = async () => {
    const request = await axios.get(fetchUrl);
    setMovies(request.data.results);
  };

  return (
    <RowContainer>
      <RowTitle>{title}</RowTitle>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        navigation
        loop={true}
        breakpoints={{
          1378: {
            slidesPerView: 6,
            slidesPerGroup: 6,
          },
          998: {
            slidesPerView: 5,
            slidesPerGroup: 5,
          },
          625: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
          0: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
        }}
      >
        <RowPosters id={id}>
          {movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <RowPoster
                key={movie.id}
                onClick={() => handleClick(movie)}
                isLargeRow={`${isLargeRow ? 'isLargeRow' : ''}`}
                src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                loading='lazy'
                alt={movie.name}
              />
            </SwiperSlide>
          ))}
        </RowPosters>
      </Swiper>
      {
        modalOpen && <MovieModal {...movieSelected} setModalOpen={setModalOpen} />
      }
    </RowContainer>
  )
}

const RowContainer = styled.section`
  padding: 0 20px 0 20px;
  color: white;
  background-color: black;
`;

const RowTitle = styled.h2`
  padding: 20px;
  margin: 0;
`;

const RowPosters = styled.div`
  display: flex;
  overflow-y: hidden;
  overflow-x: scroll;
  padding: 20px 0 20px 20px;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const RowPoster = styled.img`
  object-fit: contain;
  width: 100%;
  max-height: ${({ isLargeRow }) => isLargeRow ? '320px' : '144px'};
  margin-right: 10px;
  transition: transform 450ms;
  border-radius: 4px;

  &:hover {
    transform: ${({ isLargeRow }) => isLargeRow ? 'scale(1.1)' : 'scale(1.08)'};
    opacity: ${({ isLargeRow }) => isLargeRow ? '1' : ''};
  }

  @media screen and (min-width: 1200px) {
    max-height: ${({ isLargeRow }) => isLargeRow ? '360px' : '160px'};
  }

  @media screen and (max-width: 768px) {
    max-height: ${({ isLargeRow }) => isLargeRow ? '280px' : '100px'};
  }
`;



export default Row