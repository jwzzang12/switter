import { useEffect, useState } from 'react';
import { auth, firestore } from '../fbase';
import { useNavigate } from 'react-router-dom';
import { collection, where, query, getDocs, orderBy } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';

export default function Profile({ userObj, updateUser }) {
  const [userName, setUserName] = useState(userObj.displayName || 'User');
  const [edit, setEdit] = useState(true);
  const navigate = useNavigate();

  const onSignOutClick = () => {
    auth.signOut();
    navigate('/');
  };

  const getMySweets = async () => {
    const q = query(collection(firestore, 'sweets'), where('creatorId', '==', userObj.uid), orderBy('createdAt', 'desc'));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((item) => {
      console.log(item.id, ' => ', item.data());
    });
  };

  useEffect(() => {
    getMySweets();
  }, []);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setUserName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const user = auth.currentUser;
    if (userObj.displayName !== userName) {
      await updateProfile(user, { displayName: userName });
      updateUser();
    }
  };

  const onEditClick = () => {
    setEdit((prev) => !prev);
  };

  return (
    <div id='profile'>
      <form onSubmit={onSubmit}>
        <input type='text' placeholder='Name' onChange={onChange} value={userName} disabled={edit} className='btn white' />
        {edit ? (
          <input type='text' value='Edit Profile' className='btn outlined' onClick={onEditClick} />
        ) : (
          <input type='submit' value='Update Profile' className='btn orange' onClick={onEditClick} />
        )}
      </form>
      <button onClick={onSignOutClick} className='btn grey'>
        Sign Out
      </button>
    </div>
  );
}
