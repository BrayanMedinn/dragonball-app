import { useParams, useNavigate } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import { getCharacterById } from '../services/dragonballApi'
import { useState } from 'react'

const AFFILIATION_COLORS = {
  'Z Fighter':        'bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300',
  'Army of Frieza':   'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300',
  'Red Ribbon Army':  'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300',
  'Namekian Warrior': 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300',
  'Villain':          'bg-rose-100 dark:bg-rose-900 text-rose-700 dark:text-rose-300',
  'Other':            'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300',
}

function CharacterDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [expanded, setExpanded] = useState(false)
  const { data: character, loading, error } = useFetch(
    () => getCharacterById(id),
    [id]
  )

  if (loading) return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-pulse">
      <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded mb-8" />
      <div className="flex gap-8">
        <div className="h-64 w-48 bg-gray-200 dark:bg-gray-700 rounded-xl" />
        <div className="flex-1 flex flex-col gap-3">
          <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded mt-2" />
        </div>
      </div>
    </div>
  )

  if (error) return <p className="p-8 text-red-500">Error: {error.message}</p>

  const badgeColor = AFFILIATION_COLORS[character.affiliation] ?? AFFILIATION_COLORS['Other']

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">

      {/* Botón volver */}
      <button
        onClick={() => navigate(-1)}
        className="mb-8 text-sm text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors flex items-center gap-1"
      >
        ← Volver
      </button>

      {/* Hero */}
      <div className="flex flex-col sm:flex-row gap-8 mb-10 items-start">
        <div className="flex-shrink-0 flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl w-full sm:w-64 h-72">
          <img
            src={character.image}
            alt={character.name}
            className="h-64 w-full object-contain"
          />
        </div>

        <div className="flex flex-col justify-start gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{character.name}</h1>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-gray-500 dark:text-gray-400">{character.race} · {character.gender}</span>
              {character.affiliation && (
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${badgeColor}`}>
                  {character.affiliation}
                </span>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
              <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">Ki base</p>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 tabular-nums">{character.ki}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
              <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">Ki máximo</p>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 tabular-nums">{character.maxKi}</p>
            </div>
          </div>

          {/* Descripción */}
          <div className="relative">
            <p className={`text-sm text-gray-600 dark:text-gray-400 leading-relaxed overflow-hidden transition-all duration-300 ${!expanded ? 'max-h-36' : 'max-h-none'}`}>
              {character.description}
            </p>
            {!expanded && (
              <div className="absolute bottom-6 left-0 right-0 h-10 bg-gradient-to-t from-white dark:from-gray-950 to-transparent pointer-events-none" />
            )}
            <button
              onClick={() => setExpanded(prev => !prev)}
              className="mt-2 text-xs text-gray-400 hover:text-gray-200 transition-colors"
            >
              {expanded ? '↑ Ver menos' : '↓ Ver más'}
            </button>
          </div>
        </div>
      </div>

      {/* Planeta de origen */}
      {character.originPlanet && (
        <div className="mb-10">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-3">Planeta de origen</h2>
          <div className="flex gap-4 items-center bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <img
              src={character.originPlanet.image}
              alt={character.originPlanet.name}
              className="h-14 w-14 object-cover rounded-lg flex-shrink-0"
            />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">{character.originPlanet.name}</p>
              {character.originPlanet.isDestroyed && (
                <span className="text-xs bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 px-2 py-0.5 rounded-full">
                  Destruido
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Transformaciones */}
      {character.transformations?.length > 0 && (
        <div>
          <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
            Transformaciones
            <span className="ml-2 text-xs font-normal text-gray-400">({character.transformations.length})</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {character.transformations.map(t => (
              <div key={t.id} className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex flex-col items-center gap-2 hover:border-gray-300 dark:hover:border-gray-500 transition-colors">
                <img
                  src={t.image}
                  alt={t.name}
                  className="h-24 object-contain"
                />
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200 text-center">{t.name}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 tabular-nums">Ki: {t.ki}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default CharacterDetail