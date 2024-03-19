import React from "react";
import { useCrypto } from "../../Contexts/CryptoContext";
import { signOut } from "firebase/auth";
import { numberWithCommas } from "../Banner/Carousel";
import { AiFillDelete } from "react-icons/ai";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../Firebase";
import Drawer from "@mui/material/Drawer";
import { styled } from "@mui/system";
import { Avatar, Button } from "@mui/material";

const Container = styled("div")({
  width: 350,
  padding: 25,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  fontFamily: "monospace",
});

const Profile = styled("div")({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "20px",
  height: "92%",
});

const LogoutButton = styled(Button)({
  height: "8%",
  width: "100%",
  backgroundColor: "#0B60B0",
  marginTop: 20,
});

const Picture = styled(Avatar)({
  width: 200,
  height: 200,
  cursor: "pointer",
  backgroundColor: "#0B60B0",
  objectFit: "contain",
});

const Watchlist = styled("div")({
  flex: 1,
  width: "100%",
  backgroundColor: "grey",
  borderRadius: 10,
  padding: 15,
  paddingTop: 10,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 12,
  overflowY: "scroll",
});

const Coin = styled("div")({
  padding: 10,
  borderRadius: 5,
  color: "black",
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#0B60B0",
  boxShadow: "0 0 3px black",
});

export default function UserSidebar() {
  const [state, setState] = React.useState({
    right: false,
  });
  const { user, setAlert, watchlist, coins, symbol } = useCrypto();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const logOut = () => {
    signOut(auth);
    setAlert({
      open: true,
      type: "success",
      message: "Logout Successfull !",
    });

    toggleDrawer();
  };

  const removeFromWatchlist = async (coin) => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist.filter((wish) => wish !== coin?.id) },
        { merge: true }
      );

      setAlert({
        open: true,
        message: `${coin.name} Removed from the Watchlist !`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar
            onClick={toggleDrawer(anchor, true)}
            style={{
              height: 38,
              width: 38,
              marginLeft: 15,
              cursor: "pointer",
              backgroundColor: "#0B60B0",
            }}
            src={user.photoURL}
            alt={user.displayName || user.email}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <Container>
              <Profile>
                <Picture
                  src={user.photoURL}
                  alt={user.displayName || user.email}
                />
                <span
                  style={{
                    width: "100%",
                    fontSize: 25,
                    textAlign: "center",
                    fontWeight: "bolder",
                    wordWrap: "break-word",
                  }}
                >
                  {user.displayName || user.email}
                </span>
                <Watchlist>
                  <span style={{ fontSize: 15, textShadow: "0 0 5px black" }}>
                    Watchlist
                  </span>
                  {coins &&
                    coins.length > 0 &&
                    coins.map((coin) => {
                      if (watchlist.includes(coin.id)) {
                        return (
                          <Coin key={coin.id}>
                            <span>{coin.name}</span>
                            <span style={{ display: "flex", gap: 8 }}>
                              {symbol}{" "}
                              {numberWithCommas(coin.current_price.toFixed(2))}
                              <AiFillDelete
                                style={{ cursor: "pointer" }}
                                fontSize="16"
                                onClick={() => removeFromWatchlist(coin)}
                              />
                            </span>
                          </Coin>
                        );
                      } else {
                        return null;
                      }
                    })}
                </Watchlist>
              </Profile>
              <LogoutButton variant="contained" onClick={logOut}>
                Log Out
              </LogoutButton>
            </Container>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
