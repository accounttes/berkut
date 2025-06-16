import { Photo } from '../types'

const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY
const BASE_URL = 'https://api.unsplash.com'

async function request(path: string) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      Authorization: `Client-ID ${ACCESS_KEY}`
    }
  })
  if (!res.ok) throw new Error('Unsplash error')
  return res.json()
}

export async function getRandomPhotos(count = 8): Promise<Photo[]> {
  return request(`/photos/random?count=${count}`)
}

export async function searchPhotos(
  query: string,
  page = 1,
  perPage = 20
): Promise<{ results: Photo[]; totalPages: number }> {
  const data = await request(
    `/search/photos?query=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`
  )
  return { results: data.results, totalPages: data.total_pages }
}

export async function getPhoto(id: string): Promise<Photo> {
  return request(`/photos/${id}`)
} 