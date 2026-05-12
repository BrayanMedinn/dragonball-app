import CharacterList from '../components/CharacterList'

function Home() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Personajes</h1>
      <CharacterList />
    </main>
  )
}

export default Home