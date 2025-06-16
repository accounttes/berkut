import React, { useEffect, useState } from 'react'
import { getRandomPhotos } from '../utils/unsplash'
import { Photo } from '../types'
import ImageCard from '../components/ImageCard'
import Loader from '../components/Loader'

export default function HomePage() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getRandomPhotos(8)
      .then(setPhotos)
      .catch(() => setError('Не удалось загрузить изображения'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Loader />

  return error ? (
    <p style={{ textAlign: 'center' }}>{error}</p>
  ) : (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))',
        gap: '1rem',
        marginTop: '114px'
      }}
    >
      {photos.map((p: Photo) => (
        <ImageCard photo={p} key={p.id} />
      ))}
    </div>
  )
} 