import React, { useEffect, useState } from "react";
import { useCrypto } from "../Contexts/CryptoContext";
import axios from "axios";
import { HistoricalChart } from "./config/api";
import { CircularProgress, createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import styled from "@emotion/styled";
import { Line } from "react-chartjs-2";
import SelectButton from "./SelectButton";
import { chartDays } from "./config/data";

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  },
});

function Coininfo({ coin }) {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const [flag, setFlag] = useState(false); 
  const { currency } = useCrypto();

  const fetchHistoricalData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setHistoricData(data.prices);
  };

  useEffect(() => {
    fetchHistoricalData();
  }, [currency, days, coin.id]);

  const DivContainer = styled.div`
    width: 75%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 25px;
    padding: 40px;
  `;

  return (
    <ThemeProvider theme={darkTheme}>
      <DivContainer>
        {historicData && flag && (
          <Line
            data={{
              labels: historicData.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),

              datasets: [
                {
                  data: historicData.map((coin) => coin[1]),
                  label: `Price ( Past ${days} Days ) in ${currency}`,
                  borderColor: "#0B60B0",
                },
              ],
            }}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
          />
        )}
        <div
          style={{
            display: "flex",
            marginTop: 20,
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          {chartDays.map((day) => (
            <SelectButton
              key={day.value}
              onClick={() => {
                setDays(day.value);
                setFlag(false);
              }}
              selected={day.value === days}
            >
              {day.label}
            </SelectButton>
          ))}
        </div>
      </DivContainer>
    </ThemeProvider>
  );
}

export default Coininfo;
