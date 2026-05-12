import { useState, useEffect } from 'react'
import { useFetch } from '../hooks/useFetch'
import { getPlanets } from '../services/dragonballApi'
import PlanetCard from '../components/PlanetCard'
import CharacterSkeleton from '../components/CharacterSkeleton'

function Planets() {
  const [page, setPage] = useState(1)
  const { data, loading, error } = useFetch(() => getPlanets(page), [page])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [page])

  const totalPages = data?.meta?.totalPages ?? 1
  const currentPage = data?.meta?.currentPage ?? 1

  if (error) return <p className="text-red-500 dark:text-red-400">Error: {error.message}</p>

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Planetas</h1>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 10 }).map((_, i) => <CharacterSkeleton key={i} />)}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.items.map(planet => (
            <PlanetCard key={planet.id} planet={planet} />
          ))}
        </div>
      )}

      {!loading && (
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
    </main>
  )
}

export default Planets