import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../fbase';
import AuthForm from '../components/AuthForm';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';

export default function Auth() {
  const [newAccount, setNewAccount] = useState(true);

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

  const toggleAccount = () => setNewAccount((prev) => !prev);

  return (
    <div id='auth' className='container'>
      {newAccount ? <div className='txtBox'>New to Switter?</div> : <div className='txtBox'>Hi, there!</div>}
      <button onClick={onSocialClick} name='google' className='btn white'>
        Continue with Google <FontAwesomeIcon icon={faGoogle} />
      </button>
      <button onClick={onSocialClick} name='github' className='btn white'>
        Continue with Github <FontAwesomeIcon icon={faGithub} />
      </button>
      <AuthForm newAccount={newAccount} onToggleClick={toggleAccount} />
    </div>
  );
}
