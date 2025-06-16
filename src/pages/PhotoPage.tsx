import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getPhoto } from '../utils/unsplash'
import { Photo } from '../types'
import { useFavorites } from '../context/FavoriteContext'
import Loader from '../components/Loader'

export default function PhotoPage() {
  const { id } = useParams<{ id: string }>()
  const [photo, setPhoto] = useState<Photo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { favorites, toggleFavorite } = useFavorites()

  useEffect(() => {
    if (!id) return
    getPhoto(id)
      .then(setPhoto)
      .catch(() => setError('Не удалось загрузить фото'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <Loader />
  if (error) return <p>{error}</p>
  if (!photo) return <p>Не найдено</p>

  const fav = favorites.some((p) => p.id === photo.id)

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <img
        src={photo.urls.regular}
        srcSet={`${photo.urls.regular} 1x, ${photo.urls.full} 2x`}
        alt={photo.alt_description || ''}
        style={{ width: '100%', borderRadius: 8 }}
      />
      <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ marginBottom: 4 }}>{photo.alt_description || 'Без описания'}</h2>
          <p>Автор: {photo.user.name}</p>
        </div>
        <button onClick={() => toggleFavorite(photo)}>{fav ? 'Убрать из избранного' : 'В избранное'}</button>
      </div>
    </div>
  )
} 