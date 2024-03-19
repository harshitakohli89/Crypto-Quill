import React from 'react'
import { useCrypto } from '../Contexts/CryptoContext'
import { Snackbar } from '@mui/material'
import MuiAlert from '@mui/material/Alert';

export default function Alert() {
    const { alert, setAlert } = useCrypto();
    

    const handleClose = (event , reason)=>{
        if(reason==="clickAway"){
            return;
        }
        setAlert({ ...alert, open: false });
    };
  return (
    <Snackbar
    open={alert.open}
    autoHideDuration={3000}
    onClose={handleClose}
    >
        <MuiAlert
        onClose={handleClose}
        elevation={10}
        variant="filled"
        severity={alert.type}
        >
            {alert.message}
        </MuiAlert>
    </Snackbar>
  )
}
