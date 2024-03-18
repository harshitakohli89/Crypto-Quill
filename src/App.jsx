import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { styled } from "@mui/system";
import CoinPage from "./Pages/CoinPage";
import HomePage from "./Pages/HomePage";
import Alert from "./components/Alert";
import Header from "./components/Header";

const AppContainer = styled('div')({ 
  backgroundColor: "#14161a",
  color: "white",
  minHeight: "100vh",
});
function App() {
 
  return (
    <Router>
      <AppContainer>
        <Header/>
        <Routes>
          <Route path="/" Component={HomePage}></Route>
          <Route path="/coins/:id" Component={CoinPage}></Route>
        </Routes>
        <Alert/>
      </AppContainer>
    </Router>
  );
}

export default App;
