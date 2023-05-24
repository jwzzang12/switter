import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from '../routes/Auth';
import Home from '../routes/Home';

export default function AppRouter({ isLoggedIn }) {
  return (
    <Router>
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path='/' element={<Home />}></Route>
          </>
        ) : (
          <Route path='/' element={<Auth />}></Route>
        )}
      </Routes>
    </Router>
  );
}
