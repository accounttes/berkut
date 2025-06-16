import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import PhotoPage from './pages/PhotoPage'
import FavoritesPage from './pages/FavoritesPage'
import LocalPhotoPage from './pages/LocalPhotoPage'
import { FavoriteProvider } from './context/FavoriteContext'
import Header from './components/Header'

export default function App() {
  return (
    <FavoriteProvider>
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/photo/:id" element={<PhotoPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/local/:id" element={<LocalPhotoPage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </FavoriteProvider>
  )
} 