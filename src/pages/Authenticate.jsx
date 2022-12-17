import { Button, FormControl, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Authenticate = () => {
  const navigate = useNavigate();
  const [mobileNumber, setMobileNumber] = useState("");

  const handleChangeMobileNumber = (e) => {
    setMobileNumber(e.target.value);
  }

  const requestVerificationCode = async () => {
    const formatMobileNumber = "81" + mobileNumber.slice(1);
    await fetch("/verify", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ number: formatMobileNumber })
    });

    navigate("/verifycode")
  }

  return (
    <>
      <h1>Authenticate</h1>
      <FormControl fullWidth sx={{ m: 1 }}>
        <TextField
          id="outlined-name"
          label="Mobile number"
          inputProps={{ inputMode: "numeric", pattern: '[0-9]*' }}
          onChange={handleChangeMobileNumber}
        />
      </FormControl>
      <FormControl fullWidth sx={{ m: 1 }}>
        <Button 
          variant="contained"
          onClick={requestVerificationCode}
        >
            Get Verification Code
        </Button>
      </FormControl>
      <h2>{mobileNumber}</h2>
    </>
  );
};

export default Authenticate;
