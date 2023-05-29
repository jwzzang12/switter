import { useEffect, useState } from 'react';
import { firestore, storage } from '../fbase';
import { addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import Sweet from '../components/Sweet';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

export default function Home({ userObj }) {
  const [sweet, setSweet] = useState('');
  const [sweets, setSweets] = useState([]);
  const [image, setImage] = useState('');

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

  const onSubmit = async (event) => {
    event.preventDefault();
    let imgUrl = '';

    try {
      if (image !== '') {
        const imgRef = ref(storage, `${userObj.uid}/${uuidv4()}`);
        const response = await uploadString(imgRef, image, 'data_url');

        imgUrl = await getDownloadURL(response.ref);
      }

      const sweetObj = {
        text: sweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
        imgUrl,
      };

      await addDoc(collection(firestore, 'sweets'), sweetObj);
    } catch (error) {
      console.error('Error adding file: ', error);
    }

    setSweet('');
    setImage('');
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setSweet(value);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const imgFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setImage(result);
    };

    if (imgFile) {
      reader.readAsDataURL(imgFile);
    }
  };

  const onClearImage = () => {
    setImage('');
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={sweet} onChange={onChange} type='text' placeholder="What's happening?" maxLength={140} />
        <input type='file' accept='image/*' onChange={onFileChange} />
        <input type='submit' value='Sweet' />
        {image && (
          <div>
            <img src={image} alt='' width='50px' height='50px' />
            <button onClick={onClearImage}>X</button>
          </div>
        )}
      </form>
      <div>
        {sweets.map((item) => {
          return <Sweet key={item.id} sweetObj={item} isOwner={item.creatorId === userObj.uid} />;
        })}
      </div>
    </div>
  );
}
