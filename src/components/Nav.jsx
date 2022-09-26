import React, { useEffect, useState } from 'react';
import styled from 'styled-components';


const Nav = () => {
  const [show, setShow] = useState(false);

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

  return (
    <NavigationContainer color={`${show ? 'black' : ''}`}>
      <NavNetflixLogo
        alt='Netflix Logo'
        src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2880px-Netflix_2015_logo.svg.png'
        onClick={() => window.location.reload()}
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

export default Nav;
