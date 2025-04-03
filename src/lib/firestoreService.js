import { db } from "./firebaseConfig";
import { doc, getDoc, setDoc, updateDoc, onSnapshot } from "firebase/firestore";

export const initializeLikes = async () => {
  const likeRef = doc(db, "likes", "counter");
  const likeSnap = await getDoc(likeRef);

  if (!likeSnap.exists()) {
    await setDoc(likeRef, { likes: 0 });
  }
};

export const incrementLike = async () => {
  const likeRef = doc(db, "likes", "counter");
  await updateDoc(likeRef, { likes: (await getDoc(likeRef)).data().likes + 1 });
};

export const subscribeToLikes = (callback) => {
  const likeRef = doc(db, "likes", "counter");
  return onSnapshot(likeRef, (snapshot) => {
    if (snapshot.exists()) {
      callback(snapshot.data().likes);
    }
  });
};
