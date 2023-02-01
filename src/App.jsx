import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './components/Index';
import Home from './pages/Home';
import CoinPage from './pages/CoinPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Index />} >
          <Route index element={<Home />} />
          <Route path="/:coinID" element={<CoinPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
