function CharacterSkeleton() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden animate-pulse">
      
      {/* Imagen */}
      <div className="h-48 bg-gray-200" />

      {/* Info */}
      <div className="p-4 flex flex-col gap-3">
        <div className="h-4 bg-gray-200 rounded w-2/3" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
        <div className="flex flex-col gap-2 mt-1">
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-full" />
        </div>
      </div>

    </div>
  )
}

export default CharacterSkeleton