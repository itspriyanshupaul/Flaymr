import { db } from '../firebase'
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
  doc
} from 'firebase/firestore'

// Save roast to Firestore
export async function saveRoast(userId, roastData) {
  try {
    await addDoc(collection(db, 'roasts'), {
      userId,
      ...roastData,
      time: new Date().toISOString()
    })
  } catch (err) {
    console.error('Error saving roast:', err)
  }
}

// Get all roasts for a user
export async function getRoasts(userId) {
  try {
    const q = query(
      collection(db, 'roasts'),
      where('userId', '==', userId),
      orderBy('time', 'desc')
    )
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (err) {
    console.error('Error getting roasts:', err)
    return []
  }
}

// Delete all roasts for a user
export async function deleteAllRoasts(userId) {
  try {
    const q = query(
      collection(db, 'roasts'),
      where('userId', '==', userId)
    )
    const snapshot = await getDocs(q)
    const deletePromises = snapshot.docs.map(d => deleteDoc(doc(db, 'roasts', d.id)))
    await Promise.all(deletePromises)
  } catch (err) {
    console.error('Error deleting roasts:', err)
  }
}