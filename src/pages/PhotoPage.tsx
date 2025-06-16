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

  const downloadLink = photo.urls.full || photo.urls.regular

  return (
    <div className="local-full">
      {/* background */}
      <img
        src={photo.urls.full || photo.urls.regular}
        alt="bg"
        className="local-bg"
        style={{
          position: 'fixed',
          top: '110px',
          left: 0,
          right: 0,
          bottom: '200px',
          width: '100%',
          height: 'auto',
          objectFit: 'cover',
          filter: 'grayscale(100%) brightness(40%)',
          zIndex: -1
        }}
      />

      <div style={{ maxWidth: '1482px', margin: '0 auto', position: 'relative', paddingTop: '40px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px'
          }}
        >
          {/* left info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {photo.user.profile_image && (
              <img
                src={photo.user.profile_image.small}
                alt={photo.user.name}
                style={{ width: 60, height: 60, borderRadius: '50%' }}
              />
            )}
            <div>
              <div className="info-name" style={{ fontFamily: 'inherit', fontWeight: 400, fontSize: '30px', color: '#f2f2f2' }}>
                {photo.user.name}
              </div>
              <div className="info-nick" style={{ fontFamily: 'inherit', fontWeight: 400, fontSize: '18px', color: '#f2f2f2' }}>
                @{photo.user.name.toLowerCase().replace(/\s+/g, '')}
              </div>
            </div>
          </div>

          {/* right controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <button
              onClick={() => toggleFavorite(photo)}
              className={`heart-btn${fav ? ' added' : ''}`}
              style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
            >
              <img src={`${import.meta.env.BASE_URL}love.svg`} alt="fav" width="58" height="58" />
            </button>

            <a
              href={downloadLink}
              download
              className="download-btn"
              style={{
                border: '1px solid #fff200',
                borderRadius: '8px',
                width: '206px',
                height: '49px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                background: '#fff200',
                boxShadow: '0 0 4px 0 rgba(0,0,0,0.25)',
                color: '#000',
                fontFamily: 'inherit',
                fontWeight: 400,
                fontSize: '20px',
                textDecoration: 'none'
              }}
            >
              <img src={`${import.meta.env.BASE_URL}download.svg`} alt="download" width="26" height="23" />
              <span className="dtext">Download</span>
            </a>
          </div>
        </div>

        <img
          src={photo.urls.regular}
          srcSet={`${photo.urls.regular} 1x, ${photo.urls.full} 2x`}
          alt={photo.alt_description || ''}
          style={{ width: '1482px', maxWidth: '100%', height: 'auto', objectFit: 'contain' }}
        />
      </div>

      <div style={{ height: '200px' }} />
    </div>
  )
} 