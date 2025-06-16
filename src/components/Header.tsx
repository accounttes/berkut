import { Link, NavLink, useLocation } from 'react-router-dom'
import LogoSvg from './LogoSvg'
import HeartIcon from './HeartIcon'
import HeroSearch from './HeroSearch'

export default function Header() {
  const location = useLocation()
  const showSearch = location.pathname === '/'
  return (
    <header className="header">
      <div className="header-top">
        <Link to="/" className="logo">
          <LogoSvg />
        </Link>
        <NavLink
          to="/favorites"
          className={({ isActive }) => `favorites-link${isActive ? ' active' : ''}`}
        >
          <HeartIcon />
          <span>Избранное</span>
        </NavLink>
      </div>
      {showSearch && <HeroSearch />}
    </header>
  )
} 