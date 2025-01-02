import { openDB } from 'idb'

export async function saveImageToIndexedDB(url: string) {
  const response = await fetch(url)
  const blob = await response.blob()

  // Open the database and ensure the object store exists
  const db = await openDB('image-store', 1, {
    upgrade(db) {
      // Check if the object store already exists to avoid re-creation
      if (!db.objectStoreNames.contains('images')) {
        db.createObjectStore('images') // Create object store for the images
      }
    }
  })

  // Save the image blob into the 'images' object store
  await db.put('images', blob, 'my-image')
  console.log('Image saved to IndexedDB!')
}

export async function getImageFromIndexedDB() {
  const db = await openDB('image-store', 1)
  const blob = await db.get('images', 'my-image')
  return URL.createObjectURL(blob)
}

export async function deleteImageFromIndexedDB() {
  const db = await openDB('image-store', 1)
  await db.delete('images', 'my-image')
  console.log('Image deleted from IndexedDB!')
}
