import { useEffect, useState } from 'react';
import AppRouter from './AppRouter';
import { auth } from '../fbase';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
      console.log(user);
    });
  }, []);
  // setInterval(() => {
  //   console.log(auth.currentUser);
  // }, 2000);

  return (
    <div className='App'>
      <>
        {init ? <AppRouter isLoggedIn={isLoggedIn} /> : 'Initializing...'}
        <footer>&copy; Switter {new Date().getFullYear()}</footer>
      </>
    </div>
  );
}

export default App;
