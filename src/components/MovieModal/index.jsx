import React, { useRef } from 'react'
import styled from 'styled-components'

const MovieModal = ({
  backdrop_path,
  title,
  overview,
  name,
  release_date,
  first_air_date,
  vote_average,
  setModalOpen
}) => {
  const ref = useRef();

  return (
    <Presentation role='presentation'>
      <WrapperModal>
        <Modal className='modal' ref={ref}>
          <ModalCloseButton onClick={() => setModalOpen(false)}>
            X
          </ModalCloseButton>

          <ModalPosterImage
            src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
            alt='modal__poster-img'
          />

          <ModalContent>
            <ModalDetails>
              <ModalUserPercentage>
                {release_date ? release_date : first_air_date}
              </ModalUserPercentage>
            </ModalDetails>

            <ModalTitle>{title ? title : name}</ModalTitle>
            <p className='modal__overview'> 평점 : {vote_average}</p>
            <ModalOverview>{overview}</ModalOverview>
          </ModalContent>
        </Modal>
      </WrapperModal>
    </Presentation>
  )
}

const Presentation = styled.div`
  z-index: 1200;
  position: absolute;
`;

const WrapperModal = styled.div`
  position: fixed;
  inset: 0px;
  background-color: rgb(0 0 0 / 71%);
  -webkit-tap-highlight-color: transparent;
  display: flex;
  justify-content: center;

  @media screen and (max-height: 768px) {
    align-items: unset;
    padding-top: 2rem;
  }

  @media screen and (max-width: 768px) {
    padding: 0;
  }
`;

const Modal = styled.div`
  position: relative;
  max-width: 800px;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12);
  background: #111;
  overflow: hidden;
  border-radius: 8px;
  transition: all 400ms ease-in-out 2s;
  animation: fadeIn 400ms;

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none;
    visibility: hidden;
  }

  @media screen and (max-height: 768px) {
    overflow-y: scroll;
  }

  @media screen and (max-width: 768px) {
    overflow-y: scroll !important;
  }
`;

const ModalCloseButton = styled.span`
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
  z-index: 1000;
  color: white;
`;

const ModalPosterImage = styled.img`
  width: 100%;
  height: auto;
`;

const ModalContent = styled.div`
  padding: 40px;
  color: white;
`;

const ModalDetails = styled.p`
  font-weight: 600;
  font-size: 18px;

  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
`;

const ModalTitle = styled.h2`
  padding: 0;
  font-size: 40px;
  margin: 16px 0;
`;

const ModalOverview = styled.p`
  font-size: 20px;
  line-height: 1.5;

  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
`;

const ModalUserPercentage = styled.span`
  color: #46d369;
`;

// @keyframes fadeIn {
//   from {
//     opacity: 0;
//     transform: scale(0.5);
//   }
//   to {
//     opacity: 1;
//     transform: scale(1);
//   }
// }

export default MovieModal