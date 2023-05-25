import { auth } from '../fbase';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();
  const onSignOutClick = () => {
    auth.signOut();
    navigate('/');
  };

  return (
    <>
      <button onClick={onSignOutClick}>Sign Out</button>
    </>
  );
}
