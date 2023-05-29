import { addDoc, collection } from 'firebase/firestore';
import { firestore, storage } from '../fbase';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function SweetFactory({ userObj }) {
  const [sweet, setSweet] = useState('');
  const [image, setImage] = useState('');

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
  );
}
