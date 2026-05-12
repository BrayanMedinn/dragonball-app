function PlanetCard({ planet }) {
  const { name, isDestroyed, description, image } = planet

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
      <div className="relative h-48 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover"
          onError={(e) => {
            e.target.onerror = null
            e.target.src = 'https://placehold.co/200x200?text=No+image'
          }}
        />
        {isDestroyed && (
          <span className="absolute top-2 right-2 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 text-xs font-medium px-2 py-1 rounded-full">
            Destruido
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="font-medium text-gray-900 dark:text-white mb-1">{name}</p>
        <p className="text-xs text-gray-400 dark:text-gray-500 line-clamp-3">{description}</p>
      </div>
    </div>
  )
}

export default PlanetCard