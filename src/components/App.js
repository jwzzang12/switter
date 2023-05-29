import { useEffect, useState } from 'react';
import AppRouter from './AppRouter';
import { auth } from '../fbase';
import { onAuthStateChanged, updateProfile } from 'firebase/auth';

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // make object into smaller to prevent error
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => updateProfile(user, { displayName: user.displayName }),
        });
      }
      setInit(true);
    });
  }, []);

  const updateUser = () => {
    const user = auth.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => updateProfile(user, { displayName: user.displayName }),
    });
  };

  return (
    <div className='App'>
      <>
        {init ? <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} updateUser={updateUser} /> : 'Initializing...'}
        <footer>&copy; Switter {new Date().getFullYear()}</footer>
      </>
    </div>
  );
}

export default App;
