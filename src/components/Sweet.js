import { deleteDoc, doc } from 'firebase/firestore';
import { firestore } from '../fbase';

export default function Sweet({ sweetObj, isOwner }) {
  const onDeleteClick = async () => {
    const ok = window.confirm('Are you sure you want to delete this Sweet?');
    const sweetTextRef = doc(firestore, 'sweets', `${sweetObj.id}`);

    if (ok) {
      await deleteDoc(sweetTextRef);
    }
  };

  return (
    <div>
      <h4>{sweetObj.text}</h4>
      {isOwner && <button onClick={onDeleteClick}>Delete</button>}
    </div>
  );
}
