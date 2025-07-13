// src/routes.jsx
import { Routes, Route } from 'react-router-dom';
import FAQhatPage from './pages/FAQhatPage';
import ProblemsPage from './pages/ProblemsPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" />
      <Route path="/faqchat" element={<FAQhatPage />} />
      <Route path="/problems" element={<ProblemsPage />} />
    </Routes>
  );
};

export default AppRoutes;