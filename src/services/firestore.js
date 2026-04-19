import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  orderBy, 
  limit, 
  deleteDoc, 
  doc, 
  serverTimestamp 
} from "firebase/firestore";
import { db } from "../firebase";

// Searches
export const saveSearch = async (uid, username) => {
  if (!uid || !username) return;
  try {
    await addDoc(collection(db, "searches"), {
      uid,
      username,
      searchedAt: serverTimestamp()
    });
  } catch (error) {
    console.error("Error saving search:", error);
  }
};

export const getRecentSearches = async (uid) => {
  if (!uid) return [];
  const q = query(
    collection(db, "searches"),
    where("uid", "==", uid),
    orderBy("searchedAt", "desc"),
    limit(5)
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

// Bookmarks
export const addBookmark = async (uid, userData) => {
  if (!uid || !userData) return;
  try {
    await addDoc(collection(db, "bookmarks"), {
      uid,
      username: userData.login,
      avatar_url: userData.avatar_url,
      name: userData.name,
      savedAt: serverTimestamp()
    });
  } catch (error) {
    console.error("Error adding bookmark:", error);
  }
};

export const removeBookmark = async (bookmarkId) => {
  try {
    await deleteDoc(doc(db, "bookmarks", bookmarkId));
  } catch (error) {
    console.error("Error removing bookmark:", error);
  }
};

export const getBookmarks = async (uid) => {
  if (!uid) return [];
  const q = query(
    collection(db, "bookmarks"),
    where("uid", "==", uid),
    orderBy("savedAt", "desc")
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};
