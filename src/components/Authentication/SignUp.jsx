import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useCrypto } from "../../Contexts/CryptoContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase";

export default function SignUp({ handleClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { setAlert } = useCrypto();

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setAlert({
        open: true,
        message: 'Passwords do not match',
        type: 'error'
      });
      return;
    }
  
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      if (result) {
        setAlert({
          open: true,
          message: `Sign Up Successful. Welcome ${result.user.email}`,
          type: 'success'
        });
        handleClose(); 
      }
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: 'error'
      });
    }
  };
  

  return (
    <Box
      p={3}
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
      <TextField
        variant="outlined"
        type="email"
        label="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        variant="outlined"
        type="password"
        label="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <TextField
        variant="outlined"
        type="password"
        label="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth
      />
      <Button
        variant="contained"
        size="large"
        style={{ backgroundColor: "#0B60B0" }}
        onClick={handleSubmit}
      >
        Sign Up
      </Button>
    </Box>
  );
}
