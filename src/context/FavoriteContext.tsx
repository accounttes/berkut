import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { Photo } from '../types'

type FavoriteContextType = {
  favorites: Photo[]
  toggleFavorite: (photo: Photo) => void
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined)

export function FavoriteProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Photo[]>(() => {
    try {
      const stored = localStorage.getItem('favorites')
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  const toggleFavorite = (photo: Photo) => {
    setFavorites((prev) => {
      const exists = prev.find((p) => p.id === photo.id)
      if (exists) return prev.filter((p) => p.id !== photo.id)
      return [...prev, photo]
    })
  }

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  )
}

export function useFavorites() {
  const ctx = useContext(FavoriteContext)
  if (!ctx) throw new Error('FavoriteContext')
  return ctx
} 