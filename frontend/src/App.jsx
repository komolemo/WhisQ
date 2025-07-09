import logo from './logo.svg';
import { useState } from 'react'
import './App.css';
import ChatApp from './components/ChatApp';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1>FAQチャット</h1>
      <ChatApp />
    </div>
  )
}

export default App