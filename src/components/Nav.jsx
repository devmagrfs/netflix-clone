import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';


const Nav = () => {
  const [show, setShow] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        setShow(true);
      } else {
        setShow(false);
      }
    })

    return () => {
      window.removeEventListener('scroll', () => { });
    }
  }, [])

  const handleChange = (event) => {
    setSearchValue(event.target.value);
    navigate(`/search?q=${event.target.value}`);
  }

  return (
    <NavigationContainer color={`${show ? 'black' : ''}`}>
      <NavNetflixLogo
        alt='Netflix Logo'
        src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2880px-Netflix_2015_logo.svg.png'
        onClick={() => window.location.reload()}
      />
      <SearchInput
        value={searchValue}
        onChange={handleChange}
        type='text'
        placeholder='영화를 검색해주세요.'
      />
      <NavUserLogo
        alt='User logged'
        src='https://cdn-icons-png.flaticon.com/512/5087/5087579.png'
      />
    </NavigationContainer>
  )
}

const NavigationContainer = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  height: 30px;
  z-index: 1;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition-timing-function: ease-in;
  transition: all 0.5s;
  background-color: ${({ color }) => color || ''};
`;

const NavNetflixLogo = styled.img`
  position: fixed;
  left: 40px;
  width: 80px;
  object-fit: contain;
`;

const NavUserLogo = styled.img`
  position: fixed;
  right: 40px;
  width: 30px;
  object-fit: contain;
`;

const SearchInput = styled.input`
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: rgba(0, 0, 0, 0.582);
  border-radius: 5px;
  color: white;
  padding: 5px;
  border: none;
`;

export default Nav;
