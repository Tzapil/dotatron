import { Route, Routes } from 'react-router-dom';

import Heroes from '../Heroes';
import Hero from '../Hero';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Heroes />} />
      <Route path="/hero/:id" element={<Hero />} />
    </Routes>
  );
}
