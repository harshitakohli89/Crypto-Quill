import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCrypto } from "../Contexts/CryptoContext";
import axios from "axios";
import { SingleCoin } from "../components/config/api";
import Coininfo from "../components/Coininfo";
import styled from "@emotion/styled";
import { Box } from "@mui/system";
import { LinearProgress, Typography, useTheme } from "@mui/material";
import { numberWithCommas } from "../components/Banner/Carousel";

function CoinPage() {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const { currency, symbol } = useCrypto();
  const theme = useTheme();

  const fetchCoins = async () => {
    try {
      const { data } = await axios.get(SingleCoin(id));
      setCoin(data);
    } catch (error) {
      console.error("Error fetching coin:", error);
    }
  };

  useEffect(() => {
    fetchCoins();
  }, [id]);

  const DivContainer = styled(Box)`
    display: flex;
    ${theme.breakpoints.down("md")} {
      flex-direction: column;
      align-items: center;
    }
  `;

  const DivSidebar = styled(Box)`
    width: 30%;
    ${theme.breakpoints.down("md")} {
      width: 100%;
    }
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 25px;
    border-right: 2px solid grey;
  `;

  const Heading = styled(Typography)`
    font-weight: bold;
    margin-bottom: 20px;
    font-family: Montserrat;
  `;
  const Description = styled(Typography)`
  width: 100%;
  font-family: Montserrat;
  padding: 25px;
  padding-top: 10px;
  padding-bottom: 15px;
  text-align: justify; 
`;

const MarketData = styled(Box)`
alignSelf:"start",
padding:25px,
paddingTop:10px,
width:"100%",
${theme.breakpoints.down("md")} {
  display:"flex",
  justifyContent:"space-around",
},
${theme.breakpoints.down("sm")} {
  flexDirection:"column",
  alignItems:"center",
},
${theme.breakpoints.down("xs")} {
  alignItems:"start"
}
`;


  if (!coin) return <LinearProgress style={{ backgroundColor: "0B60B0" }} />;

  return (
    <DivContainer>
      <DivSidebar>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Heading variant="h3">{coin?.name}</Heading>
        <Description variant="subtitle1">
          {coin?.description.en.split(". ")[0]}
        </Description>
        <MarketData>
          <span style={{ display: "flex" }}>
            <Heading variant="h5">Rank:</Heading>
            &nbsp; &nbsp;
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
              {coin?.market_cap_rank}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Heading variant="h5">Current Price:</Heading>
            &nbsp; &nbsp;
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Heading variant="h5">Market Cap:</Heading>
            &nbsp; &nbsp;
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
        </MarketData>
      </DivSidebar>
      <Coininfo coin={coin} />
    </DivContainer>
  );
}

export default CoinPage;
