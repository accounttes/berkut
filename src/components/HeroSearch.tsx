import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchIcon from './SearchIcon'

export default function HeroSearch() {
  const [value, setValue] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!value.trim()) return
    navigate('/search', { state: { query: value.trim() } })
  }

  return (
    <form onSubmit={handleSubmit} className="hero-search">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Поиск"
        style={{ width: '866px', height: '70px' }}
      />
      <button type="submit" className="search-btn">
        <SearchIcon />
      </button>
    </form>
  )
} 