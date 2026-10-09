import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
  serverTimestamp
} from "firebase/firestore/lite";

import { db } from "./firebase";


// Each user's history lives at users/{uid}/predictions.
// firestore.rules restricts that path to its owner.

function predictionsOf(user) {

  return collection(db, "users", user.uid, "predictions");

}


// type is "yield" or "crop". Saving is best-effort: a failure here must
// never hide the prediction the user just received.

export async function savePrediction(user, type, inputs, result) {

  if (!db || !user) {
    return;
  }

  try {

    await addDoc(predictionsOf(user), {

      type,

      inputs,

      result,

      createdAt: serverTimestamp()

    });

  }

  catch (err) {

    console.log("Could not save prediction", err);

  }

}


export async function loadHistory(user) {

  const snapshot = await getDocs(

    query(
      predictionsOf(user),
      orderBy("createdAt", "desc"),
      limit(50)
    )

  );

  return snapshot.docs.map((doc) => ({

    id: doc.id,

    ...doc.data()

  }));

}
