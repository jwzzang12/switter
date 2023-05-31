import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from '../routes/Auth';
import Home from '../routes/Home';
import Navigation from './Navigation';
import Profile from '../routes/Profile';

export default function AppRouter({ isLoggedIn, userObj, updateUser }) {
  return (
    <Router>
      <div className='container'>
        {isLoggedIn && <Navigation userObj={userObj} />}
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path='/' element={<Home userObj={userObj} />}></Route>
              <Route path='/profile' element={<Profile userObj={userObj} updateUser={updateUser} />}></Route>
            </>
          ) : (
            <Route path='/' element={<Auth />}></Route>
          )}
        </Routes>
        <footer id='footer'>&copy; Switter {new Date().getFullYear()}</footer>
      </div>
    </Router>
  );
}
