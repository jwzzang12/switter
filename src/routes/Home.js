import { useEffect, useState } from 'react';
import { firestore } from '../fbase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import Sweet from '../components/Sweet';
import SweetFactory from '../components/SweetFactory';

export default function Home({ userObj }) {
  const [sweets, setSweets] = useState([]);

  useEffect(() => {
    //descending order
    const q = query(collection(firestore, 'sweets'), orderBy('createdAt', 'desc'));

    onSnapshot(q, (snapshot) => {
      const sweetArr = snapshot.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }));
      setSweets(sweetArr);
    });
  }, []);

  return (
    <div>
      <SweetFactory userObj={userObj} />
      <div>
        {sweets.map((item) => {
          return <Sweet key={item.id} sweetObj={item} isOwner={item.creatorId === userObj.uid} />;
        })}
      </div>
    </div>
  );
}
