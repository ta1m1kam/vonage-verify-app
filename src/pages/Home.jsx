import { Button, Chip, FormControl, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import MdPhone from '@mui/icons-material/Phone';
import { Box } from "@mui/system";

const Home = () => {
  const [verifyNumber, setVerifyNumber] = useState(null);
  const [fromVerifyCode, setFromVerifyCode] = useState(null);
  const [text, setText] = useState("");
  const search = useLocation().search;
  const query = new URLSearchParams(search);
  if (query.verify) {
    setFromVerifyCode(query.verify);
  }

  useEffect(() => {
    const getVerify = async () => {
      const response = await fetch("/verify-number", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        },
      })

      const json = await response.json();
      setVerifyNumber(json.verifyNumber);
    }
    getVerify();
  }, [fromVerifyCode]);

  const phoneLabelMessage = verifyNumber ? `+${verifyNumber}` : "You are not verified";

  const handleChangeText = (e) => {
    setText(e.target.value);
  }

  const handleSubmitSms = async () => {
    const data = { number: verifyNumber, text };
    await fetch("/send-sms", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  }

  return (
    <>
      <h1>Account Management!</h1>
      <Box sx={{ m: 1 }}>
        <Chip icon={<MdPhone />} label={phoneLabelMessage}/>
      </Box>
      <Link to={"/authenticate"}>
        <Button variant="contained">
          Verify me
        </Button>
      </Link>

      { verifyNumber && 
        (<Box sx={{ m: 2 }}>
          <FormControl fullWidth sx={{ m: 1 }}>
            <TextField
              id="outlined-name"
              label="sms text"
              onChange={handleChangeText}
            />
          </FormControl>
          <FormControl fullWidth sx={{ m: 1 }}>
            <Button 
              variant="contained"
              onClick={handleSubmitSms}
            >
              Send SMS
            </Button>
          </FormControl>
        </Box>)
      }
    </>
  );
};

export default Home;
