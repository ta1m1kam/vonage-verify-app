import { Button, Chip } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import MdPhone from '@mui/icons-material/Phone';
import { Box } from "@mui/system";

const Home = () => {
  const [verifyNumber, setVerifyNumber] = useState(null);
  const [fromVerifyCode, setFromVerifyCode] = useState(null);
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
    </>
  );
};

export default Home;
