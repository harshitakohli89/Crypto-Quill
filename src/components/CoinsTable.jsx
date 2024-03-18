import axios from "axios";
import React, { useEffect, useState } from "react";
import { CoinList } from "./config/api";
import { useCrypto } from "../Contexts/CryptoContext";
import {
  Container,
  LinearProgress,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { numberWithCommas } from "./Banner/Carousel";

import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

function CoinsTable() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const { currency, symbol } = useCrypto();
  const fetchCoins = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(CoinList(currency));
      setCoins(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching coins:", error);
      // Handle the error here (e.g., show error message to the user)
      setLoading(false);
    }
  };

  // console.log(coins);
  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#0B60B0",
      },
      type: "dark",
    },
  });

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  const StyledTableRow = styled(TableRow)`
    background-color: #16171a;
    cursor: pointer;
    &:hover {
      background-color: #131111;
    }
    font-family: "Montserrat";
  `;

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Montserrat" }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>

        <TextField
          label="Search for a Crypto Currency.."
          variant="outlined"
          sx={{
            marginBottom: 20,
            width: "100%",
            "& .MuiInputLabel-root": {
              color: "white", // Change the label text color to white
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white", // Change the border color to blue
              },
              "& input": {
                color: "white", // Change the text color to blue
              },
            },
          }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "#0B60B0" }} />
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: "#0B60B0" }}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={{
                        color: "white",
                        fontFamily: "Montserrat",
                        fontWeight: "700",
                      }}
                      key={head}
                      align={head === "Coin" ? "left" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;
                    return (
                      <StyledTableRow
                        onClick={() => navigate(`/coins/${row.id}`)}
                        key={row.name}
                      >
                        <TableCell
                          component={"th"}
                          scope="row"
                          style={{
                            color: "white",
                            display: "flex",
                            gap: 15,
                          }}
                        >
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />

                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              {row.symbol}
                            </span>

                            <span style={{ color: "darkgray" }}>
                              {row.name}
                            </span>
                          </div>
                        </TableCell>

                        <TableCell
                          align="right"
                          style={{
                            color: "white",
                          }}
                        >
                          {symbol}{" "}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14,203,129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right" style={{ color: "white" }}>
                          {symbol}{" "}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </TableCell>
                      </StyledTableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Pagination
  style={{
    padding: 20,
    width: "100%",
    display: "flex",
    justifyContent: "center",
  }}
  count={parseInt(Math.ceil(handleSearch().length / 10))}
  page={page}
  onChange={(_, value) => {
    setPage(value);
    window.scroll(0, 450);
  }}
  sx={{
    '& .Mui-selected': {
      color: '#fff', // Color for the selected page number
    },
    '& .MuiPaginationItem-root': {
      color: '#0B60B0', // Color for the page numbers
    },
  }}
/>

      </Container>
    </ThemeProvider>
  );
}

export default CoinsTable;
