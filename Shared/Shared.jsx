/* to get user details from database for favorites*/

import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from './../config/FirebaseConfig';

const GetFavList = async (user) => {
    const email = user?.primaryEmailAddress?.emailAddress;

    if (!email) return;

    const docRef = doc(db, 'UserFavPet', email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        // Create doc if it doesn't exist
        await setDoc(docRef, {
            email: email,
            favorites: []
        });
        return { email, favorites: [] };
    }
};

const UpdateFav = async (user, favorites) => {
    const email = user?.primaryEmailAddress?.emailAddress;

    if (!email) return;

    const docRef = doc(db, 'UserFavPet', email);
    try {
        await updateDoc(docRef, {
            favorites: favorites
        });
    } catch (e) {
        console.error("Error updating favorites:", e);
    }
};

export default {
    GetFavList,
    UpdateFav
};