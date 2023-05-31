import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../fbase';
import AuthForm from '../components/AuthForm';
import { useState } from 'react';

export default function Auth() {
  const [emailAuth, setEmailAuth] = useState(false);

  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;

    let provider;

    if (name === 'google') {
      provider = new GoogleAuthProvider();
    } else if (name === 'github') {
      provider = new GithubAuthProvider();
    }

    const data = await signInWithPopup(auth, provider);
    console.log(data);
  };

  const onEmailClick = () => {
    console.log(emailAuth);
    setEmailAuth((prev) => !prev);
  };
  return (
    <div id='auth' className='container'>
      <div className='txtBox'>New to Switter?</div>
      <button onClick={onSocialClick} name='google' className='authBtn'>
        Continue with Google
      </button>
      <button onClick={onSocialClick} name='github' className='authBtn'>
        Continue with Github
      </button>
      {emailAuth ? (
        <AuthForm />
      ) : (
        <button onClick={onEmailClick} name='email' className='authBtn'>
          Continue with Email
        </button>
      )}
    </div>
  );
}
