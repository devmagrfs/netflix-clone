import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from '../api/axios';
import MovieModal from './MovieModal';


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
      <Slider>
        <SliderLeftArrow>
          <Arrow >
            {'<'}
          </Arrow>
        </SliderLeftArrow>
        <RowPosters id={id}>
          {movies.map((movie) => (
            <RowPoster
              key={movie.id}
              onCliuck={() => handleClick(movie)}
              isLargeRow={`${isLargeRow} ? 'isLargeRow' : ''`}
              src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
              loading='lazy'
              alt={movie.name}
            />
          ))}
        </RowPosters>
        <SliderRightArrow>
          <Arrow>
            {'>'}
          </Arrow>
        </SliderRightArrow>
      </Slider>

      {
        modalOpen && <MovieModal {...movieSelected} setModalOpen={setModalOpen} />
      }
    </RowContainer>
  )
}

const RowContainer = styled.section`
  margin-left: 20px;
  color: white;
`;

const RowTitle = styled.h2`
  padding-left: 20px;
`;

const Slider = styled.div`
  position: relative;

  &:hover {
    transition: 400ms all ease-in-out;
    visibility: visible;
  }
`;

const SliderLeftArrow = styled.div`
  background-clip: content-box;
  padding: 20px 0;
  box-sizing: border-box;
  transition: 400ms all ease-in-out;
  cursor: pointer;
  width: 80px;
  z-index: 1000;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: hidden;

  &:hover {
    background: rgba(20, 20, 20, 0.5);
    transition: 400ms all ease-in-out;
  }
`;

const SliderRightArrow = styled.div`
  padding: 20px 0;
  background-clip: content-box;
  box-sizing: border-box;
  transition: 400ms all ease-in-out;
  cursor: pointer;
  width: 80px;
  z-index: 1000;
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: hidden;

  &:hover {
    background: rgba(20, 20, 20, 0.5);
    transition: 400ms all ease-in-out;
  }
`;

const Arrow = styled.span`
  transition: 400ms all ease-in-out;

  &:hover {
    transition: 400ms all ease-in-out;
    transform: scale(1.5);
  }
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
    transform: ${({ isLargeRow }) => isLargeRow ? '1.1' : '1.08'};
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