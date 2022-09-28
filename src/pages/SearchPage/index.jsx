import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components';

import axios from '../../api/axios';
import { useDebounce } from '../../hooks/useDebounce';


const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();
  const debounceSearchTerm = useDebounce(query.get('q'), 500);

  useEffect(() => {
    // searchTerm이 바뀔때마다 call해준다.
    if (debounceSearchTerm) {
      fetchSearchMovie(debounceSearchTerm);
    }
  }, [debounceSearchTerm]);

  const fetchSearchMovie = async (debounceSearchTerm) => {
    try {
      const requests = await axios.get(
        `search/multi?include_adult=false&query=${debounceSearchTerm}`
      );
      setSearchResults(requests.data.results);
    } catch (error) {
      console.log('error', error);
    }
  };

  const renderSearchResults = () => {
    return searchResults.length > 0 ? (
      <ResultSearchContainer className='search-container'>
        {searchResults.map((movie) => {
          if (movie.backdrop_path !== null && movie.media_type !== 'person') {
            const movieImageUrl = 'https://image.tmdb.org/t/p/w500' + movie.backdrop_path

            return (
              <SearchMovieBox key={movie.id}>
                <SearchMoviePoster>
                  <SearchMovieImage src={movieImageUrl} alt="movie" />
                </SearchMoviePoster>
              </SearchMovieBox>
            )
          }
        })}
      </ResultSearchContainer>
    ) : (
      <NoResultSearchContainer>
        <div className='no-results__text'>
          <p>
            찾고자 하는 검색어 `{debounceSearchTerm}`에 맞는 영화가 없습니다.
          </p>
        </div>
      </NoResultSearchContainer>
    )
  };

  return renderSearchResults();
}

const ResultSearchContainer = styled.section`
  background: black;
  width: 100%;
  text-align: center;
  padding: 5rem 0;
`;

const NoResultSearchContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #c5c5c5;
  height: 100%;
  padding: 8rem;
`;

const SearchMovieBox = styled.div`
  flex: 1 1 auto;
  display: inline-block;
  padding-right: 0.5rem;
  padding-bottom: 7rem;
`

const SearchMoviePoster = styled.div`
  cursor: pointer;
  transition: transform 0.3s;
  -webkit-transition: transform 0.3s;

  &:hover {
    transform: scale(1.25);
  }
`;

const SearchMovieImage = styled.img`
  width: 90%;
  border-radius: 5px;
`;

export default SearchPage;