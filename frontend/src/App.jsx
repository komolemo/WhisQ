import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import FAQchat from './components/FAQchat';

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
    // <div>
    //   <FAQchat />
    // </div>
  );
}

export default App;