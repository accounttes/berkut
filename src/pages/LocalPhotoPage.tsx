import { useParams } from 'react-router-dom'
import { useFavorites } from '../context/FavoriteContext'
import { Photo } from '../types'

export default function LocalPhotoPage() {
  const { id } = useParams<{ id: string }>()
  const src = `${import.meta.env.BASE_URL}photos/${id}.png`

  const { favorites, toggleFavorite } = useFavorites()

  const photoObj: Photo = {
    id: `local-${id}`,
    alt_description: null,
    urls: { small: src, regular: src, full: src },
    user: { name: 'Vincent Van Gogh' }
  }

  const fav = favorites.some((p) => p.id === photoObj.id)

  return (
    <div className="local-full">
      {/* grayscale background, leaving 213px bottom white */}
      <img
        src={src}
        alt="bg"
        className="local-bg"
        style={{
          position: 'fixed',
          top: '110px', /* header height */
          left: 0,
          right: 0,
          bottom: '213px',
          width: '100%',
          height: 'auto',
          objectFit: 'cover',
          filter: 'grayscale(100%) brightness(40%)',
          zIndex: -1
        }}
      />

      <div
        style={{
          maxWidth: '1482px',
          margin: '0 auto',
          position: 'relative',
          paddingTop: '40px'
        }}
      >
        {/* user info and buttons */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <img
              src={`${import.meta.env.BASE_URL}user.png`}
              alt="user"
              style={{ width: 60, height: 60, borderRadius: '50%' }}
            />
            <div>
              <div className="info-name" style={{ fontFamily: 'inherit', fontWeight: 400, fontSize: '30px', color: '#f2f2f2' }}>
                Vincent Van Gogh
              </div>
              <div className="info-nick" style={{ fontFamily: 'inherit', fontWeight: 400, fontSize: '18px', color: '#f2f2f2' }}>
                @vincentvangogh
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {/* heart btn */}
            <button
              onClick={() => toggleFavorite(photoObj)}
              className={`heart-btn${fav ? ' added' : ''}`}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <img src={`${import.meta.env.BASE_URL}love.svg`} alt="fav" width="58" height="58" />
            </button>

            {/* download btn */}
            <a
              href={src}
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
          src={src}
          alt="full"
          style={{
            width: '1482px',
            maxWidth: '100%',
            height: 'auto',
            objectFit: 'contain'
          }}
        />
      </div>

      <div style={{ height: '200px' }} />
    </div>
  )
} 