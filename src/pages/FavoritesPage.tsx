import ImageCard from '../components/ImageCard'
import { useFavorites } from '../context/FavoriteContext'

export default function FavoritesPage() {
  const { favorites } = useFavorites()
  return (
    <>
      <h1
        className="favorites-title"
        style={{
          fontFamily: 'inherit',
          fontWeight: 700,
          fontSize: '72px',
          textAlign: 'center',
          color: '#000',
          marginTop: '94px',
          marginBottom: '101px'
        }}
      >
        Избранное
      </h1>
      {favorites.length === 0 ? (
        <p style={{ textAlign: 'center' }}>Нет избранных фотографий</p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))',
            gap: '1rem'
          }}
        >
          {favorites.map((p) => (
            <ImageCard key={p.id} photo={p} />
          ))}
        </div>
      )}
    </>
  )
} 