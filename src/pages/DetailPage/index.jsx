import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components';

import axios from '../../api/axios';


const DetailPage = () => {
  let { movieId } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(
        `/movie/${movieId}`
      )
      setMovie(request.data);
    }
    fetchData();
  }, [movieId])


  if (!movie) return <div>...loading</div>;

  return (
    <section>
      <DetailImage
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt="poster"
      />
    </section>
  )
}

const DetailImage = styled.img`
  width: 100%;
  height: auto;
`;

export default DetailPage;