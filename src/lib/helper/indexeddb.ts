import { openDB } from 'idb'

export async function saveImageToIndexedDB(url: string) {
  const response = await fetch(url)
  const blob = await response.blob()

  const db = await openDB('image-store', 1, {
    upgrade(db) {
      db.createObjectStore('images')
    }
  })

  await db.put('images', blob, 'my-image')
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
