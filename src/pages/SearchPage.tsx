import { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { searchPhotos } from '../utils/unsplash'
import { Photo } from '../types'
import ImageCard from '../components/ImageCard'
import Loader from '../components/Loader'

export default function SearchPage() {
  const location = useLocation()
  const initialQuery = (location.state as { query?: string })?.query || ''
  const [query, setQuery] = useState(initialQuery)
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [error, setError] = useState('')

  const sentinel = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!sentinel.current) return
    const obs = new IntersectionObserver((entries) => {
      const first = entries[0]
      if (first.isIntersecting && !loading && page < totalPages) {
        setPage((p) => p + 1)
      }
    })
    obs.observe(sentinel.current)
    return () => obs.disconnect()
  }, [loading, totalPages, page])

  useEffect(() => {
    if (!query || page === 1) return
    setLoading(true)
    searchPhotos(query, page)
      .then(({ results, totalPages }) => {
        setPhotos((prev) => (page === 1 ? results : [...prev, ...results]))
        setTotalPages(totalPages)
      })
      .catch(() => setError('Ошибка загрузки'))
      .finally(() => setLoading(false))
  }, [page])

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery)
      handleSearch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSearch = async () => {
    if (!query) return
    setPhotos([])
    setPage(1)
    setTotalPages(1)
    setError('')
    setLoading(true)
    try {
      const { results, totalPages } = await searchPhotos(query, 1)
      setPhotos(results)
      setTotalPages(totalPages)
    } catch {
      setError('Ошибка загрузки')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Введите запрос"
          style={{ flex: 1, padding: '0.5rem' }}
        />
        <button onClick={handleSearch}>Поиск</button>
      </div>
      {error && <p>{error}</p>}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))',
          gap: '1rem'
        }}
      >
        {photos.map((p) => (
          <ImageCard key={p.id} photo={p} />
        ))}
      </div>
      {loading && <Loader />}
      <div ref={sentinel} style={{ height: 1 }} />
    </div>
  )
} 