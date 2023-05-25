import { useState } from 'react';
import { firestore } from '../fbase';
import { addDoc, collection } from 'firebase/firestore';

export default function Home() {
  const [sweet, setSweet] = useState();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const docRef = await addDoc(collection(firestore, 'sweets'), {
        sweet,
        createdAt: Date.now(),
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
    setSweet('');
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setSweet(value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={sweet} onChange={onChange} type='text' placeholder="What's happening?" maxLength={140} />
        <input type='submit' value='Sweet' />
      </form>
    </div>
  );
}
