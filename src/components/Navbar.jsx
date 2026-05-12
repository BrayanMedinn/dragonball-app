import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

function Navbar() {
  const { pathname } = useLocation()
  const { dark, toggleTheme } = useTheme()

  return (
    <nav className="sticky top-0 z-10 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center gap-6">
        <Link to="/" className="font-bold text-gray-900 dark:text-white tracking-tight">
          🐉 Dragon Ball
        </Link>
        <div className="flex gap-1">
          <Link
            to="/"
            className={`text-sm px-3 py-1.5 rounded-lg transition-colors ${
              pathname === '/'
                ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-medium'
                : 'text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            }`}
          >
            Personajes
          </Link>
          <Link
            to="/planets"
            className={`text-sm px-3 py-1.5 rounded-lg transition-colors ${
              pathname === '/planets'
                ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-medium'
                : 'text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            }`}
          >
            Planetas
          </Link>
        </div>
        <button
          onClick={toggleTheme}
          className="ml-auto text-sm px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors"
        >
          {dark ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>
    </nav>
  )
}

export default Navbar