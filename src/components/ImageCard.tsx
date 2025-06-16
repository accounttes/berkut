import { Link } from 'react-router-dom'
import { Photo } from '../types'
import { useFavorites } from '../context/FavoriteContext'

export default function ImageCard({ photo }: { photo: Photo }) {
  const { favorites, toggleFavorite } = useFavorites()
  const fav = favorites.some((p) => p.id === photo.id)
  return (
    <div style={{ position: 'relative' }}>
      <Link to={`/photo/${photo.id}`}>
        <img
          src={photo.urls.small}
          srcSet={`${photo.urls.small} 1x, ${photo.urls.regular} 2x`}
          alt={photo.alt_description || ''}
          loading="lazy"
          style={{ width: '100%', borderRadius: 8 }}
        />
      </Link>
      <button
        onClick={() => toggleFavorite(photo)}
        style={{
          position: 'absolute',
          top: 8,
          right: 8,
          padding: 0,
          background: 'transparent',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        <img src={`${import.meta.env.BASE_URL}love.svg`} alt={fav ? 'Remove from favorites' : 'Add to favorites'} width={32} height={32} />
      </button>
    </div>
  )
} 