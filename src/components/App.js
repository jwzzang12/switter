import { useState } from 'react';
import '../App.css';
import AppRouter from './AppRouter';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className='App'>
      <>
        <AppRouter isLoggedIn={isLoggedIn} />
        <footer>&copy; Switter {new Date().getFullYear()}</footer>
      </>
    </div>
  );
}

export default App;
