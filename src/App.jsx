import { Routes, Route } from 'react-router-dom';
import { CoinPage, Home } from './pages';

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path="/:coinID" element={<CoinPage />} />
    </Routes>
  );
}
