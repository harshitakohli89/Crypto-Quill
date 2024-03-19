import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import {TrendingCoins} from '../config/api'
import {useCrypto} from '../../Contexts/CryptoContext'
import axios from 'axios';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';


const CarouselContainer = styled.div`
  height: 50%;
  display: flex;
  align-items: center;
  flexWrap: 'wrap',
`;

const CarouselItem = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  text-transform: uppercase;
  color: white;
  flexWrap: 'wrap',
`;

  export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const Carousel = () => {
    const [trending, setTrending] = useState([]);
    const { currency, symbol } = useCrypto();
  
    const fetchTrendingCoins = async () => {
      try {
        const { data } = await axios.get(TrendingCoins(currency));
        setTrending(data);
      } catch (error) {
        console.error("Error fetching trending coins:", error);
      }
    };
  
    useEffect(() => {
      fetchTrendingCoins();
    }, [currency]);
  
    const items = trending.map((coin, index) => {
      const profit = parseFloat(coin?.price_change_percentage_24h) >= 0;
  
      return (
        <CarouselItem key={index} to={`/coins/${coin.id}`}>
          <img
            src={coin?.image}
            alt={coin.name}
            height="80"
            style={{ marginBottom: 10 }}
          />
          <span>
            {coin?.symbol}
            &nbsp;
            <span
              style={{
                color: profit ? "rgb(14, 203, 129)" : "red",
                fontWeight: 500,
              }}
            >
              {profit && "+"}
              {parseFloat(coin?.price_change_percentage_24h)?.toFixed(2)}%
            </span>
          </span>
          <span style={{ fontSize: 22, fontWeight: 500 }}>
            {symbol} {parseFloat(coin?.current_price.toFixed(2))}
          </span>
        </CarouselItem>
      );
    });
  
    const responsive = {
      0: {
        items: 2,
      },
      512: {
        items: 4,
      },
    };
  
    return (
      <CarouselContainer>
        <AliceCarousel
          mouseTracking
          infinite
          autoPlayInterval={1000}
          animationDuration={1500}
          disableDotsControls
          disableButtonsControls
          responsive={responsive}
          items={items}
          autoPlay
        />
      </CarouselContainer>
    );
  };
  
  export default Carousel;
  