import styled from '@emotion/styled';
import React from 'react';
import bannerImage from './BannerUpdate.jpg'; 
import { Container, Typography } from '@mui/material';
import Carousel from './Carousel';


const BannerContainer = styled.div`
  background-image: url(${bannerImage});
  height: 290px;
  display: flex;
  flex-direction: column;
  padding-top: 25px;
  justify-content: space-around;
`;

const Tagline = styled.div`
  display: flex;
  height: 35%;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

const CenteredCarousel = styled(Carousel)`
  margin: auto;
`;

function Banner() {
  return (
    <BannerContainer>
      <Container>
        <Tagline>
          <Typography
            variant='h2'
            style={{
              fontWeight: 'bold',
              marginBottom: 10,
              fontFamily: 'Montserrat',
              paddingTop:"10px",
            }}
          >
            Crypto Quill
          </Typography>
          <Typography
            variant='subtitle2'
            style={{
              color: 'darkgray',
              fontWeight: 'bold',
              textTransform: 'capitalize',
              fontFamily: 'Montserrat',
              paddingBottom:"50px"
            }}
          >
            Your Window into the Crypto World.
          </Typography>
        </Tagline>
        <CenteredCarousel />
      </Container>
    </BannerContainer>
  );
}

export default Banner;
