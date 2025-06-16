import { Link } from 'react-router-dom'

export default function LocalGallery() {
  const images = Array.from({ length: 9 }, (_, i) => `${import.meta.env.BASE_URL}photos/${i + 1}.png`)
  return (
    <div className="local-grid">
      {images.map((src, idx) => (
        <Link to={`/local/${idx + 1}`} key={src} className="local-thumb">
          <img src={src} alt="local" loading="lazy" />
        </Link>
      ))}
    </div>
  )
} 