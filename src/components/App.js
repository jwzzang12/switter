import { useEffect, useState } from 'react';
import AppRouter from './AppRouter';
import { auth } from '../fbase';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
      console.log(user);
    });
  }, []);

  return (
    <div className='App'>
      <>
        {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} /> : 'Initializing...'}
        <footer>&copy; Switter {new Date().getFullYear()}</footer>
      </>
    </div>
  );
}

export default App;
