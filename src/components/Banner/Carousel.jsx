import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import { TrendingCoins } from "../config/api";
import { useCrypto } from "../../Contexts/CryptoContext";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";

const CarouselContent = styled.div`
  height: 50%;
  display: flex;
  align-items: center;
`;

const CarouselItem = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  text-transform: uppercase;
  color: white;
`;

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function Carousel() {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = useCrypto(); // Use useCrypto hook to access context

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

  const items = trending.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0;
    return (
      <CarouselItem to={`/coins/${coin.id}`} key={coin.id}>
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span>
          {coin?.symbol}&nbsp;
          <span
            style={{
              color: profit ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}
          >
            {profit ? "+" : "-"}
            {Math.abs(coin?.price_change_percentage_24h).toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
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
    <CarouselContent>
      <AliceCarousel
      mouseTracking
      infinite
      autoPlayInterval={1000}
      animationDuration={1500}
      disableDotsControls
      disableButtonsControls
      responsive={responsive}
      autoPlay
      items={items}
      stagePadding={{ paddingLeft: 50, paddingRight: 50 }} // Adjust padding as needed
    />
    </CarouselContent>
  );
}

export default Carousel;
