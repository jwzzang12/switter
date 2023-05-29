import { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../fbase';

export default function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState('');

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;

    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        // sign up
        data = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        // sign in
        data = await signInWithEmailAndPassword(auth, email, password);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);

  return (
    <>
      <form onSubmit={onSubmit}>
        <input name='email' type='text' placeholder='Email' required onChange={onChange} />
        <input name='password' type='password' placeholder='Password' required onChange={onChange} />
        <input type='submit' value={newAccount ? 'Sign Up' : 'Sign In'} />
        {error.replace(/Firebase: /g, '')}
      </form>
      <span onClick={toggleAccount}>{newAccount ? 'Sign In' : 'Sign Up'}</span>
    </>
  );
}
