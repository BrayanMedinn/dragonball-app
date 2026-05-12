import { useState, useEffect } from 'react'
import { useFetch } from '../hooks/useFetch'
import { useDebounce } from '../hooks/useDebounce'
import { getCharacters } from '../services/dragonballApi'
import { useNavigate } from 'react-router-dom'
import CharacterCard from './CharacterCard'
import CharacterSkeleton from './CharacterSkeleton'

const RACES = ['Saiyan', 'Namekian', 'Human', 'Majin', 'Frieza Race', 'Android', 'Unknown']
const AFFILIATIONS = ['Z Fighter', 'Army of Frieza', 'Red Ribbon Army', 'Namekian Warrior', 'Villain', 'Other']

function FilterPill({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`text-xs px-3 py-1.5 rounded-full border transition-colors whitespace-nowrap ${
        active
          ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white'
          : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500'
      }`}
    >
      {label}
    </button>
  )
}

function CharacterList() {
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [race, setRace] = useState('')
  const [affiliation, setAffiliation] = useState('')
  const debouncedSearch = useDebounce(search, 500)

  const { data, loading, error } = useFetch(
    () => getCharacters(page, 10, debouncedSearch, race, affiliation),
    [page, debouncedSearch, race, affiliation]
  )

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [page])

  useEffect(() => {
    setPage(1)
  }, [debouncedSearch, race, affiliation])

  const items = Array.isArray(data) ? data : data?.items ?? []
  const totalPages = data?.meta?.totalPages ?? 1
  const currentPage = data?.meta?.currentPage ?? 1
  const isFiltering = debouncedSearch || race || affiliation

  if (error) return <p className="text-red-500">Error: {error.message}</p>

  return (
    <div>
      {/* Buscador */}
      <div className="relative mb-4">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar personaje..."
          className="w-full pl-9 pr-4 py-2.5 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:border-gray-400 dark:focus:border-gray-500 text-gray-900 dark:text-white placeholder-gray-400 transition-colors"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            ✕
          </button>
        )}
      </div>

      {/* Filtros raza */}
      <div className="mb-3">
        <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">Raza</p>
        <div className="flex gap-2 flex-wrap">
          <FilterPill label="Todas" active={race === ''} onClick={() => setRace('')} />
          {RACES.map(r => (
            <FilterPill key={r} label={r} active={race === r} onClick={() => setRace(race === r ? '' : r)} />
          ))}
        </div>
      </div>

      {/* Filtros afiliación */}
      <div className="mb-6">
        <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">Afiliación</p>
        <div className="flex gap-2 flex-wrap">
          <FilterPill label="Todas" active={affiliation === ''} onClick={() => setAffiliation('')} />
          {AFFILIATIONS.map(a => (
            <FilterPill key={a} label={a} active={affiliation === a} onClick={() => setAffiliation(affiliation === a ? '' : a)} />
          ))}
        </div>
      </div>

      {/* Limpiar filtros */}
      {(search || race || affiliation) && (
        <button
          onClick={() => { setSearch(''); setRace(''); setAffiliation('') }}
          className="mb-4 text-xs text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
        >
          ✕ Limpiar filtros
        </button>
      )}

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 10 }).map((_, i) => <CharacterSkeleton key={i} />)}
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-4xl mb-3">🔍</p>
          <p className="text-gray-400 dark:text-gray-500">No se encontraron personajes</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map(char => (
            <div key={char.id} onClick={() => navigate(`/character/${char.id}`)}>
              <CharacterCard character={char} />
            </div>
          ))}
        </div>
      )}

      {/* Paginación */}
      {!loading && items.length > 0 && !isFiltering && (
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={() => setPage(p => p - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            ← Anterior
          </button>
          <span className="text-sm text-gray-500 dark:text-gray-400">{currentPage} / {totalPages}</span>
          <button
            onClick={() => setPage(p => p + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Siguiente →
          </button>
        </div>
      )}
    </div>
  )
}

export default CharacterList