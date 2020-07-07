import { ChuckNorrisData } from "../interface/ChuckNorrisData"

const ChuckNorrisService = {
  getRandomJoke: async (firstname: string, lastname: string): Promise<ChuckNorrisData> => {
    let result: ChuckNorrisData
    const fetchUrl = `https://api.icndb.com/jokes/random?firstName=${firstname}&lastName=${lastname}`
    const fetchRequest = await fetch(fetchUrl, {
      method: 'GET'
    })
    result = await fetchRequest.json()
    return result
  },

  getSpecificJoke: async (number: number, firstname: string, lastname: string): Promise<ChuckNorrisData> => {
    let result: ChuckNorrisData
    const fetchUrl = `https://api.icndb.com/jokes/${number}?firstName=${firstname}&lastName=${lastname}`
    const fetchRequest = await fetch(fetchUrl, {
      method: 'GET',
    })
    result = await fetchRequest.json()
    console.log('result', result)
    return result
  },
}

export default ChuckNorrisService