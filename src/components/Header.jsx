import React from "react";
import {
  AppBar,
  Container,
  MenuItem,
  Select,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useCrypto } from "../Contexts/CryptoContext";
import AuthModal from "./Authentication/AuthModal";
import UserSidebar from "./Authentication/UserSidebar";

const Title = styled(Typography)({
  flex: 1,
  color: "#0B60B0", //title color
  fontFamily: "Montserrat",
  fontWeight: "bold",
  cursor: "pointer",
});
function Header() {
  const navigate = useNavigate();
  const { currency, setCurrency, symbo, user } = useCrypto(); // Use useCrypto hook to access context
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#0B60B0",
      },
      type: "dark",
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Title onClick={() => navigate("/")} variant="h6">
              Crypto Quill
            </Title>
            <Select
              variant="outlined"
              sx={{
                width: 100,
                height: 40,
                marginLeft: 15,
                color: "white", // Set text color
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.08)", // Hover background color
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#0B60B0", // Border color
                },
                "& .MuiSelect-icon": {
                  color: "white", // Dropdown icon color
                },
              }}
              value={currency}  
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"INR"}>₹ INR</MenuItem>
              <MenuItem value={"USD"}>$ USD</MenuItem>
            </Select>
            {user?<UserSidebar/>:<AuthModal/>}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;
