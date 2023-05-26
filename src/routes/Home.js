import { useEffect, useState } from 'react';
import { firestore } from '../fbase';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';

export default function Home({ userObj }) {
  const [sweet, setSweet] = useState('');
  const [sweets, setSweets] = useState([]);

  // const getSweets = async () => {
  //   const dbSweets = await getDocs(collection(firestore, 'sweets'));
  //   dbSweets.forEach((doc) => {
  //     const sweetObj = {
  //       ...doc.data(),
  //       id: doc.id,
  //     };
  //   });
  // };

  useEffect(() => {
    // getSweets();
    //real-time
    const q = collection(firestore, 'sweets');
    onSnapshot(q, (snapshot) => {
      const sweetArr = snapshot.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }));
      setSweets(sweetArr);
    });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await addDoc(collection(firestore, 'sweets'), {
        text: sweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
      });
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
      <div>
        {sweets.map((item) => {
          return (
            <div key={item.id}>
              <h4>{item.text}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
}
