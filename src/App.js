import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Authenticate from './pages/Authenticate';
import { Container } from '@mui/system';
import VerifyCode from './pages/VerifyCode';

function App() {
  return (
    <div className="App">
      <Container maxWidth="sm">
        <BrowserRouter>
          <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"/authenticate"} element={<Authenticate />} />
            <Route path={"/verifycode"} element={<VerifyCode />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </div>
  );
}

export default App;
