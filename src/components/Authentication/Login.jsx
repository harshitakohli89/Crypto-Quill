import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react'
import { useCrypto } from '../../Contexts/CryptoContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Firebase';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setAlert } = useCrypto();
  
    const handleSubmit = async () => {
      if (!email || !password) {
        setAlert({
          open: true,
          message: "Please fill in all the fields",
          type: "error",
        });
        return;
      }
  
      try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        setAlert({
          open: true,
          message: `Logged in successfully. Welcome ${result.user.email}`,
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
  
        <Button
          variant="contained"
          size="large"
          style={{ backgroundColor: "#0B60B0" }}
          onClick={handleSubmit}
        >
          Log In
        </Button>
      </Box>
    );
  }