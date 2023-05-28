import { deleteDoc, doc } from 'firebase/firestore';
import { firestore, storage } from '../fbase';
import { deleteObject, ref } from 'firebase/storage';

export default function Sweet({ sweetObj, isOwner }) {
  const onDeleteClick = async () => {
    const ok = window.confirm('Are you sure you want to delete this Sweet?');
    const sweetTextRef = doc(firestore, 'sweets', `${sweetObj.id}`);
    if (ok) {
      try {
        await deleteDoc(sweetTextRef);
        if (sweetObj.attachmentUrl !== '') {
          await deleteObject(ref(storage, sweetObj.attachmentUrl));
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <h4>{sweetObj.text}</h4>
      {sweetObj.imgUrl && <img src={sweetObj.imgUrl} width='50px' height='50px'></img>}
      {isOwner && <button onClick={onDeleteClick}>Delete</button>}
    </div>
  );
}
