const BASE_URL = import.meta.env.VITE_API_URL

export const getCharacters = async (page = 1, limit = 10, name = '', race = '', affiliation = '') => {
  const params = new URLSearchParams({ page, limit })
  if (name) params.append('name', name)
  if (race) params.append('race', race)
  if (affiliation) params.append('affiliation', affiliation)

  const response = await fetch(`${BASE_URL}/characters?${params}`)
  if (!response.ok) throw new Error('Failed to fetch characters')
  return response.json()
}

export const getCharacterById = async (id) => {
    const response = await fetch(`${BASE_URL}/characters/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch character');
    }
    return response.json();
}

export const getPlanets = async (page = 1, limit = 10) => {
  const response = await fetch(`${BASE_URL}/planets?page=${page}&limit=${limit}`)
  if (!response.ok) throw new Error('Failed to fetch planets')
  return response.json()
}