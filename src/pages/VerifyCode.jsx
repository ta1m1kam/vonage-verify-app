import { Button, FormControl, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const VerifyCode = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");

  const handleChangeCode = (e) => {
    setCode(e.target.value);
  }

  const requestVerificationCode = async () => {
    await fetch("/check-code", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ code })
    })

    navigate("/");
  }

  return (
    <>
      <h1>VerifyCode</h1>
      <FormControl fullWidth sx={{ m: 1 }}>
        <TextField
          id="outlined-name"
          label="Code"
          inputProps={{ inputMode: "numeric", pattern: '[0-9]*' }}
          onChange={handleChangeCode}
        />
      </FormControl>
      <FormControl fullWidth sx={{ m: 1 }}>
        <Button 
          variant="contained"
          onClick={requestVerificationCode}
        >
          Verify me!
        </Button>
      </FormControl>
    </>
  );
};

export default VerifyCode;
