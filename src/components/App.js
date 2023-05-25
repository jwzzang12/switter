import { useState } from 'react';
import AppRouter from './AppRouter';
import { auth } from '../fbase';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(auth.currentUser);

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
