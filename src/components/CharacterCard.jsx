import { useState } from 'react'

const AFFILIATION_COLORS = {
  'Z Fighter':          'bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300',
  'Army of Frieza':     'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300',
  'Red Ribbon Army':    'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300',
  'Namekian Warrior':   'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300',
  'Villain':            'bg-rose-100 dark:bg-rose-900 text-rose-700 dark:text-rose-300',
  'Other':              'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300',
}

function CharacterCard({ character }) {
  const { name, race, gender, ki, maxKi, image, affiliation } = character
  const [imgError, setImgError] = useState(false)
  const badgeColor = AFFILIATION_COLORS[affiliation] ?? AFFILIATION_COLORS['Other']

  return (
    <div className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:border-gray-300 dark:hover:border-gray-500 hover:shadow-lg transition-all duration-200 cursor-pointer">

      {/* Imagen */}
      <div className="relative h-48 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center overflow-hidden">
        <img
          src={imgError ? 'https://placehold.co/200x200?text=No+image' : image}
          alt={name}
          className="h-44 object-contain group-hover:scale-105 transition-transform duration-300"
          onError={() => setImgError(true)}
        />
        {affiliation && (
          <span className={`absolute top-2 right-2 text-xs font-medium px-2 py-1 rounded-full ${badgeColor}`}>
            {affiliation}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="font-semibold text-gray-900 dark:text-white">{name}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{race} · {gender}</p>

        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-gray-400 dark:text-gray-500">Ki</span>
            <span className="text-gray-700 dark:text-gray-300 font-medium tabular-nums">{ki}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-400 dark:text-gray-500">Max Ki</span>
            <span className="text-gray-700 dark:text-gray-300 font-medium tabular-nums">{maxKi}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CharacterCard